import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Customer } from './customer';

@Injectable({
	providedIn: 'root',
})
export class CustomersService {
	constructor(private http: HttpClient, private auth: AuthService) {}

	findAll() {
		return this.http
			.get<Customer[]>(environment.apiUrl + '/customers')
			.pipe(map((data) => data['hydra:member'] as Customer[]));
	}

	find(id: number) {
		return this.http.get<Customer>(environment.apiUrl + '/customers/' + id);
	}

	delete(id: number) {
		return this.http.delete<Customer>(
			environment.apiUrl + '/customers/' + id
		);
	}

	update(customer: Customer) {
		return this.http.put<Customer>(
			environment.apiUrl + '/customers/' + customer.id,
			customer
		);
	}

	create(customer: Customer) {
		return this.http.post<Customer>(
			environment.apiUrl + '/customers',
			customer
		);
	}
}
