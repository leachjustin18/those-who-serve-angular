import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DateValidatorService {
  usaDate(control: FormControl): { [key: string]: boolean } {
    const unitedStateDatePattern = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](20|21)\d\d$/;

    if (!control.value) {
      return;
    }

    if (!control.value.match(unitedStateDatePattern)) {
      return { usaDateError: true };
    }

    return null;
  }

  lessThenToday(control: FormControl): { [key: string]: boolean } {
    const today = new Date();
    const controlDate = new Date(control.value);

    if (!control.value) {
      return;
    }

    if (today >= controlDate) {
      return { lessThenToday: true };
    }

    return null;
  }
}
