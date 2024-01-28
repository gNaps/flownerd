import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { Location } from '@angular/common';
import { FixNavigationTriggeredOutsideAngularZoneNgModule } from '../home/home.component.spec';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        RouterTestingModule.withRoutes(routes),
        FixNavigationTriggeredOutsideAngularZoneNgModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    location = TestBed.get(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('username is required', () => {
    component.onLogin();
    expect(component.loginForm.valid).toBeFalse();
  });

  it('on login navigate to homepage', fakeAsync(() => {
    component.loginForm.setValue({ username: 'NAPSRYU ' });
    component.onLogin();
    tick(1);
    expect(location.path()).toBe('');
  }));
});
