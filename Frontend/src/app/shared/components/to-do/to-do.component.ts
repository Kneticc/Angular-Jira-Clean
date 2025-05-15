import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Issue } from '../../../core/models/issue';
import { Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { IssuesServiceService } from '../../../services/issues-service.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-to-do',
  imports: [CommonModule, DragDropModule, NgSelectModule],
  templateUrl: './to-do.component.html',
  styleUrl: '../../../styles/kanban-styles.scss',
})
export class ToDoComponent {

  constructor(private issueService: IssuesServiceService) { }

  issueToPreview: Issue | undefined;
  isIssuePreviewVisible: boolean = false;

  @Input() issues: Issue[] = [];
  @Input() connectedTo: string[] = [];
  @Output() dropped = new EventEmitter<CdkDragDrop<Issue[]>>();

  onDrop(event: CdkDragDrop<Issue[]>) {
    this.dropped.emit(event);
  }

  deleteIssue(issueId: string) {
    this.issueService.deleteIssue(issueId);
  }

  toggleIssuePreview(issueId: string) {
    this.issueToPreview = this.issueService.getIssueToPreview(issueId || '');
    this.isIssuePreviewVisible = !this.isIssuePreviewVisible;
  }
}



