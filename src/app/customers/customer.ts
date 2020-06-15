export interface Customer {
	id?: number;
	fullName: string;
	company?: string;
	email: string;
	createdAt?: string;
	updatedAt?: string;
	invoices: any[];
	user?: any;
}
