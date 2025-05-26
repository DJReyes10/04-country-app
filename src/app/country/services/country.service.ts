import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, catchError, throwError, delay } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  getCountryByCode(code: any): Observable<unknown> {
    throw new Error('Method not implemented.');
  }
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      catchError((error) => {
        console.log('Error fetching', error);

        return throwError(
          () => new Error('No se puedo obtener países con ese query')
        );
      })
    );
  }
  //
  searchByCountry(query: string): Observable<Country[]> {
    const url = `${API_URL}/name/${query}`;
    query = query.toLowerCase();
    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      delay(2000), // Simula un retraso de 1 segundo
      catchError((error) => {
        console.log('Error fetching', error);

        return throwError(
          () => new Error(`No se puedo obtener países con ese query ${query}`)
        );
      })
    );
  }
  //
  searchCountryByAlphaCode(code: string) {
    const url = `${API_URL}/alpha/${code}`;

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      map((countries) => countries.at(0)),
      catchError((error) => {
        console.log('Error fetching', error);

        return throwError(
          () => new Error(`No se puedo obtener países con este código ${code}`)
        );
      })
    );
  }
}
