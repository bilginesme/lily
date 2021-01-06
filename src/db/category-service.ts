import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CategoryInfo } from './CategoryInfo';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  //private url = 'https://localhost:44322/category';  // URL to web api
  private url = 'https://lilyfx.azurewebsites.net/category';  // URL to web api
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

    constructor( private http: HttpClient){}

  getCategories(): Observable<CategoryInfo[]> {
    return this.http.get<CategoryInfo[]>(this.url)
      .pipe(
        tap(_ => this.log('fetched categories')),
        catchError(this.handleError<CategoryInfo[]>('getCategories', []))
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
