import { Component, OnInit } from '@angular/core';
import {
	FormGroup,
	FormControl,
	Validators,
	RequiredValidator,
} from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
	selector: 'app-login',
	template: `
		<h1>Connexion au CRM</h1>
		<form [formGroup]="form" (ngSubmit)="handleSubmit()">
			<div class="form-group">
				<input
					class="form-control"
					[class.is-invalid]="
						submitted && form.controls['username'].invalid
					"
					type="email"
					placeholder="Adresse de connexion"
					formControlName="username"
					class="form-control"
				/>
				<p
					class="invalid-feedback"
					*ngIf="
						submitted &&
						this.form.controls['username'].hasError('required')
					"
				>
					L'email est obligatoire
				</p>
				<p
					class="invalid-feedback"
					*ngIf="
						submitted &&
						this.form.controls['username'].hasError('email')
					"
				>
					Le format de l'adresse n'est pas valide
				</p>
			</div>
			<div class="form-group">
				<input
					class="form-control"
					[class.is-invalid]="
						submitted && form.controls['password'].invalid
					"
					type="password"
					placeholder="Mot de passe"
					formControlName="password"
					class="form-control"
				/>
				<p
					class="invalid-feedback"
					*ngIf="
						submitted &&
						this.form.controls['password'].hasError('required')
					"
				>
					Le mot de passe est obligatoire
				</p>
			</div>
			<button class="btn btn-success">Connexion !</button>
		</form>
	`,
	styles: [],
})
export class LoginComponent implements OnInit {
	form = new FormGroup({
		username: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required]),
	});
	submitted = false;

	constructor(private auth: AuthService) {}

	ngOnInit(): void {}

	handleSubmit() {
		this.submitted = true;
		if (this.form.invalid) {
			return;
		}

		this.auth.authenticate(this.form.value).subscribe(
			(data) => console.log(data),
			(error) => console.log(error)
		);
	}
}
