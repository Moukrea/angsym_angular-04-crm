import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './auth/register.component';
import { LoginComponent } from './auth/login.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerEditComponent } from './customers/customer-edit.component';
import { CustomerCreateComponent } from './customers/customer-create.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoicesCreateComponent } from './invoices/invoices-create.component';
import { InvoicesEditComponent } from './invoices/invoices-edit.component';

const routes: Routes = [
	{ path: 'register', component: RegisterComponent },
	{ path: 'login', component: LoginComponent },
	{ path: '', component: CustomersComponent },
	{ path: 'customers', component: CustomersComponent },
	{ path: 'customers/create', component: CustomerCreateComponent },
	{ path: 'customers/:id', component: CustomerEditComponent },
	{ path: 'invoices', component: InvoicesComponent },
	{ path: 'invoices/create', component: InvoicesCreateComponent },
	{ path: 'invoices/:id', component: InvoicesEditComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
