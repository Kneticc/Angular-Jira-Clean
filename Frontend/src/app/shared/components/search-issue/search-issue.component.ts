import { Component, OnInit } from '@angular/core';
import { Issue } from '../../../core/models/issue';
import { IssuesServiceService } from '../../../services/issues-service.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-issue',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search-issue.component.html',
  styleUrl: './search-issue.component.scss'
})
export class SearchIssueComponent implements OnInit {

  constructor(private issueService: IssuesServiceService) { }

  search = new FormControl('')
  searchQuery: string = ''
  isSearchIssueVisible: boolean = false
  searchedIssues: Issue[] = []

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(searchText => this.issueService.searchIssues(searchText || ''))
    ).subscribe(issues => {
      this.searchedIssues = issues;
    });
  }

  searchIssues() {
    this.isSearchIssueVisible = !this.isSearchIssueVisible;
    this.search.setValue('');
  }
}
