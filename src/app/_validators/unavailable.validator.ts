import { AbstractControl } from '@angular/forms';
import { map, take, debounceTime } from 'rxjs/operators';

export function Unavailable(afStore) {
  return (control: AbstractControl) => {
    const value = control.value.toLowerCase();
    return afStore.collection('users', ref => ref.where('username', '==', value))
      .valueChanges().pipe(
        debounceTime(500),
        take(1),
        map((arr: any[]) => arr.length ? { unavailable: true } : null )
      );
  };
}




