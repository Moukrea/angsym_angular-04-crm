import { Component, OnInit, OnDestroy } from '@angular/core';
import { InvoicesService } from './invoices.service';
import { Invoice } from './invoice';
import { map, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
		<app-pagination
			[itemsPerPage]="invoices.length"
			[currentPage]="currentPage"
			[items]="totalItems"
			(pageChanged)="handlePageChange($event)"
		></app-pagination>
	`,
	styles: [],
})
export class InvoicesComponent implements OnInit, OnDestroy {
	invoices: Invoice[] = [];
	totalItems: number;
	currentPage = 1;

	invoicesSubscription: Subscription;
	deleteSubscription: Subscription;

	subscriptions: Subscription[] = [];

	constructor(
		private invoiceService: InvoicesService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		const subscription = this.route.queryParamMap
			.pipe(
				map((params) => (params.has('page') ? +params.get('page') : 1)),
				tap((page) => (this.currentPage = page)),
				switchMap((page) => this.invoiceService.findAll(page))
			)
			.subscribe((paginatedInvoices) => {
				// Small personnal edit, price is actually properly displayed (as it was, multiplied by 100 in Symfony)
				paginatedInvoices.items.forEach((invoice) => {
					invoice.amount /= 100;
				});
				this.invoices = paginatedInvoices.items;
				this.totalItems = paginatedInvoices.total;
			});

		this.subscriptions.push(subscription);
	}

	ngOnDestroy() {
		for (const subscription of this.subscriptions) {
			subscription.unsubscribe();
		}
	}

	handleDelete(i: Invoice) {
		const invoicesCopy = [...this.invoices];

		const index = this.invoices.indexOf(i);
		this.invoices.splice(index, 1);

		const subscription = this.invoiceService.delete(i.id).subscribe(
			(invoice) => {},
			(error) => {
				this.invoices = invoicesCopy;
			}
		);

		this.subscriptions.push(subscription);
	}

	handlePageChange(page: number) {
		// this.currentPage = page;

		// this.invoiceService
		// 	.findAll(this.currentPage)
		// 	.subscribe((paginatedInvoices) => {
		// 		// Small personnal edit, price is actually properly displayed (as it was, multiplied by 100 in Symfony)
		// 		paginatedInvoices.items.forEach((invoice) => {
		// 			invoice.amount /= 100;
		// 		});
		// 		this.invoices = paginatedInvoices.items;
		// 		this.totalItems = paginatedInvoices.total;
		// 	});

		this.router.navigateByUrl('/invoices?page=' + page);
	}
}
