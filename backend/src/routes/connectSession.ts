import express from 'express';
import { retrieveConnectSessionToken, fetchAllJobs } from '../controllers/connectSession';

const router = express.Router();

router.post('/connect_session', retrieveConnectSessionToken);
router.get('/jobs', fetchAllJobs);

export default router;
