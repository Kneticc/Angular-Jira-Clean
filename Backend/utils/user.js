import mysql from 'mysql2/promise';
import { config } from '../config/dbconfig.js';

const connection = await mysql.createConnection(config);

export async function getAuthor() {
  const [author] = await connection.execute(`
    SELECT ia.issue_id, u.id, u.name, u.avatar
    FROM issue_author ia
    JOIN users u ON ia.user_id = u.id
  `);
  return author;
}

export async function getAssignees() {
  const [assignees] = await connection.execute(`
    SELECT ia.issue_id, u.id, u.name, u.avatar
    FROM issue_assignee ia
    JOIN users u ON ia.user_id = u.id
  `);
  return assignees;
}
