import { Component, OnInit } from '@angular/core';
import { CustomersService } from './customers.service';
import { Customer } from './customer';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-customer-add',
	template: `
		<h1>Ajouter un client</h1>
		<form [formGroup]="form" (ngSubmit)="handleSubmit()">
			<div class="form-group">
				<input
					[class.is-invalid]="
						submitted && form.controls['fullName'].invalid
					"
					type="text"
					class="form-control"
					formControlName="fullName"
					placeholder="Nom complet"
				/>
				<p
					class="invalid-feedback"
					*ngIf="submitted && form.controls['fullName'].invalid"
				>
					{{ form.controls['fullName'].getError('invalid') }}
				</p>
			</div>
			<div class="form-group">
				<input
					[class.is-invalid]="
						submitted && form.controls['email'].invalid
					"
					type="email"
					class="form-control"
					formControlName="email"
					placeholder="Adresse email"
				/>
				<p
					class="invalid-feedback"
					*ngIf="submitted && form.controls['email'].invalid"
				>
					{{ form.controls['email'].getError('invalid') }}
				</p>
			</div>
			<div class="form-group">
				<input
					[class.is-invalid]="
						submitted && form.controls['company'].invalid
					"
					type="text"
					class="form-control"
					formControlName="company"
					placeholder="Entreprise / Société (optionnel)"
				/>
				<p
					class="invalid-feedback"
					*ngIf="submitted && form.controls['company'].invalid"
				>
					{{ form.controls['company'].getError('invalid') }}
				</p>
			</div>
			<button type="submit" class="btn btn-success">
				Enregistrer les modifications
			</button>
		</form>
	`,
	styles: [],
})
export class CustomerAddComponent implements OnInit {
	form = new FormGroup({
		fullName: new FormControl(''),
		email: new FormControl(''),
		company: new FormControl(''),
	});
	customer: Customer;
	submitted = false;

	constructor(private service: CustomersService, private router: Router) {}

	ngOnInit(): void {}

	handleSubmit() {
		this.submitted = true;
		this.service.add(this.form.value).subscribe(
			(customer) => {
				this.router.navigateByUrl('/customers');
			},
			(error: HttpErrorResponse) => {
				if (error.status === 400 && error.error.violations) {
					for (const violation of error.error.violations) {
						const nomDuChamp = violation.propertyPath;
						const message = violation.message;

						this.form.controls[nomDuChamp].setErrors({
							invalid: message,
						});
					}
					return;
				}

				// TODO : Gérer l'UI en cas d'erreur
			}
		);
	}
}
