import { Component, OnInit } from '@angular/core';
import { InvoicesService } from './invoices.service';
import { Invoice } from './invoice';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-invoices',
	template: `
		<h1>Mes factures</h1>
		<a routerLink="/invoices/create" class="btn btn-link"
			>Ajouter une facture</a
		>
		<table class="table">
			<thead>
				<tr>
					<th>Id</th>
					<th>Numéro</th>
					<th>Client</th>
					<th>Titre</th>
					<th class="text-center">Montant</th>
					<th class="text-center">Date</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr *ngFor="let i of invoices">
					<td>{{ i.id }}</td>
					<td>{{ i.chrono }}</td>
					<td>{{ i.customer.fullName }}</td>
					<td>{{ i.title }}</td>
					<td class="text-center">
						{{ i.amount | currency: 'EUR':'symbol' }}
					</td>
					<td class="text-center">
						{{ i.createdAt | date: 'dd/MM/yyyy' }}
					</td>
					<td>
						<div
							class="btn-group mr-2"
							role="group"
							aria-label="Second group"
						>
							<a
								href="/invoices/{{ i.id }}"
								class="btn btn-primary btn-sm"
								><i class="far fa-edit"></i
							></a>
							<button
								class="btn btn-danger btn-sm ml-1"
								(click)="handleDelete(i)"
							>
								<i class="far fa-trash-alt"></i>
							</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	`,
	styles: [],
})
export class InvoicesComponent implements OnInit {
	invoices: Invoice[] = [];

	constructor(private invoiceService: InvoicesService) {}

	ngOnInit(): void {
		this.invoiceService.findAll().subscribe((invoices) => {
			// Small personnal edit, price is actually properly displayed (as it was, multiplied by 100 in Symfony)
			invoices.forEach((invoice) => {
				invoice.amount /= 100;
			});
			this.invoices = invoices;
		});
	}

	handleDelete(i: Invoice) {
		const invoicesCopy = [...this.invoices];

		const index = this.invoices.indexOf(i);
		this.invoices.splice(index, 1);

		this.invoiceService.delete(i.id).subscribe(
			(invoice) => {},
			(error) => {
				this.invoices = invoicesCopy;
			}
		);
	}
}
