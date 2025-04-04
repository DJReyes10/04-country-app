import { Routes } from "@angular/router";
import { ByCapitalPageComponent } from './Pages/by-capital-page/by-capital-page.component';
import { CountryLayoutComponent } from "./layouts/countryLayout/countryLayout.component";
import { ByCountryPageComponent } from "./Pages/by-country-page/by-country-page.component";
import { ByRegionPageComponent } from "./Pages/by-region-page/by-region-page.component";

export const countryRoutes: Routes = [
    {
        path: '',
        component: CountryLayoutComponent,
        children: [
            {
                path: 'by-capital',
                component: ByCapitalPageComponent
            },
            {
                path: 'by-country',
                component: ByCountryPageComponent
            },
            {
                path: 'by-region',
                component: ByRegionPageComponent
            },

            {
                    path: '**',
                redirectTo: 'by-capital',
                }
        ]
    },
    // {
    //     path: '**',
    // redirectTo:    '',
    // }
];

export default countryRoutes;