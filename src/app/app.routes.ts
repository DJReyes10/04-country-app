import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';

export const countryRoutes: Routes = [
    {
        path: '',
        component: HomePageComponent,
    },
    {
        path: 'country',
       loadChildren: () => import('./country/country.routes')
    },
    {
        path: '**',
    redirectTo:    '',
    }
];
