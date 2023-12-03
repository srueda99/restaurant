import { TestBed } from '@angular/core/testing';

import { MostrarModalService } from './mostrar-modal.service';

describe('MostrarModalService', () => {
  let service: MostrarModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostrarModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
