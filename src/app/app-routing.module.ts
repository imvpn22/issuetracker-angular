import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IssuesComponent } from './issues/issues.component';

const routes: Routes = [
  { path: '', redirectTo: '/issues', pathMatch: 'full' },
  { path: 'issues', component: IssuesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
