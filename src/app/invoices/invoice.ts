import { Customer } from '../customers/customer';

export interface Invoice {
	id?: number;
	chrono?: number;
	amount: number;
	createdAt?: string;
	updatedAt?: string;
	title: string;
	customer: string | Customer;
}
