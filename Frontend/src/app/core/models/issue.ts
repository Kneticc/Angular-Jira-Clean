import { User } from "./user";

export interface Issue {
  id: string;
  type: string;
  priority: string;
  title: string;
  description: string;
  status: string;
  author: User;
  assignee: User[];
  date: string;
}