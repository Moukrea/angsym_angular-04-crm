import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-navbar',
	template: `
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
			<a class="navbar-brand" routerLink="/">AngSym CRM</a>
			<button
				class="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarColor02"
				aria-controls="navbarColor02"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarColor02">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item">
						<a
							class="nav-link"
							routerLink="/customers"
							routerLinkActive="active"
							>Mes clients</a
						>
					</li>
					<li class="nav-item">
						<a
							class="nav-link"
							routerLink="/invoices"
							routerLinkActive="active"
							>Mes factures</a
						>
					</li>
				</ul>
				<ul class="navbar-nav ml-auto">
					<ng-container *ngIf="!auth.isAuthenticated()">
						<li class="nav-item">
							<a routerLink="/register" class="nav-link"
								>Inscription</a
							>
						</li>
						<li class="nav-item">
							<a routerLink="/login" class="btn btn-primary"
								>Connexion</a
							>
						</li>
					</ng-container>
					<li class="nav-item" *ngIf="auth.isAuthenticated()">
						<button
							class="btn btn-warning"
							(click)="handleLogout()"
						>
							Déconnexion
						</button>
					</li>
				</ul>
			</div>
		</nav>
	`,
	styles: [],
})
export class NavbarComponent implements OnInit {
	constructor(public auth: AuthService, private router: Router) {}

	ngOnInit(): void {}

	handleLogout() {
		this.auth.logout();

		this.router.navigateByUrl('/login');
	}
}
