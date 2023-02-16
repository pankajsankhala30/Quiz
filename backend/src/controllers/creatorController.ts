import { creatorSignUpRequest } from "src/interfaces/creator";
import { Creator } from "../models/creator";
import * as cryptoController from "./cryptoController";

export let createACreator = (req: any, res: any) => {
  Creator.findOne({})
    .sort({ createdAt: -1 })
    .exec((error: any, latestCreator: any) => {
      if (error) {
        res.send({
          status: "error",
          message: "Invalid Request",
        });
      } else {
       Creator.findOne({ email: req.body.email }).sort({ createdAt: -1 })
        .exec((error: any, creator: any) => {
            if(creator){
                const userAlreadyExistResponse = {
                    status: "success",
                    data: "Email already exists",
                    statusCode: 409,
                  };
                  return res.status(200).send(userAlreadyExistResponse);
            }
            else {
                const requestBody: creatorSignUpRequest = req.body;
                let creatorid: number;
                if (latestCreator) {
                  creatorid = latestCreator.accountid + 1;
                } else {
                  creatorid = 0;
                }
                const creator = new Creator({
                  accountid: creatorid,
                  firstname: requestBody.firstname,
                  lastname: requestBody.lastname,
                  email: requestBody.email,
                  password: requestBody.password
                    ? cryptoController.encrypt(requestBody.password)
                    : "",
                });
                const responseBodySuccess = {
                  status: "success",
                  data: "Account created Successfully",
                  statusCode: res.statusCode,
                };
                creator.save((error) => {
                  if (error) {
                    return res.status(500).send(error);
                  } else {
                    return res.status(200).send(responseBodySuccess);
                  }
                });
              }
        })
        
      }
    });
};
export let login = async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    let user: any = await Creator.findOne({ email });
    if (!user) {
        const userNotExists = {
            message: "email id does not exist",
            statusCode: 404,
          };
      return res.status(200).send(userNotExists);
    }
    else{
        const encryptedPassword = cryptoController.decrypt(user.password);
        if (password !== encryptedPassword) {
            const passwordIsnotCorrect = {
                message: "password is not correct",
                statusCode: 401,
              };
          return res.status(200).send(passwordIsnotCorrect);
        }
        const responseBody = {
            accountid: cryptoController.encrypt(user.accountid.toString()),
            message: "logged in successfuly",
            statusCode: 200,
          };
          console.log(responseBody)

          return res.status(200).send(responseBody);
       
    }
  
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
