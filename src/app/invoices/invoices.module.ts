import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesComponent } from './invoices.component';
import { InvoicesCreateComponent } from './invoices-create.component';
import { InvoicesEditComponent } from './invoices-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [
		InvoicesComponent,
		InvoicesCreateComponent,
		InvoicesEditComponent,
	],
	imports: [SharedModule],
})
export class InvoicesModule {}
