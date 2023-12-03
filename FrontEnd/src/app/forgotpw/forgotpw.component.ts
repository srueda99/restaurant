import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import axios from "axios";
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpw',
  templateUrl: './forgotpw.component.html',
  styleUrls: ['./forgotpw.component.css']
})
export class ForgotpwComponent {
  readonly APIUrl="http://localhost/";
  
  constructor(private router:Router){}

  ngOnInit(): void {
    this.recuperarConstraseña();
  } 

   recuperarConstraseña = async ()=>{

    const { value: email } = await Swal.fire({
      title: "Input email address",
      input: "email",
      inputLabel: "Your email address",
      inputPlaceholder: "Enter your email address"
    });
    
    axios.post( this.APIUrl+'olvidocontrasena',
      {
        email: email,
      }
    )
    .then(
      (res) => {
          if(res.data == true){
            Swal.fire({
              icon: "success",
              title: "Correo Enviado",
              text: 'Se has enviado el correo de recuperación',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/']);
          }else {
            Swal.fire({
              icon: "error",
              text: '¡Algo salió mal en el servidor!',
              title: "Opss...",
              showConfirmButton: false,
              timer: 1500
            }); 
            this.router.navigate(['/login']);      
          }
      })
      .catch((error) =>{
        Swal.fire({
          icon: "error",
          text: error,
          title: "Opss...",
          showConfirmButton: false,
          timer: 1500
        });  
        this.router.navigate(['/login']);   
      });  
    }
}

