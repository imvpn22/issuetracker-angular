import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

import { Issue } from '../issue';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-issue-add',
  templateUrl: './issue-add.component.html',
  styleUrls: ['./issue-add.component.css']
})
export class IssueAddComponent implements OnInit {
  @ViewChild('fr') issueForm: NgForm;

  issue: Issue = {
    id: null,
    description: '',
    severity: '',
    status: '',
    createdDate: '',
    resolvedDate: ''
  };

  statusOptions: string[] = ['Open', 'In Progress', 'Closed'];
  severityOptions: string[] = ['Major', 'Minor', 'Critical'];

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
    this.issue.createdDate = String(Date.now());

    this.issueService.addIssue(this.issue)
      .subscribe(issue => {
        console.log(issue);
      });

    // Clear
    this.issueForm.resetForm();
    // this.goBack();
  }

}
