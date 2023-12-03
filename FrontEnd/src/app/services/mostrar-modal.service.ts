import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MostrarModalService {

  constructor() { }

  $modalReservas = new EventEmitter<any>();
  $modalUsuarios = new EventEmitter<any>();
}
