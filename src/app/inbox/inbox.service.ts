import { Injectable } from '@angular/core';
import { Message } from './message';
import { of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class InboxService {
	messages: Message[] = [
		{
			author: 'Joseph Dupont',
			email: 'jd@gmail.com',
			date: '2020-01-01',
			body:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste ducimus aut distinctio deserunt laboriosam explicabo. Eligendi facere sint impedit vero.',
			id: 1,
		},
		{
			author: 'Anne Durand',
			email: 'ad@gmail.com',
			date: '2020-03-02',
			body:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum natus sed accusamus repellat vero amet quia distinctio itaque error autem.',
			id: 2,
		},
		{
			author: 'Jérome Dupont',
			email: 'jejed@gmail.com',
			date: '2020-01-14',
			body:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, harum? Natus voluptate assumenda, labore libero tempora saepe quis consequatur eius!',
			id: 3,
		},
		{
			author: 'Albus Dumbledore',
			email: 'jd@gmail.com',
			date: '2020-02-15',
			body:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti officia nemo nobis ullam. Mollitia reprehenderit atque quisquam. Eligendi, at cumque!',
			id: 4,
		},
	];

	constructor() {}

	findAll() {
		return of(this.messages);
	}

	find(id: number) {
		return of(this.messages.find((m) => m.id === id));
	}
}
