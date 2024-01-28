import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchComponent } from './search.component';
import { GamesService } from '../../@core/services/games.service';
import GamesServiceMock from '../../../testing/GamesServiceMock';
import { Location } from '@angular/common';
import { AuthService } from '../../@core/services/auth.service';
import AuthServiceMock from '../../../testing/AuthServiceMock';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let location: Location;
  const authServiceMock = new AuthServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent, RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: GamesService, useClass: GamesServiceMock },
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    location = TestBed.get(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on search control change', fakeAsync(() => {
    component.searchControl.setValue('ass');
    tick(1000);
    expect(component.games.length).toBeGreaterThan(0);
  }));

  it('on back click', fakeAsync(() => {
    authServiceMock.setCurrentUser({ id: 1, username: 'NAPSRYU' });
    component.goBack();
    tick(1);
    expect(location.path()).toBe('/');
  }));
});
