import jwt from "jsonwebtoken";
import { errorHandler } from '../utils/error.js'; // Import your error handler

export const verifyToken = (req, res, next) => {
    const token = req.cookies.Bearer;

    if (!token) {
        return next(errorHandler(401, "Access denied"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if (err) {
            return next(errorHandler(403, "Forbidden"));
        }

        // Attach the verified user information to the req object
        req.user = verified;
        console.log(verified)
        
        // Continue to the next middleware or route handler
        next();
    });
};