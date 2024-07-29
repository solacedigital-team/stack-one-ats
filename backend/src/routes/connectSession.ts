import express from 'express';
import { retrieveConnectSessionToken, listAllJobs, listApplications } from '../controllers/connectSession';

const router = express.Router();

router.post('/connect_session', retrieveConnectSessionToken);
router.get('/job_postings', listAllJobs);
router.get('/list_applications', listApplications);

export default router;
