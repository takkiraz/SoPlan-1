/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationGuard } from '@guards/authentication/authentication.guard';
import { NgxElectronModule } from 'ngx-electron';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { IpcRendererService } from '../../services/ipc-renderer/ipc-renderer.service';
import { EinstellungAdministratorComponent } from './einstellung-administrator.component';
import { LoginComponent } from '@pages/login/login.component';

describe('EinstellungAdministratorComponent', () => {
  let component: EinstellungAdministratorComponent;
  let fixture: ComponentFixture<EinstellungAdministratorComponent>;
  let ipc: IpcRendererService;
  let toastr: ToastrService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EinstellungAdministratorComponent,
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            redirectTo: '/'
          }
        ]),
        NgxElectronModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        FormsModule,
        BrowserAnimationsModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      providers: [
        IpcRendererService,
        ToastrService,
        AuthenticationGuard
      ]
    })
      .compileComponents();

    ipc = TestBed.get(IpcRendererService);
    toastr = TestBed.get(ToastrService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EinstellungAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(toastr, 'error');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // btoa -> encode String to base64
  // atob -> decode base64 to string
  it('should save config', async () => {
    const newUsername = 'admin';
    const newPassword = 'password';
    let newConfig: { username: string, password: string };

    await ipc.get('get/administrator').then(async (result: { username: string, password: string }) => {
      component.setConfig(result);

      component.username = newUsername;
      component.password = window.atob(result.password);
      component.newpsw = newPassword;
      component.newpsw2 = newPassword;

      await component.saveConfig();

      await ipc.get('get/administrator').then((res: { username: string, password: string }) => {
        newConfig = res;
      });
    });

    await expect(newConfig).toEqual({ password: window.btoa(newPassword), username: newUsername });
  });

  it('should check the password', async () => {
    component.username = 'admin';
    component.password = 'wrongPassword';
    component.newpsw = 'newPassword';
    component.newpsw2 = 'newPassword';

    await component.saveConfig();

    expect(toastr.error).toHaveBeenCalled();
  });

  it('new passwords dont match', async () => {
    await ipc.get('get/administrator').then(async (result: { username: string, password: string }) => {
      component.username = result.username;
      component.password = window.atob(result.password);
      component.newpsw = 'newPassword';
      component.newpsw2 = 'anotherPassword';

      await component.saveConfig();
    });

    expect(toastr.error).toHaveBeenCalledWith('Passwörter stimmen nicht überein!');
  });

  it('should give error, password >= 5', async () => {
    await ipc.get('get/administrator').then(async (result: { username: string, password: string }) => {
      component.username = result.username;
      component.password = window.atob(result.password);
      component.newpsw = '1234';
      component.newpsw2 = '1234';

      await component.saveConfig();
    });

    expect(toastr.error).toHaveBeenCalledWith('Passwort muss mind. 5 Zeichen enthalten!');
  });

  it('should give error, username >= 3', async () => {
    await ipc.get('get/administrator').then(async (result: { username: string, password: string }) => {
      component.username = '12';
      component.password = window.atob(result.password);
      component.newpsw = '12345';
      component.newpsw2 = '12345';

      await component.saveConfig();
    });

    expect(toastr.error).toHaveBeenCalledWith('Benutzername muss mind. 3 Zeichen enthalten!');
  });
});
