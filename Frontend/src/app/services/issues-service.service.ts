import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Issue } from '../core/models/issue';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../core/models/user';
import { environment } from '../../../src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class IssuesServiceService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.loadIssues();
    this.loadMainUser();
  }

  loadMainUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/d65047e5-f4cf-4caa-9a38-6073dcbab7d1`);
  }

  users: User[] = []
  issues: Issue[] = []
  issuesSubject = new BehaviorSubject<Issue[]>(this.issues);


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  loadIssues() {
    this.http.get<Issue[]>(`${this.apiUrl}/issues`).subscribe(data => {
      console.log(data);
      this.issues = data;
      this.issuesSubject.next([...this.issues]);
    });
  }

  addIssue(issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(`${this.apiUrl}/issues`, issue).pipe(
      map((newIssue: Issue) => {
        this.issues.push(newIssue);
        this.issuesSubject.next([...this.issues]);
        return newIssue;
      })
    );
  }

  deleteIssue(issueId: string) {
    this.http.delete(`${this.apiUrl}/issues/${issueId}`).subscribe(() => {
      this.issues = this.issues.filter(issue => issue.id !== issueId);
      this.issuesSubject.next([...this.issues]);
    });
  }

  getIssueToPreview(issueId: string): Issue | undefined {
    return this.issues.find(issue => issue.id === issueId);
  }

  searchIssues(query: string): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${this.apiUrl}/issues`).pipe(
      map(issues =>
        issues.filter(issue =>
          issue.title?.toLowerCase().includes(query.toLowerCase())
        )
      )
    )
  }

  filterIssuesByUser(userId: string[]) {
    this.http.get<Issue[]>(`${this.apiUrl}/issues`).subscribe(data => {
      if (userId.length === 0) {
        this.issues = data;
      } else {
        this.issues = data.filter(issue =>
          issue.assignee?.some(user => userId.includes(user.id))
        );
      }
      this.issuesSubject.next(this.issues);
    });
  }

  updateIssueStatus(issueId: string, newStatus: string) {
    const issueToUpdate = this.issues.find(issue => issue.id === issueId);

    if (issueToUpdate) {
      issueToUpdate.status = newStatus;
      this.http.put<Issue>(`${this.apiUrl}/issues/${issueId}`, issueToUpdate).subscribe(() => {
        this.issues[this.issues.indexOf(issueToUpdate)] = issueToUpdate;
      });
    }
  }
}
