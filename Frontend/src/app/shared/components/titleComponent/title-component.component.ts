import { Component } from '@angular/core';
import { FilterIssuesComponent } from "../filter-issues/filter-issues.component";

@Component({
  selector: 'app-title-component',
  imports: [FilterIssuesComponent],
  templateUrl: './title-component.component.html',
  styleUrl: './title-component.component.scss'
})
export class TitleComponentComponent {

}
