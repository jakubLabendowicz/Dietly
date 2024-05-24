import jwt, {Secret} from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateAccessToken = (id: Number) => {
    const tokenSecret: Secret = process.env.TOKEN_SECRET as Secret;
    return jwt.sign({id: id}, tokenSecret, {expiresIn: '7d'});
}

export const verifyAccessToken = (token: string) => {
    const tokenSecret: Secret = process.env.TOKEN_SECRET as Secret;
    return jwt.verify(token, tokenSecret);
}
