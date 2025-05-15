import { Router } from 'express';
import { IssueController } from '../controllers/issues.js';

export const createIssuesRouter = ({ issuesModel }) => {

  const router = Router();

  const issueController = new IssueController({ issuesModel });

  router.get('/issues', issueController.getAllIssues);
  router.get('/issues/:id', issueController.getIssueById);
  router.post('/issues', issueController.createIssue);
  router.put('/issues/:id', issueController.updateIssue);
  router.delete('/issues/:id', issueController.deleteIssue);

  router.get('/users', issueController.getAllUsers);
  router.get('/users/:id', issueController.getUserById);

  return router;
};

