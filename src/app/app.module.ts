import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllListComponent } from './all-list/all-list.component';
import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore'
import { AgmCoreModule } from '@agm/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NoopAnimationsModule} from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    AppComponent,
    AllListComponent,
    HomeComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    NoopAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig,'angular-map'),
    AngularFirestoreModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyC-NnfQKEb1NuaUZ0mR9Xq_cLW21Zsqiws'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
