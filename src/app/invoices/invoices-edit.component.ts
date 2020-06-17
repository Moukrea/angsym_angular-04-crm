import { Component, OnInit } from '@angular/core';
import { InvoicesService } from './invoices.service';
import { CustomersService } from '../customers/customers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from './invoice';
import { Customer } from '../customers/customer';
import { map, switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
	selector: 'app-invoices-edit',
	template: `
		<h1>Modifier un client</h1>
		<form [formGroup]="form" (ngSubmit)="handleSubmit()">
			<div class="form-group">
				<label for="title">Titre</label>
				<input
					[class.is-invalid]="
						submitted && form.controls['title'].invalid
					"
					type="text"
					class="form-control"
					formControlName="title"
					id="title"
					placeholder="Titre de la facture"
				/>
				<p
					class="invalid-feedback"
					*ngIf="submitted && form.controls['title'].invalid"
				>
					{{ form.controls['title'].getError('invalid') }}
				</p>
			</div>
			<div class="form-group">
				<label for="amount">Montant</label>
				<input
					[class.is-invalid]="
						submitted &&
						(form.controls['amount'].invalid ||
							form.controls['amount'].hasError('required'))
					"
					type="number"
					class="form-control"
					formControlName="amount"
					id="amount"
					placeholder="Montant de la facture"
				/>
				<p
					class="invalid-feedback"
					*ngIf="submitted && form.controls['amount'].invalid"
				>
					{{ form.controls['amount'].getError('invalid') }}
				</p>
				<p
					class="invalid-feedback"
					*ngIf="
						submitted &&
						form.controls['amount'].hasError('required')
					"
				>
					Veuillez préciser un montant
				</p>
			</div>
			<div class="form-group">
				<label for="customer">Client</label>
				<select
					[class.is-invalid]="
						submitted &&
						form.controls['customer'].hasError('required')
					"
					formControlName="customer"
					id="customer"
					class="form-control"
					><option value="">-- Sélectionnez un client --</option
					><option
						value="/api/customers/{{ c.id }}"
						*ngFor="let c of customers"
						>{{ c.fullName }}</option
					>
				</select>
				<p
					class="invalid-feedback"
					*ngIf="
						submitted &&
						form.controls['customer'].hasError('required')
					"
				>
					Le client est obligatoire !
				</p>
			</div>
			<button class="btn btn-success">Enregistrer</button>
		</form>
	`,
	styles: [],
})
export class InvoicesEditComponent implements OnInit {
	invoice: Invoice;
	customers: Customer[] = [];
	submitted = false;

	form = new FormGroup({
		title: new FormControl(''),
		amount: new FormControl('', Validators.required),
		customer: new FormControl('', Validators.required),
	});

	constructor(
		private invoiceService: InvoicesService,
		private customerService: CustomersService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.customerService
			.findAll()
			.subscribe((customers) => (this.customers = customers));

		this.route.paramMap
			.pipe(
				map((params) => +params.get('id')),
				switchMap((id) => this.invoiceService.find(id)),
				map((invoice) => {
					return {
						...invoice,
						customer: `/api/customers/${
							(invoice.customer as Customer).id
						}`,
						amount: invoice.amount / 100,
					};
				})
			)
			.subscribe((invoice) => {
				this.invoice = invoice;
				this.form.patchValue(this.invoice);
			});
	}

	handleSubmit() {
		this.submitted = true;

		if (this.form.invalid) {
			return;
		}

		this.invoiceService
			.update({
				...this.invoice,
				...this.form.value,
				amount: this.form.value.amount * 100,
			})
			.subscribe(
				(invoice) => {
					this.router.navigateByUrl('/invoices');
				},
				(error) => {
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
				}
			);
	}
}
