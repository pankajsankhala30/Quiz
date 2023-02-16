import User from "../models/user";
import * as cryptoController from "./cryptoController";

export let createAUser = (req: any, res: any) => {
    User.findOne({}).sort({ createdAt: -1 }).exec((error: any, latestUser: any) => {
        if (error) {
            console.error(error);
        } else {
            let accountid: number;
            if (latestUser) {
                accountid = latestUser.accountid + 1;
            }
            else {
                accountid = 0;
            }
            const encryptedPassword = cryptoController.encrypt(req.body.password);

            const user = new User({
                accountid: accountid,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: encryptedPassword
            });
            user.save((error, user) => {
                if (error) {
                    return res.status(500).send(error);
                } else {
                    return res.status(200).send(user);
                }
            });
        }
    });


}

export let login = async (req: any, res: any) => {
    const { email, password } = req.body;
    try {
        let user: any = await User.findOne({ email });
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
            statuscode: 200
        }

        return res.status(200).send(responseBody);
    } catch (err) {
        res.status(500).send('Server Error');
    }
}