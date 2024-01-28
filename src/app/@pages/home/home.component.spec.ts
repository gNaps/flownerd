import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { Game, GameStatus } from '../../@core/models/Game';
import { GamesService } from '../../@core/services/games.service';
import GamesServiceMock, {
  userGameMock
} from '../../../testing/GamesServiceMock';
import { routes } from '../../app.routes';
import { SearchComponent } from '../search/search.component';
import { Location } from '@angular/common';
import { AuthService } from '../../@core/services/auth.service';
import AuthServiceMock from '../../../testing/AuthServiceMock';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

@NgModule()
export class FixNavigationTriggeredOutsideAngularZoneNgModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(_router: Router) {}
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let location: Location;
  const authServiceMock = new AuthServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        SearchComponent,
        FixNavigationTriggeredOutsideAngularZoneNgModule
      ],
      providers: [
        { provide: GamesService, useClass: GamesServiceMock },
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    location = TestBed.get(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call findAllUserGames and return list of games', fakeAsync(() => {
    const response: Game[] = userGameMock;
    const compiled = fixture.nativeElement;

    component.loadGames();
    tick(1);
    fixture.detectChanges();
    expect(component.games).toEqual(response);
    expect(component.games).toEqual(component.filteredGames);

    const userRow = compiled.querySelector('#total_games');
    expect(userRow.textContent).toContain('1 🎮 total games');

    component.setFilter(GameStatus.COMPLETED);
    component.setFilter(GameStatus.IN_PROGRESS);
    expect(component.activeFilters[GameStatus.COMPLETED]).toEqual(true);
    expect(component.activeFilters['all']).toEqual(false);

    component.setFilter(GameStatus.COMPLETED);
    expect(component.activeFilters[GameStatus.COMPLETED]).toEqual(false);
    expect(component.filteredGames?.length).toEqual(0);

    component.setFilter('all');
    expect(component.activeFilters[GameStatus.COMPLETED]).toEqual(false);
    expect(component.activeFilters['all']).toEqual(true);
    expect(component.filteredGames?.length).toEqual(1);
  }));

  it('navigate to "/search" when click add', fakeAsync(() => {
    authServiceMock.setCurrentUser({ id: 1, username: 'NAPSRYU' });
    component.onAddGame();
    tick(1);
    expect(location.path()).toBe('/search');
  }));
});
