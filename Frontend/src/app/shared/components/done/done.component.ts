import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input, Output, EventEmitter } from '@angular/core';
import { Issue } from '../../../core/models/issue';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { IssuesServiceService } from '../../../services/issues-service.service';

@Component({
  selector: 'app-done',
  imports: [CommonModule, DragDropModule],
  templateUrl: './done.component.html',
  styleUrl: '../../../styles/kanban-styles.scss',
})
export class DoneComponent {

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
