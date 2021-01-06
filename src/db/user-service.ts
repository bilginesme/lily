import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserInfo } from './UserInfo';

@Injectable({ providedIn: 'root' })
export class UserService {
  private webAPIUrl = 'http://40.71.29.77:2002/token';  // URL to web API
  private usersUrl = 'https://lilyfx.azurewebsites.net/elpida';  // URL to web api
 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

    constructor( private http: HttpClient){}

  getUsers(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(this.usersUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<UserInfo[]>('getUsers', []))
      );
  }

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

  /** Log a HeroService message with the MessageService */
  private log(message: string) { console.log(`HeroService: ${message}`)}
}
