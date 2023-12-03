import { Component, Input } from '@angular/core';
import { MostrarModalService } from '../services/mostrar-modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() titulo: string = 'Modal';
  @Input() value: string="";
  
  constructor(private modalSS:MostrarModalService){}

  cerrarReservas():void {
    this.modalSS.$modalReservas.emit(false);
  }

  cerrarUsuarios():void {
    this.modalSS.$modalUsuarios.emit(false);
  }

}
