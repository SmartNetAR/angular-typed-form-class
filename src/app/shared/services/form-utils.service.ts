import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

export type FormGroupOf<T> = {
  [key in keyof T]: T[key] extends Array<infer TArray>
    ? FormArray<
        TArray extends object
          ? FormGroup<FormGroupOf<TArray>>
          : FormControl<TArray | null | undefined>
      >
    : T[key] extends object
    ? FormGroup<FormGroupOf<T[key]>>
    : FormControl<T[key] | null | undefined>;
};

@Injectable({
  providedIn: 'root',
})
export class FormUtilsService {
  constructor() {}

  makeNonNullableFormControl<T>(
    value: T,
    validator?: ValidatorFn | ValidatorFn[] | null
  ): FormControl<T> {
    return new FormControl(value, { nonNullable: true, validators: validator });
  }

  makeFormControl<T>(
    value: T | null,
    validator?: ValidatorFn | ValidatorFn[] | null
  ): FormControl<T | null> {
    return new FormControl(value, validator);
  }
}

export type ControlsOf<T extends Record<string, any>> = {
  [key in keyof T]: T[key] extends Array<infer TArray>
    ? FormControl<T[key] | null | undefined>
    : T[key] extends object
    ? FormGroup<ControlsOf<T[key]>>
    : FormControl<T[key]>;
};
