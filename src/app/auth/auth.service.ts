import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, map } from 'rxjs/operators';

import jwtDecode from 'jwt-decode';
import { R3FactoryTarget } from '@angular/compiler';
import { Subject, interval } from 'rxjs';
// var jwtDecode = require('jwt-decode');

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	authChanged = new Subject<boolean>();

	constructor(private http: HttpClient) {
		interval(5000).subscribe(() => {
			this.authChanged.next(this.isAuthenticated());
		});
	}

	isAuthenticated() {
		const token = window.localStorage.getItem('token');
		if (!token) {
			return false;
		}

		const data: any = jwtDecode(token);

		return data.exp * 1000 > Date.now();
	}

	authenticate(credentials: Credentials) {
		return this.http
			.post(environment.apiUrl + '/login_token', credentials)
			.pipe(
				tap((data: { token: string }) => {
					window.localStorage.setItem('token', data.token);
					this.authChanged.next(true);
				})
			);
	}

	logout() {
		window.localStorage.removeItem('token');
		this.authChanged.next(false);
	}

	getToken() {
		return window.localStorage.getItem('token');
	}
}

export interface Credentials {
	username: string;
	password: string;
}
