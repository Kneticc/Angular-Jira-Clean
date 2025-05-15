import { validateIssue } from '../schemes/issue.js';

export class IssueController {
  constructor({ issuesModel }) {
    this.issuesModel = issuesModel;
  }

  getAllIssues = async (req, res) => {
    try {
      const issues = await this.issuesModel.getAllIssues();
      res.json(issues);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getIssueById = async (req, res) => {
    try {
      const issue = await this.issuesModel.getIssueById(req.params.id);
      res.json(issue);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  createIssue = async (req, res) => {
    const result = validateIssue(req.body);
    if (result.error) {
      return res.status(400).json({ error: result.error.details.message });
    }

    try {
      const newIssue = await this.issuesModel.createIssue(req.body);
      res.status(201).json(newIssue);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  updateIssue = async (req, res) => {
    const result = validateIssue(req.body);
    if (result.error) {
      return res.status(400).json({ error: result.error.details.message });
    }

    try {
      const updatedIssue = await this.issuesModel.updateIssue(req.params.id, req.body);
      res.json(updatedIssue);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  deleteIssue = async (req, res) => {
    try {
      const deletedIssue = await this.issuesModel.deleteIssue(req.params.id);
      res.json(deletedIssue);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getAllUsers = async (req, res) => {
    try {
      const users = await this.issuesModel.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getUserById = async (req, res) => {
    try {
      const user = await this.issuesModel.getUserById(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}