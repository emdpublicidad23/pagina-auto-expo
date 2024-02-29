import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent {
  nombre: string = '';
  apellido: string = '';
  telefono: string = '';
  email: string = '';

  constructor(private http: HttpClient) {}

  submitForm() {
    const formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('apellido', this.apellido);
    formData.append('telefono', this.telefono);
    formData.append('email', this.email);
  
    console.warn(formData);
  
    this.http.post('https://autoexponld.com/php/registro.php', formData)
      .subscribe(
        (response: any) => {
          //alert(response['success']);
          Swal.fire(
            'Listo!',
            response['success'],
            'success'
          );
          this.nombre = '';
          this.apellido = '';
          this.telefono = '';
          this.email = '';
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Lo sentimos, ocurrio el siguiente error:',
            text: error.error.error,
          })
        }
      );
  }
  
}
