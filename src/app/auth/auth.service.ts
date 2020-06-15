import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient) {}

	authenticate(credentials: Credentials) {
		return this.http.post(environment.apiUrl + '/login_token', credentials);
	}
}

export interface Credentials {
	username: string;
	password: string;
}
