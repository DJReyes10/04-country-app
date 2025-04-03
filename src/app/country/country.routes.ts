import { Routes } from "@angular/router";
import { ByCapitalPageComponent } from './Pages/by-capital-page/by-capital-page.component';
import { CountryLayoutComponent } from "./layouts/countryLayout/countryLayout.component";

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