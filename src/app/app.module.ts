import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './ui/navbar.component';
import { RegisterComponent } from './auth/register.component';
import { LoginComponent } from './auth/login.component';

@NgModule({
	declarations: [AppComponent, NavbarComponent, RegisterComponent, LoginComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
