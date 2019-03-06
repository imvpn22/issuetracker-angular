import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Issue } from '../issue';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-issue-add',
  templateUrl: './issue-add.component.html',
  styleUrls: ['./issue-add.component.css']
})
export class IssueAddComponent implements OnInit {

  issue: Issue = {};

  statusOptions: string[] = ['Open', 'Closed'];
  severityOptions: string[] = ['Major', 'Minor'];

  constructor(
    private route: ActivatedRoute,
    private issueService: IssueService,
    private location: Location) {
  }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  add(): void {
    console.log(this.issue);

    this.issueService.addIssue(this.issue)
      .subscribe(issue => {
        console.log(issue);
      });
  }

}
