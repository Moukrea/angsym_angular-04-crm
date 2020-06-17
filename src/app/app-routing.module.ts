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
import { AuthGuard } from './auth/auth.guard';
import { FormGuard } from './ui/form.guard';
import { CustomersResolverService } from './customers/customers-resolver.service';

const routes: Routes = [
	{ path: 'register', component: RegisterComponent },
	{ path: 'login', component: LoginComponent },
	{ path: '', component: CustomersComponent, canActivate: [AuthGuard] },
	{
		path: 'customers',
		component: CustomersComponent,
		canActivate: [AuthGuard],
		resolve: { customers: CustomersResolverService },
	},
	{
		path: 'customers/create',
		component: CustomerCreateComponent,
		canActivate: [AuthGuard],
		canDeactivate: [FormGuard],
	},
	{
		path: 'customers/:id',
		component: CustomerEditComponent,
		canActivate: [AuthGuard],
		canDeactivate: [FormGuard],
		resolve: { customer: CustomersResolverService },
	},
	{
		path: 'invoices',
		component: InvoicesComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'invoices/create',
		component: InvoicesCreateComponent,
		canActivate: [AuthGuard],
		canDeactivate: [FormGuard],
	},
	{
		path: 'invoices/:id',
		component: InvoicesEditComponent,
		canActivate: [AuthGuard],
		canDeactivate: [FormGuard],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
