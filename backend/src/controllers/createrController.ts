import { creatorSignUpRequest } from 'src/interfaces/creator';
import { Creator } from '../models/creator';
import * as cryptoController from "./cryptoController";

export let createACreator = (req: any, res: any) => {
    Creator.findOne({}).sort({ createdAt: -1 }).exec((error: any, latestCreator: any) => {
        if (error) {
            res.send({
                "status": "error",
                "message": "Invalid Request"
            });
        } else {
            const requestBody: creatorSignUpRequest = req.body;
            let creatorid: number;
            if (latestCreator) {
                creatorid = latestCreator.accountid + 1;
            }
            else {
                creatorid = 0;
            }
            const creator = new Creator({
                accountid: creatorid,
                firstname: requestBody.firstname,
                lastname: requestBody.lastname,
                email: requestBody.email,
                password: requestBody.password ? cryptoController.encrypt(requestBody.password) : ''
            });
            const responseBodySuccess = {
                "status": "success",
                "data": "Account created Successfully",
                "statusCode": res.statusCode
            }
            creator.save((error) => {
                if (error) {
                    return res.status(500).send(error);
                } else {
                    return res.status(200).send(responseBodySuccess);
                }
            });
        }
    });


}
export let login = async (req: any, res: any) => {
    const { email, password } = req.body;
    try {
        let user: any = await Creator.findOne({ email });
        if (!user) {
            return res.status(400).send({ msg: 'Invalid Credentials' });
        }
        const encryptedPassword = cryptoController.decrypt(user.password)

        if (password !== encryptedPassword) {
            return res.status(400).send({ msg: 'Invalid Credentials' });
        }
        const responseBody = {
            accountid: cryptoController.encrypt(user.accountid.toString()),
            message: "logged in successfuly",
            statusCode: 200
        }

        return res.status(200).send(responseBody);
    } catch (err: any) {
        res.status(500).send('Server Error');
    }
}

  

  