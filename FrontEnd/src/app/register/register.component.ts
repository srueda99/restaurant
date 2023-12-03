import { Component } from "@angular/core";
import {Router} from "@angular/router"
import Swal from 'sweetalert2';
import axios from "axios";
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
}
)
export class RegisterComponent {
  username: string='';
  email: string='';
  password: string='';
  confirmPassword: string='';
  readonly APIUrl="http://localhost/";


  constructor(private router: Router, private toastr: ToastrService) {}
  

  register() {
      if (!this.username || !this.password || !this.confirmPassword) {
      alert('Por favor ingrese todos los campos.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    axios.post( this.APIUrl+'register',
      {
        username : this.username,
        email: this.email,
        password : this.password,
      }
    )
    .then(
      (res) => {
        if(res.data == true){
          this.toastr.success('¡Operación exitosa!', 'Éxito');
          Swal.fire({
            icon: "success",
            title: "Usuario Registrado",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/login'])
        }
        else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡Algo sucedió en el servidor!"
          });
        }
      })
      .catch((error) =>{
        Swal.fire({
          title: "Sin conexión con el servidor",
          text: error,
          icon: "question"
        });
      });
  }

}