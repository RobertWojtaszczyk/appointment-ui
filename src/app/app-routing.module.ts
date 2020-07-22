import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthGuard} from './user/auth.guard';
import {SelectiveStrategy} from './selective-strategy.service';

const ROUTES: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'timeSlots',
    canLoad: [AuthGuard],
    // canActivate: [AuthGuard],
    data: { preload: true },
    loadChildren: () =>
      import('./time-slot/time-slot.module').then(m => m.TimeSlotModule)
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  // imports: [RouterModule.forRoot(ROUTES, { enableTracing: true})],
  imports: [RouterModule.forRoot(ROUTES, { preloadingStrategy: SelectiveStrategy })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
