/* tslint:disable:no-unused-variable */
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';
import { NgxElectronModule } from 'ngx-electron';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
=======
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { LoginComponent } from './login.component';
>>>>>>> 816cf1b688675afa48a771dda5d5b853dc484c80

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterModule.forRoot([]),
        ToastrModule.forRoot(),
        HttpClientModule,
        NgxElectronModule,
        FormsModule
      ],
      providers: [
        ToastrService,
        IpcRendererService,
        { provide: APP_BASE_HREF, useValue: '/' }
      ],
      schemas: [
<<<<<<< HEAD
        CUSTOM_ELEMENTS_SCHEMA
=======
        CUSTOM_ELEMENTS_SCHEMA,
>>>>>>> 816cf1b688675afa48a771dda5d5b853dc484c80
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
