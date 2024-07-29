import { Request, Response } from 'express';
import axios from 'axios';
import config from '../config';

export const retrieveConnectSessionToken = async (req: Request, res: Response): Promise<void> => {
  const { origin_owner_id, origin_owner_name } = req.body;

  try {
    const response = await axios.post(config.STACKONE_API_URL, {
      expires_in: 1800,
      multiple: false,
      origin_owner_id: origin_owner_id,
      origin_owner_name: origin_owner_name
    }, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'authorization': `Basic ${config.STACKONE_API_KEY}`,
      },
    });

    res.json({ token: response.data.token });
  } catch (error) {
    console.error('Error connecting to StackOne', error);
    res.status(500).send('Internal Server Error');
  }
};

export const listAllJobs = async (req: Request, res: Response): Promise<void> => {
  const accountId = req.headers['x-account-id'];
  
  try {
    const response = await axios.get('https://api.stackone.com/unified/ats/job_postings', { // ENV Var url, to be changed
      headers: {
        'accept': 'application/json',
        'x-account-id': `${accountId}`,
        'authorization': `Basic ${config.STACKONE_API_KEY}`,
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching jobs from StackOne', error);
    res.status(500).send('Internal Server Error');
  }
};

export const listApplications = async (req: Request, res: Response): Promise<void> => {
  const accountId = req.headers['x-account-id'];
  
  try {
    const response = await axios.get('https://api.stackone.com/unified/ats/applications', { // ENV Var url, to be changed
      headers: {
        'accept': 'application/json',
        'x-account-id': `${accountId}`,
        'authorization': `Basic ${config.STACKONE_API_KEY}`,
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching jobs from StackOne', error);
    res.status(500).send('Internal Server Error');
  }
};