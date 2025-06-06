import express from 'express';
import { listAllEmployees } from '../service/hrisService';
import { Request, Response } from 'express';
import { handleErrorResponse } from './routesErrorHandler';

const router = express.Router();

router.get('/employees', async (req: Request, res: Response) => {
    const { query, headers } = req;
    const next: string = query.next as string;
    const accountId: string = headers['x-account-id'] as string;

    try {
        const employees = await listAllEmployees(accountId, next);
        res.status(200).send(employees);
    } catch (error: unknown) {
        handleErrorResponse(error, res); 
    }
});

export default router;
