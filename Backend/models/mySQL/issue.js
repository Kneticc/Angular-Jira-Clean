import mysql from 'mysql2/promise';
import { getAuthor, getAssignees } from '../../utils/user.js';
import { config } from '../../config/dbconfig.js';

const connection = await mysql.createConnection(config);

export class IssuesModel {

  static async getAllIssues() {
    const [issues] = await connection.execute('SELECT * FROM issues');
    const author = await getAuthor();
    const assignees = await getAssignees();

    const result = issues.map(issue => {
      const issueauthor = author.find(a => a.issue_id === issue.id);
      const assigneeList = assignees
        .filter(a => a.issue_id === issue.id)
        .map(({ id, name, avatar }) => ({ id, name, avatar }));
      return {
        ...issue,
        author: issueauthor,
        assignee: assigneeList
      };
    });

    return result;
  }

  static async getIssueById(id) {
    const [issue] = await connection.query('SELECT * FROM issues WHERE id = ?', [id]);
    const issueauthor = await getAuthor();
    const assignees = await getAssignees();

    return {
      ...issue,

      author: issueauthor
        .find(a => a.issue_id === id),

      assignee: assignees
        .filter(a => a.issue_id === id)
        .map(({ id, name, avatar }) => ({ id, name, avatar }))
    };
  }

  static async createIssue(input) {
    const { id, type, title, priority, description, status, author, assignee, date } = input;

    const issue = await connection.execute(
      `INSERT INTO issues (id, type, priority, title, description, status, date) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, type, priority, title, description, status, date]);

    const issueAuthor = await connection.execute(
      'INSERT INTO issue_author (issue_id, user_id) VALUES (?, ?)',
      [id, author.id]
    );

    const issueAssignees = await Promise.all(
      assignee.map(a =>
        connection.execute(
          'INSERT INTO issue_assignee (issue_id, user_id) VALUES (?, ?)',
          [id, a.id]
        )
      )
    );

    return {
      ...issue,
      author: issueAuthor,
      assignees: issueAssignees
    };

  }

  static async updateIssue(id, input) {
    const { type, title, priority, description, status, date } = input;

    const issue = await connection.execute(
      `UPDATE issues SET type = ?, priority = ?, title = ?, description = ?, status = ?, date = ? WHERE id = ?`,
      [type, priority, title, description, status, date, id]
    );

    return {
      ...issue,
    };
  }

  static async deleteIssue(id) {
    const issue = await connection.execute(
      'DELETE FROM issues WHERE id = ?',
      [id]
    );

    return {
      ...issue,
    };
  }

  static async getAllUsers() {
    const [users] = await connection.execute('SELECT * FROM users');
    return users.map(user => ({
      id: user.id,
      name: user.name,
      avatar: user.avatar
    }));
  }

  static async getUserById(id) {
    const [user] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);
    return {
      id: user[0].id,
      name: user[0].name,
      avatar: user[0].avatar
    };
  }
}