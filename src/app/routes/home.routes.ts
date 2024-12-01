import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', loadComponent: () => import('src/app/app.component').then(m => m.AppComponent), pathMatch: 'full' },
	{ path: '**', redirectTo: "/" },
];
