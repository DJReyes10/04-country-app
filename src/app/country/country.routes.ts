import { Routes } from "@angular/router";
import { ByCapitalPageComponent } from "./Pages/by-capital-page/by-capital-page.component";

export const countryRoutes: Routes = [
    {
        path: '',
        component: ByCapitalPageComponent
    },
    // {
    //     path: '**',
    // redirectTo:    '',
    // }
];

export default countryRoutes;