import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config';
import stackoneRoutes from './routes/connectSession';

const app = express();
const port = config.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use('/stackone', stackoneRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
