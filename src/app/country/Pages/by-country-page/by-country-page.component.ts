import { Component } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountrySearchInputComponent } from "../../components/country-search-input/country-search-input.component";

@Component({
  selector: 'app-by-country-page',
  imports: [CountryListComponent, CountrySearchInputComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  onSearch( value: string) {
    console.log({ value });
 }
}
