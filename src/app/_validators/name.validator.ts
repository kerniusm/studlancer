import { AbstractControl } from '@angular/forms';
import { map, take, debounceTime } from 'rxjs/operators';

export function Name(afStore) {
  return (control: AbstractControl) => {
    const value = control.value.toLowerCase();
    return afStore.collection('users', ref => ref.where('username', '==', value))
      .valueChanges().pipe(
        take(1),
        map((arr: any[]) => !arr.length ? { name: true } : null )
      );
  };
}

