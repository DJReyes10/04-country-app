import type { Country } from '../interfaces/country.interface';
import type { RESTCountry } from '../interfaces/rest-countries.interface';

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      capital: restCountry.capital.join(','),
      cca2: restCountry.cca2,
      flag: restCountry.flags.png,
      flagSvg: restCountry.flags.svg,
      // Necesito mostrar el nombre en español, por eso uso el español como idioma por defecto
      name: restCountry.translations['spa']?.common ?? 'No Spanish name found',
      //   capital: restCountry.capital?.[0] ?? '',
      population: restCountry.population,
      region: restCountry.region,
      subRegion: restCountry.subregion,
    };
    // } as Country;
  }
  //   static toDomain(country: RESTCountry): Country {
  //     return {
  //       cca2: country.cca2,
  //       flag: country.flags.png,
  //       flagSvg: country.flags.svg,
  //       name: country.name.common,
  //       capital: country.capital?.[0] ?? '',
  //       population: country.population,
  //     };
  //   }
  static mapRestCountryArrayToCountryArray(
    resCountries: RESTCountry[]
  ): Country[] {
    return resCountries.map(this.mapRestCountryToCountry);
    // return resCountries.map((country) => this.mapRestCountryToCountry(country));
  }
}
