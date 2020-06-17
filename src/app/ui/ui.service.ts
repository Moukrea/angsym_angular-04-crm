import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UiService {
	flash = new Subject<{ type: string; message: string }>();
	loadingSubject = new Subject<boolean>();

	constructor() {}

	setLoading(loading: boolean) {
		this.loadingSubject.next(loading);
	}

	addFlash(type: string, message: string) {
		this.flash.next({ type, message });
	}

	fillViolationsInForm(form: FormGroup, violations: ApiViolation[]) {
		for (const violation of violations) {
			const nomDuChamp = violation.propertyPath;
			const message = violation.message;

			form.controls[nomDuChamp].setErrors({
				invalid: message,
			});
		}
	}
}

interface ApiViolation {
	propertyPath: string;
	message: string;
}
