import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
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
  private queryCacheCapital = new Map<string, Country[]>(); // Mapa para almacenar las consultas anteriores
  private queryCacheCountry = new Map<string, Country[]>();
  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    // Verifica si el resultado ya está en la caché
    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap((countries) => {
        this.queryCacheCapital.set(query, countries); // Almacena el resultado en la cach
      }),
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

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    console.log(`Llegando al servidor por ${query}`);
    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap((countries) => {
        this.queryCacheCountry.set(query, countries); // Almacena el resultado en la caché
      }),
      // Simula un retraso de 2 segundos para ver el efecto del debounce
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
