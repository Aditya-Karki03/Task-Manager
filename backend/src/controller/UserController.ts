import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";
import { registrationDataValidator } from "../utils/validator";

const prisma = new PrismaClient();

export class UserController {
  async createUser(req: Request, res: Response) {
    //either with OAuth or email otp verification
    //email,fName,lName
    const { email, fName, lName } = req.body;
    //validate email,fName and lName
    const { success, error } = registrationDataValidator({
      email,
      fName,
      lName,
    });
    if (!success) {
      res.status(409).json({
        message: error?.issues[0].message,
        user: null,
      });
      return;
    }
    try {
      const data = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (data?.email) {
        res.status(409).json({
          message: "User with this email exists, Please login",
          user: null,
        });
        return;
      }
      //TODO: verify user email
      const user = await prisma.user.create({
        data: {
          email,
          fName,
          lName,
          isVerified: true,
        },
      });
      res.status(201).json({
        message: "User Registered Successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong, while registration. Please try again",
        user: null,
      });
    }
  }
  async login(req: Request, res: Response) {
    const { email } = req.body;
    //TODO: implement OTP verification
    try {
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (!user) {
        res.status(404).json({
          message: "Invalid Email. Please try registering first",
          user: null,
        });
        return;
      }
      res.status(201).json({
        message: "Login Successfull",
        user,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong, while logging in. Please try again",
        user: null,
      });
    }
  }
}
