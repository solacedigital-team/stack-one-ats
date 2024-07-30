import express from 'express';
import { ErrorResponse } from '../dto/errors';
import { listAllApplications, listAllJobs } from '../service/atsService';
import { Request, Response, Router } from 'express';

const router = express.Router();
const isErrorResponse = (error: unknown): error is ErrorResponse => {
    return typeof error === 'object' && error !== null && 'status' in error && 'message' in error;
};

router.get('/jobs', async (req: Request, res: Response) => {

    const { query, headers } = req;
    const next: string = query.next as string;
    const accountId: string = headers['x-account-id'] as string;

    try {
        const jobs = await listAllJobs(accountId, next);
        console.log(jobs);
        res.status(200).send(jobs);
    } catch (error: unknown) {
        if (isErrorResponse(error)) {
            res.status(error.status).json({ message: error.message });
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
        console.log(applications);
        res.status(200).send(applications);
    } catch (error: unknown) {
        if (isErrorResponse(error)) {
            res.status(error.status).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred.' });
        }
    }
});

export default router;
