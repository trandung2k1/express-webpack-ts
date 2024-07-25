import jwt from 'jsonwebtoken';
import logEvents from '../helpers/logEvents';
export const verifyToken = async (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        const accessToken = req.headers.token.split(' ')[1];
        try {
            const decoded = jwt.verify(
                accessToken,
                process.env.ACCESS_TOKEN_SECRET,
            );
            req.user = decoded;
            // console.log(req.user)
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError')
                return res.status(401).json('Token expired');
            logEvents(error.message, module.filename);
            return res.status(403).json('Token invalid');
        }
    } else {
        logEvents('Token not found', module.filename);
        return res.status(401).json('Token not found');
    }
};
export const verifyTokenAndUserAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userId === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json("You're not allowed to do that!");
        }
    });
};
export const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json("You're not allowed to do that!");
        }
    });
};
