import express from 'express';
import { Request, Response } from 'express';
import { InvalidRequestError, ForbiddenRequestError, TooManyRequestsError, ServerError, NotImplementedError, UnhandledError } from '../errors/stackoneErrors';
import { listAllAccounts } from '../service/accountsService';

const router = express.Router();
const isKnownError = (error: unknown): error is InvalidRequestError | ForbiddenRequestError | TooManyRequestsError | ServerError | NotImplementedError | UnhandledError => {
    return error instanceof InvalidRequestError ||
        error instanceof ForbiddenRequestError ||
        error instanceof TooManyRequestsError ||
        error instanceof ServerError ||
        error instanceof NotImplementedError ||
        error instanceof UnhandledError;
};

router.get('/accounts', async (req: Request, res: Response) => {

    try {
        const accounts = await listAllAccounts();
        res.status(200).send(accounts);
    } catch (error: unknown) {
        if (isKnownError(error)) {
            res.status(error.status).json({ code: error.code, message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred.' });
        }
    }
});

export default router;