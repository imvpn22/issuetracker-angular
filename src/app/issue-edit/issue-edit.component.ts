import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Issue } from '../issue';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.css']
})
export class IssueEditComponent implements OnInit {

  @Input() issue: Issue;

  statusOptions: string[] = ['Open', 'In Progress', 'Closed'];
  severityOptions: string[] = ['Major', 'Minor', 'Critical'];

  constructor(
    private route: ActivatedRoute,
    private issueService: IssueService,
    private location: Location) {
  }

  ngOnInit(): void {
    this.getIssue();
  }

  getIssue(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.issueService.getIssue(id)
      .subscribe(issue => this.issue = issue);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    console.log(this.issue);

    this.issueService.updateIssue(this.issue)
      .subscribe(() => this.goBack());
  }

}
