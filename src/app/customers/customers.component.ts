import { Component, OnInit, Input } from '@angular/core';
import { CustomersService } from './customers.service';
import { Customer } from './customer';
import { UiService } from '../ui/ui.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-customers',
	template: `
		<h1>Mes clients</h1>
		<a routerLink="/customers/create" class="btn btn-link"
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
				<tr *ngFor="let c of getCustomersForCurrentPage()">
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

		<app-pagination
			[currentPage]="currentPage"
			[items]="customers.length"
			(pageChanged)="currentPage = $event"
		></app-pagination>
	`,
	styles: [],
})
export class CustomersComponent implements OnInit {
	customers: Customer[] = [];
	currentPage = 1;
	pages = [];

	constructor(
		private customerService: CustomersService,
		private ui: UiService,
		private toastr: ToastrService,
		private route: ActivatedRoute
	) {}

	getCustomersForCurrentPage() {
		//Retourner les utilisateurs représentant la page actuelle
		// currentPage == 1
		// Customers => 0
		// currentPage == 2
		// Customers => 10
		// currentPage == 3
		// Customers => 20
		const startIndex = (this.currentPage - 1) * 10;

		return this.customers.slice(startIndex, startIndex + 10);
	}

	ngOnInit(): void {
		// Without resolver
		// this.ui.setLoading(true);
		// this.customerService.findAll().subscribe((customers) => {
		// 	this.customers = customers;
		// 	this.ui.setLoading(false);
		// });

		// With resolver
		this.customers = this.route.snapshot.data.customers;
	}

	handleDelete(c: Customer) {
		// Ecran de chargement

		const customersCopy = [...this.customers];
		// const index = this.customers.findIndex(
		// 	(customer) => customer.id === c.id
		// );
		const index = this.customers.indexOf(c);

		this.customers.splice(index, 1);

		this.ui.setLoading(true);
		this.customerService.delete(c.id).subscribe(
			() => {
				// TODO : Gérer l'UI (Chargement + Erreurs)
				// Fin du chargement
				this.ui.setLoading(false);
				// Petite alerte comme quoi ça a marché
				this.toastr.success(
					'Le client a bien été supprimé',
					'Succès !'
				);
			},
			(error) => {
				// Fin du chargement
				// Petite alerte comme quoi ça a foiré
				this.customers = customersCopy;
				this.ui.setLoading(false);
				this.toastr.success(
					"Nous n'avons pas pu supprimer le client",
					'Erreur !'
				);
			}
		);
	}
}
