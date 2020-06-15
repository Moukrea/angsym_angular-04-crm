import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient) {}

	isAuthenticated() {
		return window.localStorage.getItem('token');
	}

	authenticate(credentials: Credentials) {
		return this.http
			.post(environment.apiUrl + '/login_token', credentials)
			.pipe(
				tap((data: { token: string }) => {
					window.localStorage.setItem('token', data.token);
				})
			);
	}

	logout() {
		window.localStorage.removeItem('token');
	}

	getToken() {
		return window.localStorage.getItem('token');
	}
}

export interface Credentials {
	username: string;
	password: string;
}
