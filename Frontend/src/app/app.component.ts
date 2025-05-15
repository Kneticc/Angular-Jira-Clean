import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KanbanBoardComponent } from './pages/kanbanBoard/kanban-board.component';
import { NavBarComponent } from "./shared/components/navBar/nav-bar.component";
import { TitleComponentComponent } from './shared/components/titleComponent/title-component.component';
import { HttpClientModule } from '@angular/common/http';
import { SideBarComponent } from "./shared/components/side-bar/side-bar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, KanbanBoardComponent, NavBarComponent, HttpClientModule, TitleComponentComponent, SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Jira';
}
