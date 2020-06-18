import { Component, OnInit } from '@angular/core';
import { InboxService } from './inbox.service';
import { Observable } from 'rxjs';
import { Message } from './message';

@Component({
	selector: 'app-inbox',
	template: `
		<h1>Mes messages</h1>

		<a routerLink="create" class="btn btn-link">Nouveau message</a>

		<div class="border border-solid rounded row">
			<nav class="list-group col-5">
				<a
					routerLink="{{ m.id }}"
					class="list-group-item"
					*ngFor="let m of messages$ | async"
				>
					<strong>{{ m.author }} </strong>
					<small class="d-block">Le {{ m.date }}</small></a
				>
			</nav>
			<div class="col-7">
				<router-outlet></router-outlet>
			</div>
		</div>
	`,
	styles: [],
})
export class InboxComponent implements OnInit {
	messages$: Observable<Message[]>;

	constructor(private service: InboxService) {}

	ngOnInit(): void {
		this.messages$ = this.service.findAll();
	}
}
