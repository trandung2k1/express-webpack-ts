import {
    generatedAccessToken,
    generatedRefreshToken,
} from './../helpers/generatedToken';
import { Request, Response } from 'express';
import authService from '../services/auth.service';
import bcrypt from 'bcrypt';
import { validationLogin, validationRegister } from '../helpers/validateUser';

class authController {
    static async register(req: Request, res: Response) {
        try {
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    }
}

export default authController;
