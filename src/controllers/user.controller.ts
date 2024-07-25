import { Request, Response } from 'express';
import userService from '../services/user.service';
class userController {
    static async getUsers(req: Request, res: Response) {
        try {
            const rs = await userService.getUsers();
            return res.status(200).json(rs);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    }
}

export default userController;
