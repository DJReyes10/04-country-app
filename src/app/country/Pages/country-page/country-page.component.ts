import { Component, inject, resource, signal } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { Country } from '../../interfaces/country.interface';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-page',
  imports: [],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  countryCode = inject(ActivatedRoute).snapshot.params['code'];

  countryService = inject(CountryService);
  countryResource = rxResource({
    request: () => ({ code: this.countryCode }),
    loader: ({ request }) => {
      return this.countryService.searchCountryByAlphaCode(request.code);
    },
  });
}
