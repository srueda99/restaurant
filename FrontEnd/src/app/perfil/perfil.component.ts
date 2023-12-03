import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { CookieService } from 'ngx-cookie';
import Swal from 'sweetalert2';
import axios from "axios";
import { MostrarModalService } from '../services/mostrar-modal.service';
import {Storage, ref, getDownloadURL, listAll, list} from '@angular/fire/storage';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  Entradas: string[];
  Entrada_1: string;
  Entrada_2: string;
  Entrada_3: string;
  Entrada_4: string;
  Entrada_5: string;
  Entrada_6: string;
  Desayuno_1: string;
  Desayuno_2: string;
  Desayuno_3: string;
  Desayuno_4: string;
  Desayuno_5: string;
  Desayuno_6: string;
  Almuerzo_1: string;
  Almuerzo_2: string;
  Almuerzo_3: string;
  Almuerzo_4: string;
  Almuerzo_5: string;
  Almuerzo_6: string;


  readonly APIUrl="http://localhost/";
  usuario : any = {};
  reservas: any =[];
  mostrarModal: boolean=false;  

  constructor(private modalSS:MostrarModalService, private router: Router, private cookieService: CookieService, private storage: Storage){
    this.Entradas = [];
    this.Entrada_1 = "https://firebasestorage.googleapis.com/v0/b/app-web-81795.appspot.com/o/Menu%2FEntradas%2Ftabla-jamones.png?alt=media&token=0b365e01-ec55-43ea-a066-8e4ea33b1674";
    this.Entrada_2 = "https://firebasestorage.googleapis.com/v0/b/app-web-81795.appspot.com/o/Menu%2FEntradas%2Ftabla-quesos.jpg?alt=media&token=4a918644-b489-45ee-8a04-f4bd2c5a7a79";
    this.Entrada_3 = "https://firebasestorage.googleapis.com/v0/b/app-web-81795.appspot.com/o/Menu%2FEntradas%2Ftabla-brushettes.jpg?alt=media&token=a78cea9c-7b65-483d-87f9-9e0e1122e9b7";
    this.Entrada_4 = "https://firebasestorage.googleapis.com/v0/b/app-web-81795.appspot.com/o/Menu%2FEntradas%2Ftabla-tzatziki.png?alt=media&token=0b48005a-2a07-46f6-80da-7232df6007ec";
    this.Entrada_5 = "https://firebasestorage.googleapis.com/v0/b/app-web-81795.appspot.com/o/Menu%2FEntradas%2Ftabla-hummus.jpg?alt=media&token=05918c8a-5c92-4ae0-88bb-3361827045f9";
    this.Entrada_6 = "https://firebasestorage.googleapis.com/v0/b/app-web-81795.appspot.com/o/Menu%2FEntradas%2Ftabla-pierogi.png?alt=media&token=54ef3e08-253b-4963-addd-7cd365d086d9";
    this.Desayuno_1 = "https://firebasestorage.googleapis.com/v0/b/app-web-81795.appspot.com/o/Menu%2FDesayunos%2Fdesayuno-huevoesp.jpg?alt=media&token=d591a819-8e6e-4690-a350-75482e30da25";
    this.Desayuno_2 = "https://firebasestorage.googleapis.com/v0/b/app-web-81795.appspot.com/o/Menu%2FDesayunos%2Fdesayuno-muesli-suizo.jpg?alt=media&token=bcbd6680-011e-48b9-a953-faadf95194e6";
    this.Desayuno_3 = "https://firebasestorage.googleapis.com/v0/b/app-web-81795.appspot.com/o/Menu%2FDesayunos%2Fdesayuno-senfei-aleman.jpg?alt=media&token=47ae3f3b-ebc5-4c87-9afb-1109360ba045";
    this.Desayuno_4 = "https://firebasestorage.googleapis.com/v0/b/app-web-81795.appspot.com/o/Menu%2FDesayunos%2Fdesayuno-speck-aleman.jpg?alt=media&token=98e73f6c-8fa7-4fd8-b53f-93b35d66907f";
    this.Desayuno_5 = "https://firebasestorage.googleapis.com/v0/b/app-web-81795.appspot.com/o/Menu%2FDesayunos%2Fdesayuno-aprikosen-aleman.jpg?alt=media&token=2ef8447c-0994-4737-ae65-9c089fb2c844";
    this.Desayuno_6 = "https://firebasestorage.googleapis.com/v0/b/app-web-81795.appspot.com/o/Menu%2FDesayunos%2Fdesayuno-aleman.jpg?alt=media&token=3aba2eca-9a29-42a7-b9ed-0d17e48692bc";
    this.Almuerzo_1 = "https://firebasestorage.googleapis.com/v0/b/app-web-81795.appspot.com/o/Menu%2FAlmuerzos%2Falmuerzo-pollo-provenzal-frances.jpg?alt=media&token=70dc5c03-a71a-4bc6-b4ea-174eb855aea6";
    this.Almuerzo_2 = "https://firebasestorage.googleapis.com/v0/b/app-web-81795.appspot.com/o/Menu%2FAlmuerzos%2Falmuerzo-risotto-italiano.jpg?alt=media&token=74ca8d02-6f28-4c30-aedf-cbb3c0c6274a";
    this.Almuerzo_3 = "https://firebasestorage.googleapis.com/v0/b/app-web-81795.appspot.com/o/Menu%2FAlmuerzos%2Falmuerzo-marengo-frances.jpg?alt=media&token=98867f53-2d3e-44c9-ba8d-1acd3e35cbcb";
    this.Almuerzo_4 = "https://firebasestorage.googleapis.com/v0/b/app-web-81795.appspot.com/o/Menu%2FAlmuerzos%2Falmuerzo-bistecca-italiano.jpg?alt=media&token=8f7cba61-7ab3-49dc-b100-9ad2ae39d271";
    this.Almuerzo_5 = "https://firebasestorage.googleapis.com/v0/b/app-web-81795.appspot.com/o/Menu%2FAlmuerzos%2Falmuerzo-ratatouille-frances.jpg?alt=media&token=7b8ac358-7d6b-4f18-bea3-97a51094f2a2";
    this.Almuerzo_6 = "https://firebasestorage.googleapis.com/v0/b/app-web-81795.appspot.com/o/Menu%2FAlmuerzos%2Falmuerzo-filete-frances.jpg?alt=media&token=473826a1-1094-472e-b93b-4e0499f37a1a";
  }
  
  ngOnInit(): void {
    this.obtenerUsuario();
    this.modalSS.$modalReservas.subscribe((valor)=>(this.mostrarModal = valor));
  } 
  
  abrirModal(): void {
    this.obtenerReservas();
    this.mostrarModal = true;
  }
  
  obtenerUsuario():void{

    axios.post( this.APIUrl+'obtenerusuario',
      {
        token: this.cookieService.get('token')
      }
    )
    .then(
      (res) => {
          if(res && res.data){
            this.usuario=res.data;
          }else {
            Swal.fire({
              icon: "error",
              text: res.data,
              title: "Sesión cerrada",
              showConfirmButton: false,
              timer: 1500
            });       
          }
      })
      .catch((error) =>{
        Swal.fire({
          icon: "error",
          text: error,
          title: "Sesión cerrada",
          showConfirmButton: false,
          timer: 1500
        });  
      });  
  }

  cerrarSesion():void{
    try {
      this.cookieService.remove('token');
      Swal.fire({
        icon: "success",
        title: "Sesión cerrada",
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
    }
  }

  obtenerReservas():void{
    axios.post( this.APIUrl+'obtenerreservas',
      {
        username: this.usuario.username,
      }
    )
    .then(
      (res) => {
          if(res && res.data){
            this.reservas=res.data;
          }else {
            Swal.fire({
              icon: "error",
              text: res.data,
              title: "Sesión cerrada",
              showConfirmButton: false,
              timer: 1500
            });  
          }
      })
      .catch((error) =>{
        Swal.fire({
          icon: "error",
          text: error,
          title: "Sesión cerrada",
          showConfirmButton: false,
          timer: 1500
        });  
      });  
  }

  irbooking():void{
    try {
      this.router.navigate(['/booking', this.usuario.username]);
    } catch (error) {
      console.log(error)
    }
  }
}
