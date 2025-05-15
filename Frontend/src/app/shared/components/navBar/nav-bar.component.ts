import { Component } from '@angular/core';
import { CreateIssueComponent } from '../create-issue/create-issue.component';
import { SearchIssueComponent } from '../search-issue/search-issue.component';

@Component({
  selector: 'app-nav-bar',
  imports: [CreateIssueComponent, SearchIssueComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

}
