import { Component, OnInit } from '@angular/core';
import { CustomersService } from './customers.service';
import { Customer } from './customer';

@Component({
	selector: 'app-customers',
	template: `
		<h1>Mes clients</h1>
		<a routerLink="/customers/add" class="btn btn-link"
			>Ajouter un client</a
		>
		<table class="table">
			<thead>
				<tr>
					<th>Id</th>
					<th>Nom</th>
					<th>Email</th>
					<th class="text-center">Factures</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr *ngFor="let c of customers">
					<td>{{ c.id }}</td>
					<td>{{ c.fullName }}</td>
					<td>{{ c.email }}</td>
					<td class="text-center">{{ c.invoices.length }}</td>
					<td>
						<a
							routerLink="/customers/{{ c.id }}"
							class="btn btn-primary btn-sm"
							>Modifier</a
						>
						<button
							class="btn btn-danger btn-sm ml-1"
							(click)="handleDelete(c)"
						>
							Supprimer
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	`,
	styles: [],
})
export class CustomersComponent implements OnInit {
	customers: Customer[] = [];

	constructor(private customerService: CustomersService) {}

	ngOnInit(): void {
		this.customerService
			.findAll()
			.subscribe((customers) => (this.customers = customers));
	}

	handleDelete(c: Customer) {
		// Ecran de chargement

		const customersCopy = [...this.customers];
		// const index = this.customers.findIndex(
		// 	(customer) => customer.id === c.id
		// );
		const index = this.customers.indexOf(c);

		this.customers.splice(index, 1);

		this.customerService.delete(c.id).subscribe(
			() => {
				// TODO : Gérer l'UI (Chargement + Erreurs)
				// Fin du chargement
				// Petite alerte comme quoi ça a marché
			},
			(error) => {
				// Fin du chargement
				// Petite alerte comme quoi ça a foiré
				this.customers = customersCopy;
			}
		);
	}
}
