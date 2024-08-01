import express from 'express';
import { InvalidRequestError, ForbiddenRequestError, PreconditionFailedError, TooManyRequestsError, ServerError, NotImplementedError, UnhandledError } from '../errors/stackoneErrors';
import { listAllApplications, listAllJobs } from '../service/atsService';
import { Request, Response } from 'express';

const router = express.Router();

const isKnownError = (error: unknown): error is InvalidRequestError | ForbiddenRequestError | PreconditionFailedError | TooManyRequestsError | ServerError | NotImplementedError | UnhandledError => {
    return error instanceof InvalidRequestError ||
        error instanceof ForbiddenRequestError ||
        error instanceof PreconditionFailedError ||
        error instanceof TooManyRequestsError ||
        error instanceof ServerError ||
        error instanceof NotImplementedError ||
        error instanceof UnhandledError;
};

router.get('/jobs', async (req: Request, res: Response) => {
    const { query, headers } = req;
    const next: string = query.next as string;
    const accountId: string = headers['x-account-id'] as string;

    try {
        const jobs = await listAllJobs(accountId, next);
        res.status(200).send(jobs);
    } catch (error: unknown) {
        if (isKnownError(error)) {
            res.status(error.status).json({ code: error.code, message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred.' });
        }
    }
});

router.get('/applications', async (req: Request, res: Response) => {
    const { query, headers } = req;
    const next: string = query.next as string;
    const accountId: string = headers['x-account-id'] as string;

    try {
        const applications = await listAllApplications(accountId, next);
        res.status(200).send(applications);
    } catch (error: unknown) {
        if (isKnownError(error)) {
            res.status(error.status).json({ code: error.code, message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred.' });
        }
    }
});

export default router;
