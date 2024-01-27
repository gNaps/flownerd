import { Routes } from '@angular/router';
import { HomeComponent } from './@pages/home/home.component';
import { LoginComponent } from './@pages/login/login.component';
import { AuthGuard } from './@core/guards/auth.guard';
import { AutoLoginGuard } from './@core/guards/auto-login.guard';
import { LayoutComponent } from './@ui/layout/layout.component';
import { SearchComponent } from './@pages/search/search.component';
import { GameDetailComponent } from './@pages/game-detail/game-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AutoLoginGuard]
      },
      {
        path: 'search',
        component: SearchComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'game/:id',
        component: GameDetailComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
