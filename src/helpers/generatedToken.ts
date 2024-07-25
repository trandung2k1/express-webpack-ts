import jwt from 'jsonwebtoken';
import { IToken } from '../interfaces/token.interface';
export const generatedAccessToken = (user: IToken) => {
    return jwt.sign(
        {
            userId: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '1d',
        },
    );
};
export const generatedRefreshToken = (user: IToken) => {
    return jwt.sign(
        {
            userId: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '365d',
        },
    );
};
