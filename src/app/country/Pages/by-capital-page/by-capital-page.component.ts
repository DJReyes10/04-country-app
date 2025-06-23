import {
  Component,
  inject,
  linkedSignal,
  resource,
  signal,
} from '@angular/core';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Country } from '../../interfaces/country.interface';
import { first, firstValueFrom, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  queryParams = this.activatedRoute.snapshot.queryParamMap.get('query') ?? ''; //snapshot es para obtener los parámetros de la ruta actual, solo se ejecuta una vez al cargar el componente
  query = linkedSignal(() => this.queryParams);

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);

      return this.countryService.searchByCapital(request.query);
    },
  });

  // countryResource = resource({
  //     request: () => ({ query: this.query() }),
  //     loader: async ({ request }) => {
  //       if (!request.query) return [];

  //       return await firstValueFrom(
  //         this.countryService.searchByCapital(request.query)
  //       );
  //     },
  //   });
  //Este componente es un ejemplo de como se puede usar el servicío de froma reactiva
  //Pero no es necesario utilizarlo de esta forma, ya que el servicio ya tiene un método para buscar por capital
  //
  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query: string) {
  //   if (this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(query).subscribe({
  //     next: (countries) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //     },
  //     error: (err) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(
  //         'No se encontraron resultados para la búsqueda: ' + query
  //       );
  //     },
  //   });
  // }
}
