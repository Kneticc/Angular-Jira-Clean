import express from 'express';
import { createIssuesRouter } from './routes/issues.js';
import { IssuesModel } from './models/mySQL/issue.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');

app.use(cors());
app.use(express.json());
app.use('/', createIssuesRouter({ issuesModel: IssuesModel }));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});