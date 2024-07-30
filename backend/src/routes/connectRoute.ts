import express from 'express';
import { Request, Response, Router } from 'express';
import { ErrorResponse } from '../dto/errors';
import { connectStackOneSession } from '../service/sessionTokenService';

const router = express.Router();
const isErrorResponse = (error: unknown): error is ErrorResponse => {
    return typeof error === 'object' && error !== null && 'status' in error && 'message' in error;
};

router.post('/connect-session', async (req: Request, res: Response) => {
    
    const { origin_owner_id, origin_owner_name } = req.body;

    try {
        const sessionToken = await connectStackOneSession(origin_owner_id, origin_owner_name);
        res.status(200).send(sessionToken);
    } catch (error: unknown) {
        if (isErrorResponse(error)) {
            res.status(error.status).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred.' });
        }
    }
});

export default router;