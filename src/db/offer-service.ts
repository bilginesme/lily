import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { OfferInfo } from './OfferInfo';

@Injectable({ providedIn: 'root' })
export class OfferService {
  private webAPIUrl = 'http://40.71.29.77:2002/token';  // URL to web API
  private url = 'https://lilyfx.azurewebsites.net/offer';  // URL to web api
 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

    constructor( private http: HttpClient){}

  getOffers(): Observable<OfferInfo[]> {
    return this.http.get<OfferInfo[]>(this.url)
      .pipe(
        tap(_ => this.log('fetched offers')),
        catchError(this.handleError<OfferInfo[]>('getOffers', []))
      );
  }

  getOffersOfUser(userID:number): Observable<OfferInfo[]> {
    return this.http.get<OfferInfo[]>(this.url + "/1/" + userID)
      .pipe(
        tap(_ => this.log('fetched offers')),
        catchError(this.handleError<OfferInfo[]>('getOffers', []))
      );
  }

  getOffer(Id:string): Observable<OfferInfo> {
    return this.http.get<OfferInfo>(this.url + "/" + Id)
      .pipe(
        tap(_ => this.log('fetched offer')),
        catchError(this.handleError<OfferInfo>('getOffer'))
      );
  }

  addOffer(offer: OfferInfo): Observable<OfferInfo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post<OfferInfo>(this.url, offer, httpOptions)
      .pipe(
        catchError(this.handleError('addHero', null))
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
