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
    console.log(`HeroService: ${message}`);
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


}
