import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { Region } from '../../interfaces/region.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParams(queryParams: string): Region {
  queryParams = queryParams.toLowerCase();

  const validateRegion: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  };
  return validateRegion[queryParams] ?? 'Americas'; // Por defecto, si no hay región seleccionada, se establece 'Americas'
}

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  countryService = inject(CountryService);
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];
  activatedRoute = inject(ActivatedRoute);
  route = inject(Router);
  queryParams = this.activatedRoute.snapshot.queryParamMap.get('region') ?? ''; // snapshot es para obtener los parámetros de la ruta actual, solo se ejecuta una vez al cargar el componente

  // region = linkedSignal(() => this.regionParams);

  selectedRegion = linkedSignal<Region | null>(() =>
    validateQueryParams(this.queryParams)
  ); // Por defecto, si no hay región seleccionada, se establece 'Americas'

  countryResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {
      if (!request.region) return of([]);
      this.route.navigate(['/country/by-region'], {
        queryParams: { region: request.region },
      });

      return this.countryService.searchByRegion(request.region);
    },
  });
}
