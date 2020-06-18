import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { TokenInterceptor } from './auth/token.interceptor';
import { CustomersModule } from './customers/customers.module';
import { InvoicesModule } from './invoices/invoices.module';
import { NavbarComponent } from './ui/navbar.component';
import { PaginationComponent } from './ui/pagination.component';
import { InboxModule } from './inbox/inbox.module';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		// PaginationComponent,
		// RegisterComponent,
		// LoginComponent,
		// CustomersComponent,
		// CustomerEditComponent,
		// CustomerCreateComponent,
		// InvoicesComponent,
		// InvoicesCreateComponent,
		// InvoicesEditComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		// ReactiveFormsModule,
		// HttpClientModule,
		BrowserAnimationsModule, // required animations module
		ToastrModule.forRoot(), // ToastrModule added
		CustomersModule,
		InvoicesModule,
		AuthModule,
		InboxModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
