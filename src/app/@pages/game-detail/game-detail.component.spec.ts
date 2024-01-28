import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GameDetailComponent } from './game-detail.component';
import { CommonModule } from '@angular/common';
import { GamesService } from '../../@core/services/games.service';
import AuthServiceMock from '../../../testing/AuthServiceMock';
import { Location } from '@angular/common';
import GamesServiceMock from '../../../testing/GamesServiceMock';
import { AuthService } from '../../@core/services/auth.service';
import { GameStatus } from '../../@core/models/Game';

describe('GameDetailComponent', () => {
  let component: GameDetailComponent;
  let fixture: ComponentFixture<GameDetailComponent>;
  let location: Location;
  const authServiceMock = new AuthServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        GameDetailComponent,
        CommonModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: GamesService, useClass: GamesServiceMock },
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    location = TestBed.get(Location);
  });

  it('update status', fakeAsync(() => {
    component.setStatus(GameStatus.PERFECT);
    tick(1000);
    expect(location.path()).toBe('/');
  }));

  it('add game', fakeAsync(() => {
    component.game = { id: 123, name: 'Assassins creed' };
    component.setStatus(GameStatus.PERFECT);
    tick(1000);
    expect(location.path()).toBe('/');
  }));

  it('remove game', fakeAsync(() => {
    component.remove();
    tick(1000);
    expect(location.path()).toBe('/');
  }));

  it('on back click', fakeAsync(() => {
    authServiceMock.setCurrentUser({ id: 1, username: 'NAPSRYU' });
    component.goBack();
    tick(1);
    expect(location.path()).toBe('/');
  }));
});
