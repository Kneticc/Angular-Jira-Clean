import { Component } from '@angular/core';
import { CreateIssueComponent } from '../create-issue/create-issue.component';
import { SearchIssueComponent } from '../search-issue/search-issue.component';
import { ThemeSwitchComponent } from "../theme-switch/theme-switch.component";

@Component({
  selector: 'app-nav-bar',
  imports: [CreateIssueComponent, SearchIssueComponent, ThemeSwitchComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  goToGitHub() {
    window.open('https://github.com/Kneticc/Angular-Jira-Clean', '_blank');
  }

}
