import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PUBLIC_KEY } from "./config";

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers['authorization'];

   
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return;  // Ensure no further code is executed
    }

    try {
        // Decode the JWT token
        const decoded = jwt.verify(token, JWT_PUBLIC_KEY);

        console.log(decoded);

        // If the token is invalid or doesn't contain the subject (`sub`), return 401
        if (!decoded || !decoded.sub) {
            res.status(401).json({ error: 'Unauthorized' });
            return;  
        }

     
        req.userId = decoded.sub as string;

        next();
    } catch (error) {
  
        res.status(401).json({ error: 'Unauthorized' });
    }
}