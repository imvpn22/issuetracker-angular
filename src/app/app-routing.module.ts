import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IssuesComponent } from './issues/issues.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { IssueEditComponent } from './issue-edit/issue-edit.component';
import { IssueAddComponent } from './issue-add/issue-add.component';

const routes: Routes = [
  { path: '', component: IssuesComponent},
  { path: 'issue/:id/view', component: IssueDetailComponent },
  { path: 'issue/:id/edit', component: IssueEditComponent },
  { path: 'issue/add', component: IssueAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
