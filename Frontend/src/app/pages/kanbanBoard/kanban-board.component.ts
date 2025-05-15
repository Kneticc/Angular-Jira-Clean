import { Component, OnInit } from '@angular/core';
import { ToDoComponent } from '../../shared/components/to-do/to-do.component';
import { InProgressComponent } from '../../shared/components/in-progress/in-progress.component';
import { DoneComponent } from '../../shared/components/done/done.component';
import { Issue } from '../../core/models/issue';
import { IssuesServiceService } from '../../services/issues-service.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban-board',
  imports: [ToDoComponent, InProgressComponent, DoneComponent, DragDropModule],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss'
})
export class KanbanBoardComponent implements OnInit {

  toDoIssues: Issue[] = [];
  inProgressIssues: Issue[] = [];
  doneIssues: Issue[] = [];

  constructor(private issueService: IssuesServiceService) { }

  ngOnInit() {
    this.issueService.issuesSubject.subscribe((issues: Issue[]) => {
      this.toDoIssues = issues.filter(i => i && i.status === 'To-Do');
      this.inProgressIssues = issues.filter(i => i && i.status === 'In-Progress');
      this.doneIssues = issues.filter(i => i && i.status === 'Done');
    });
  }

  drop(event: CdkDragDrop<Issue[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const movedIssue = event.container.data[event.currentIndex];
      const containerId = event.container.id;

      if (containerId === 'toDoList') movedIssue.status = 'To-Do';
      if (containerId === 'inProgressList') movedIssue.status = 'In-Progress';
      if (containerId === 'doneList') movedIssue.status = 'Done';

      this.issueService.updateIssueStatus(movedIssue.id, movedIssue.status);

      const allIssues = [
        ...this.toDoIssues,
        ...this.inProgressIssues,
        ...this.doneIssues,
      ];

      this.issueService.issuesSubject.next(allIssues);
    }
  }
}

