import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IssuesComponent } from './issues/issues.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { IssueEditComponent } from './issue-edit/issue-edit.component';
import { IssueAddComponent } from './issue-add/issue-add.component';

@NgModule({
  declarations: [
    AppComponent,
    IssuesComponent,
    IssueDetailComponent,
    IssueEditComponent,
    IssueAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
