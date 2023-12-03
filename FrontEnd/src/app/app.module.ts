import { routing } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ToastrModule } from 'ngx-toastr';
import { CookieModule } from 'ngx-cookie';

import { FormsModule } from '@angular/forms';
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from './home/home.component';
import { ForgotpwComponent } from './forgotpw/forgotpw.component';
import { PerfilComponent } from "./perfil/perfil.component";
import { BookingComponent } from './booking/booking.component';
import { AdminComponent } from './admin/admin.component';
import { ModalComponent } from './modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, HomeComponent, ForgotpwComponent, PerfilComponent, BookingComponent, AdminComponent, ModalComponent],
  imports: [FormsModule, BrowserModule,ToastrModule.forRoot(), CookieModule.withOptions(), routing, BrowserAnimationsModule, provideFirebaseApp(() => initializeApp({"projectId":"app-web-81795","appId":"1:872729463288:web:5b89dd409f654d4fb76e0d","storageBucket":"app-web-81795.appspot.com","apiKey":"AIzaSyDuYJhImKyNoe3VyPb1PlsOn3jM2ZEKj6w","authDomain":"app-web-81795.firebaseapp.com","messagingSenderId":"872729463288"})), provideStorage(() => getStorage())],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {}