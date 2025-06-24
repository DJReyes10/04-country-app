import {
  Component,
  inject,
  linkedSignal,
  resource,
  signal,
} from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [CountryListComponent, CountrySearchInputComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  route = inject(Router);

  queryParams = this.activatedRoute.snapshot.queryParamMap.get('query') ?? ''; //snapshot es para obtener los parámetros de la ruta actual, solo se ejecuta una vez al cargar el componente
  query = linkedSignal(() => this.queryParams);
  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
      this.route.navigate(['/country/by-country'], {
        queryParams: { query: request.query},
      });
      return this.countryService.searchByCountry(request.query);
    },
  });

  // countryResource = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async ({ request }) => {
  //     if (!request.query) return [];

  //     return await firstValueFrom(
  //       this.countryService.searchByCountry(request.query)
  //     );
  //   },
  // });
}
