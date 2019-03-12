import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Issue } from '../issue';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {
  issues: Issue[] = [];
  issues$: Observable<Issue[]>;
  private searchTerms = new Subject<string>();

  showFilters: any = true;
  colFilters: any = {
    description: true,
    severity: true,
    status: true,
    createdDate: true,
    resolvedDate: true
  };

  constructor( private issueService: IssueService ) { }

  ngOnInit() {
    this.getIssues();
  }

  getIssues(): void {
    this.issueService.getIssues()
      .subscribe(issues => {
        this.issues = issues;
      });
  }

  delete(issue: Issue): void {
    this.issues = this.issues.filter(i => i !== issue);
    this.issueService.deleteIssue(issue).subscribe();
  }

  search(term: string): void {
    if (term && term.length > 1) {
      this.searchTerms.next(term);
      this.issueService.searchIssues(term)
        .subscribe(issues => this.issues = issues);
    } else {
      this.getIssues();
    }
  }

  showHideFilters(): void {
    this.showFilters = !this.showFilters;
  }

}
