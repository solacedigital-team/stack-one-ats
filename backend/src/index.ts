import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config';
import stackoneAtsRoutes from './routes/atsRoutes';
import stackoneHrisRoutes from './routes/hrisRoutes';
import stackoneSessionRoute from './routes/connectRoute';
import stackoneAccountRoute from './routes/accountsRoute'

const app = express();
const port = config.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use('/', stackoneAccountRoute);
app.use('/session-token', stackoneSessionRoute);
app.use('/ats', stackoneAtsRoutes);
app.use('/hris', stackoneHrisRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
