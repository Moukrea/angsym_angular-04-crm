import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './ui/navbar.component';
import { RegisterComponent } from './auth/register.component';
import { LoginComponent } from './auth/login.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerEditComponent } from './customers/customer-edit.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { CustomerCreateComponent } from './customers/customer-create.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoicesCreateComponent } from './invoices/invoices-create.component';
import { InvoicesEditComponent } from './invoices/invoices-edit.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		RegisterComponent,
		LoginComponent,
		CustomersComponent,
		CustomerEditComponent,
		CustomerCreateComponent,
		InvoicesComponent,
		InvoicesCreateComponent,
		InvoicesEditComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule,
		BrowserAnimationsModule, // required animations module
		ToastrModule.forRoot(), // ToastrModule added
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
