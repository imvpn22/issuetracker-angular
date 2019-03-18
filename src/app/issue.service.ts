import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Issue } from './issue';

const API_URL = `http://localhost:3000`;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor( private http: HttpClient ) { }

  private log(message: string) {
    console.log(`IssueService: ${message}`);
  }

  /*
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${API_URL}/issues`).pipe(
      tap(_ => this.log('fetched issues')),
      catchError(this.handleError('getIssues', []))
      );
  }

  /* GET Issue by id. Will 404 if id not found */
  getIssue(id: any): Observable<Issue> {
    const url = `${API_URL}/issues/${id}`;
    return this.http.get<Issue>(url).pipe(
      tap(_ => this.log(`fetched Issue id=${id}`)),
      catchError(this.handleError<Issue>(`getIssue id=${id}`))
    );
  }

  /* PUT: update the Issue Details on the server */
  updateIssue(issue: Issue): Observable<any> {
    return this.http.put(`${API_URL}/issues/${issue.id}`, issue, httpOptions).pipe(
      tap(_ => this.log(`updated issue id=${issue.id}`)),
      catchError(this.handleError<any>('updateIssue'))
    );
  }

  /** POST: add a new issue to the server */
  addIssue(issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(`${API_URL}/issues`, issue, httpOptions).pipe(
      tap((newIssue: Issue) => this.log(`added Issue w/ id=${newIssue.id}`)),
      catchError(this.handleError<Issue>('addIssue'))
    );
  }

  /** DELETE: delete the issue from the server */
  deleteIssue(issue: Issue): Observable<Issue> {
    const id = issue.id;
    const url = `${API_URL}/issues/${id}`;

    return this.http.delete<Issue>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Issue id=${id}`)),
      catchError(this.handleError<Issue>('deleteIssue'))
    );
  }

  /* GET issues whose description contains search term */
  searchIssues(term: string): Observable<Issue[]> {
    if (!term.trim()) {
      // if not search term, return empty issue array.
      return of([]);
    }
    return this.http.get<Issue[]>(`${API_URL}/issues?q=${term}`).pipe(
      tap(_ => this.log(`found issuees matching "${term}"`)),
      catchError(this.handleError<Issue[]>('searchIssues', []))
    );
  }


}
