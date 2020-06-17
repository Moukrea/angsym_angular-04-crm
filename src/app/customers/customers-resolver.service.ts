import { Injectable } from '@angular/core';
import {
	Resolve,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
} from '@angular/router';
import { Customer } from './customer';
import { Observable } from 'rxjs';
import { CustomersService } from './customers.service';

@Injectable({
	providedIn: 'root',
})
export class CustomersResolverService
	implements Resolve<Customer[] | Customer> {
	constructor(private service: CustomersService) {}

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<Customer[] | Customer> {
		if (route.paramMap.has('id')) {
			return this.service.find(+route.paramMap.get('id'));
		}
		return this.service.findAll();
	}
}
