import User from '../models/user.model';
class userService {
    static async getUsers() {
        try {
            const users = await User.find();
            return users;
        } catch (error) {
            return { message: error.message };
        }
    }
}

export default userService;
