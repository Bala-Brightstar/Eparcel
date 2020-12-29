import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { Amplify } from 'aws-amplify';
import awsconfig from '../environments/environment';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { CommonMaterialModule } from './app.materials.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './modules/auth/auth.component';
import { NgxSpinnerModule } from 'ngx-spinner';

Amplify.configure(awsconfig);

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonMaterialModule,
    HttpClientModule,
    AmplifyUIAngularModule,
    NgxSpinnerModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ],
  entryComponents: [
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
