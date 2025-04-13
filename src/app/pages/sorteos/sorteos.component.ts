import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IApiResponseDto } from 'src/app/interfaces/IApiResponseDTO';
import { RaffleImages } from 'src/app/interfaces/IRaffleImages';
import { BoletosService } from 'src/app/services/boletos.service';


@Component({
  selector: 'app-sorteos',
  templateUrl: './sorteos.component.html',
  styleUrls: ['./sorteos.component.scss']
})
export class SorteosComponent implements OnInit{

  public data1 : any;
  baseUrl: string = 'http://localhost:8082/imagenes/';
  imagenes: RaffleImages[] = [];
  imagenActualIndex: number = 0;

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
      this.getRaffleByid(numericId); // Llama al método pasándole el id numérico
    } else {
      console.log('ID no válido');
    }


  }



      async getRaffleByid(id: number){

        this.serv.getRaffleByid(id).subscribe({
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

            } else {
              console.log("error :" , rs);
            }
          },
          error: (e) => {

            console.log("error  : Exception" , e.message);

          }
        });
      }

      iniciarCarrusel() {
        setInterval(() => {
          this.imagenActualIndex = (this.imagenActualIndex + 1) % this.imagenes.length;
        }, 3000);
      }

      // get imagenActual() para obtener la imagen actual
      get imagenActual(): RaffleImages {
        return this.imagenes[this.imagenActualIndex];
      }



}
