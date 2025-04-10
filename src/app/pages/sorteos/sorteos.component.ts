import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IApiResponseDto } from 'src/app/interfaces/IApiResponseDTO';
import { BoletosService } from 'src/app/services/boletos.service';

@Component({
  selector: 'app-sorteos',
  templateUrl: './sorteos.component.html',
  styleUrls: ['./sorteos.component.scss']
})
export class SorteosComponent implements OnInit{

  public data1 : any;

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


}
