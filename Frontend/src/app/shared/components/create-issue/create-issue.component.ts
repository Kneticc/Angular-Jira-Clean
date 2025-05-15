import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Issue } from '../../../core/models/issue';
import { CommonModule } from '@angular/common';
import { IssuesServiceService } from '../../../services/issues-service.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-create-issue',
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './create-issue.component.html',
  styleUrl: './create-issue.component.scss'
})
export class CreateIssueComponent implements OnInit {

  constructor(private fb: FormBuilder, private issueService: IssuesServiceService) { }

  form!: FormGroup;
  isVisible: boolean = false;
  mainUser!: User;
  users: User[] = []

  ngOnInit(): void {
    this.form = this.fb.group({
      type: ["", Validators.required],
      priority: ["", Validators.required],
      title: ["", Validators.required],
      description: ["", Validators.required],
      assignees: [[], Validators.required]
    });
    this.issueService.loadMainUser().subscribe(user => {
      this.mainUser = user;
    });
    this.issueService.getUsers().subscribe(users => {
      this.users = users;
    });
  }


  sendIssue() {

    if (this.form.valid) {

      const selectedAssignes = this.users.filter(user =>
        this.form.value.assignees.includes(user.id)
      )

      const issue: Issue = {
        id: String(Math.floor(Math.random() * 1000)),
        type: this.form.value.type,
        title: this.form.value.title,
        priority: this.form.value.priority,
        description: this.form.value.description,
        status: "To-Do",
        author: this.mainUser,
        assignee: selectedAssignes,
        date: new Date().toLocaleString('es-ES')
      }

      this.issueService.addIssue(issue).subscribe(() => {
        this.issueService.loadIssues();
        this.form.reset();
        this.isVisible = false;
      });
    }
  }
}
