import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from './user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	template: `<h1>Inscription</h1>
		<div class="alert alert-info" *ngIf="loading">
			En cours de chargement...
		</div>
		<div class="alert alert-danger" *ngIf="error">
			Une erreur inconnue est survenue, merci de réessayer plus tard
		</div>
		<form [formGroup]="form" (ngSubmit)="handleSubmit()">
			<div class="form-group">
				<input
					formControlName="fullName"
					type="text"
					class="form-control"
					[class.is-invalid]="getErrorForControl('fullName')"
					placeholder="Nom complet (ex: John Doe)"
				/>
				<p
					class="invalid-feedback"
					*ngIf="getErrorForControl('fullName')"
				>
					{{ getErrorForControl('fullName') }}
				</p>
			</div>
			<div class="form-group">
				<input
					formControlName="email"
					type="email"
					class="form-control"
					[class.is-invalid]="getErrorForControl('email')"
					placeholder="Adresse email"
				/>
				<p class="invalid-feedback" *ngIf="getErrorForControl('email')">
					{{ getErrorForControl('email') }}
				</p>
			</div>
			<div class="form-group">
				<input
					formControlName="password"
					type="password"
					class="form-control"
					[class.is-invalid]="getErrorForControl('password')"
					placeholder="Mot de passe"
				/>
				<p
					class="invalid-feedback"
					*ngIf="getErrorForControl('password')"
				>
					{{ getErrorForControl('password') }}
				</p>
			</div>
			<div class="form-group">
				<input
					formControlName="confirmation"
					type="password"
					class="form-control"
					[class.is-invalid]="getErrorForControl('confirmation')"
					placeholder="Confirmation"
				/>
				<p
					class="invalid-feedback"
					*ngIf="getErrorForControl('confirmation')"
				>
					{{ getErrorForControl('confirmation') }}
				</p>
			</div>
			<button class="btn btn-success">Je m'inscris</button>
		</form>`,
	styles: [],
})
export class RegisterComponent implements OnInit {
	form = new FormGroup({
		fullName: new FormControl(''),
		email: new FormControl(''),
		password: new FormControl(''),
		confirmation: new FormControl(''),
	});
	submitted = false;
	loading = false;
	error = false;

	constructor(private userService: UserService, private router: Router) {}

	ngOnInit(): void {}

	getErrorForControl(controlName: string) {
		return this.form.controls[controlName].getError('invalid');
	}

	handleSubmit() {
		this.loading = true;
		this.error = false;

		this.userService.create(this.form.value).subscribe(
			(user) => {
				this.loading = false;
				this.error = false;
				this.router.navigateByUrl('/login');
			},
			(error: HttpErrorResponse) => {
				this.loading = false;
				this.error = true;

				if (error.status === 400 && error.error.violations) {
				}

				for (const violation of error.error.violations) {
					const nomDuChamp = violation.propertyPath;
					const message = violation.message;

					this.form.controls[nomDuChamp].setErrors({
						invalid: message,
					});
				}
				return;
			}
		);
	}
}
