// NO USAR, ESTA PARTE DEL CÓDIGO ES UNA SIMULACIÓN Y AUN NO ESTÁ TERMINADA

import db from '../../db.json' with { type: 'json' };

const issues = db.issues;
const users = db.users;

export class IssuesModel {

  static async getAllIssues() {
    return issues;
  }

  static async getIssueById(id) {
    const issue = issues.find(issue => issue.id === id);
    if (!issue) {
      throw new Error('Issue not found');
    }
    return issue;
  }


  static async createIssue(input) {
    const newIssue = {
      ...input
    }

    issues.push(newIssue);
    return newIssue;
  }

  static async updateIssue(id, input) {
    const issueIndex = issues.findIndex(issue => issue.id === id);
    if (issueIndex === -1) {
      throw new Error('Issue not found');
    }

    const updatedIssue = {
      ...issues[issueIndex],
      ...input
    }

    issues[issueIndex] = updatedIssue;
    return updatedIssue;
  }

  static async deleteIssue(id) {
    issues = issues.filter(issue => issue.id !== id);
    return [...issues];
  }

  static async getAllUsers() {
    return users;
  }

  static async getUserById(id) {
    const user = users.find(user => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}