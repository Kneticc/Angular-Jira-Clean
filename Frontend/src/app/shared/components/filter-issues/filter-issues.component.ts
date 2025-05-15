import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../core/models/user';
import { IssuesServiceService } from '../../../services/issues-service.service';

@Component({
  selector: 'app-filter-issues',
  imports: [CommonModule],
  templateUrl: './filter-issues.component.html',
  styleUrl: './filter-issues.component.scss'
})
export class FilterIssuesComponent implements OnInit {

  constructor(private IssuesService: IssuesServiceService) { }

  users: User[] = []
  selectedUserIds: string[] = [];

  ngOnInit(): void {
    this.IssuesService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  filterIssuesByUser(userId: string) {
    const isUserSelected = this.selectedUserIds.includes(userId);
    if (isUserSelected) {
      this.selectedUserIds = this.selectedUserIds.filter(id => id !== userId);
    } else {
      this.selectedUserIds.push(userId);
    }
    this.IssuesService.filterIssuesByUser(this.selectedUserIds);
  }
}
