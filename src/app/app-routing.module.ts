import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './auth/register.component';
import { LoginComponent } from './auth/login.component';

const routes: Routes = [
	{ path: 'register', component: RegisterComponent },
	{ path: 'login', component: LoginComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
