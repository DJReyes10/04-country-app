import { Component, inject, resource, signal } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { Country } from '../../interfaces/country.interface';
import { CountryListComponent } from '../../components/country-list/country-list.component';

@Component({
  selector: 'app-country-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  countryService = inject(CountryService);
  query = signal('');
  countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async ({ request }) => {
      if (!request.query) return [];

      return await firstValueFrom(
        this.countryService.searchByCountry(request.query)
      );
    },
  });
}
