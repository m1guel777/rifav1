import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { IApiResponseDto } from 'src/app/interfaces/IApiResponseDTO';
import { Raffle, RaffleImages } from 'src/app/interfaces/IRaffle';
import { BoletosService } from 'src/app/services/boletos.service';


@Component({
  selector: 'app-sorteos',
  templateUrl: './sorteos.component.html',
  styleUrls: ['./sorteos.component.scss']
})
export class SorteosComponent implements OnInit{

  public data1 : any;
  baseUrl: string = 'http://192.168.1.98:8082/imagenes/';
  imagenes: RaffleImages[] = [];
  imagenActualIndex: number = 0;

  raffle: Raffle = {
    raffle_key: null,
    active: false,
    created_at: '',
    raffle: '',
    description: '',
    raffles_types_fk: 0,
    price_per_ticket: 0
  }

  customOptions = {
    loop: true,           // Permite que el carrusel se repita
    autoplay: true,       // Activa el desplazamiento automático
    autoplayTimeout: 5000, // Intervalo entre cada imagen (3 segundos)
    autoplayHoverPause: true, // Pausa el desplazamiento cuando el ratón está sobre el carrusel
    dots: true,           // Muestra los puntos de navegación
    nav: false,           // Desactiva las flechas de navegación
    items: 1,             // Muestra solo una imagen a la vez
    margin: 0,            // Sin margen entre las imágenes
    stagePadding: 0,      // Sin relleno adicional
    responsive: {         // En dispositivos pequeños también muestra 1 imagen
      0: { items: 1 },
      600: { items: 1 },
      1000: { items: 1 }
    }
  };


  constructor(private  serv: BoletosService,
        private route: ActivatedRoute,
        private router: Router
      ){

      }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID del sorteo recibido:', id);

    // Verificar si id es null y convertirlo a número si no lo es
    if (id) {
      const numericId = +id; // Convierte el string 'id' a número
      this.getTicketsRaffleByid(numericId); // Llama al método pasándole el id numérico
    } else {
      console.log('ID no válido');
    }


  }



      async getTicketsRaffleByid(id: number){

        this.serv.getTicketsRaffleByid(id).subscribe({
          next: (rs: IApiResponseDto) => {

            if (!rs.error) {
              console.log("boletos raffle 2:" , rs);
              this.data1 = rs.data;


              this.getSorteosImgs(id);
            } else {
              console.log("error :" , rs);
            }
          },
          error: (e) => {

            console.log("error  : Exception" , e.message);

          }
        });
      }

      salir(): void {
        this.router.navigate(['']);
      }


      async getSorteosImgs(id: number){

        this.serv.getSorteosImgs(id).subscribe({
          next: (rs: IApiResponseDto) => {

            if (!rs.error) {
              console.log("imgs de sorteos:" , rs);

              this.imagenes = rs.data;
              this.getSorteosByid(id);

            } else {
              console.log("error :" , rs);
            }
          },
          error: (e) => {

            console.log("error  : Exception" , e.message);

          }
        });
      }


      async getSorteosByid(id: number){

        this.serv.getSorteosByid(id).subscribe({
          next: (rs: IApiResponseDto) => {

            if (!rs.error) {
              this.raffle = rs.data[0];
              console.log("el sorteo es :" , this.raffle);
            } else {
              console.log("error :" , rs);
            }
          },
          error: (e) => {

            console.log("error  : Exception" , e.message);

          }
        });
      }






}
