import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { CustomerEditComponent } from './customer-edit.component';
import { CustomerCreateComponent } from './customer-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { PaginationComponent } from '../ui/pagination.component';

@NgModule({
	declarations: [
		CustomersComponent,
		CustomerEditComponent,
		CustomerCreateComponent,
		PaginationComponent,
	],
	imports: [SharedModule],
})
export class CustomersModule {}
