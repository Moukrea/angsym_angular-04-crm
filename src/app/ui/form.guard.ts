import { Injectable, ɵCodegenComponentFactoryResolver } from '@angular/core';
import {
	CanDeactivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerCreateComponent } from '../customers/customer-create.component';
import { CustomerEditComponent } from '../customers/customer-edit.component';
import { InvoicesCreateComponent } from '../invoices/invoices-create.component';
import { InvoicesEditComponent } from '../invoices/invoices-edit.component';

@Injectable({
	providedIn: 'root',
})
export class FormGuard implements CanDeactivate<unknown> {
	canDeactivate(
		component:
			| CustomerCreateComponent
			| CustomerEditComponent
			| InvoicesCreateComponent
			| InvoicesEditComponent,
		currentRoute: ActivatedRouteSnapshot,
		currentState: RouterStateSnapshot,
		nextState?: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		if (component.submitted) {
			return true;
		}
		return window.confirm(
			"Vous n'avez pas complété le formulaire, êtes vous sûr.e de vouloir partir ?"
		);
	}
}
