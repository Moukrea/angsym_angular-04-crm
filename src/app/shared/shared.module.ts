import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../ui/pagination.component';

@NgModule({
	declarations: [PaginationComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterModule,
		HttpClientModule,
	],
	exports: [
		CommonModule,
		ReactiveFormsModule,
		RouterModule,
		HttpClientModule,
		PaginationComponent,
	],
})
export class SharedModule {}
