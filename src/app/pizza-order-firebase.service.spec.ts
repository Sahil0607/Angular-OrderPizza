import { TestBed } from '@angular/core/testing';

import { PizzaOrderFirebaseService } from './pizza-order-firebase.service';

describe('PizzaOrderFirebaseService', () => {
  let service: PizzaOrderFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PizzaOrderFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
