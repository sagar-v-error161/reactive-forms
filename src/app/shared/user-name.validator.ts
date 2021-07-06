import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/* export function forbiddenNameValidator(control: AbstractControl: {[key: string]: any} | null) {
    const forbidden = /admin/.test(control.value);
    return forbidden ? { 'forbiddenName': {value: control.value}} : null;
} */
/** A hero's name can't match the given regular expression */
export function forbiddenNameValidator(forbiddenName: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = forbiddenName.test(control.value);
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
}