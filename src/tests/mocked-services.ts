import {BehaviorSubject} from 'rxjs';
import {Store} from '@ngrx/store';

export function mockService(serviceClass: any): any {
  const props = Object.getOwnPropertyNames(serviceClass.prototype).slice(1);
  return jasmine.createSpyObj(props);
}

export class MockStore<T> {
  public pipe: jasmine.Spy = jasmine.createSpy('pipe');
  public dispatch: jasmine.Spy;

  constructor() {
    Object.assign(this, mockService(Store));
    this.pipe.and.returnValue(new BehaviorSubject<any>({}));
  }
}
