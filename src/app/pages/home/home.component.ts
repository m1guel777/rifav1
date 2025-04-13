import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IApiResponseDto } from 'src/app/interfaces/IApiResponseDTO';
import { BoletosService } from 'src/app/services/boletos.service';
import { SorteosService } from 'src/app/services/sorteos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  public data1 : any;

    constructor(
      private router: Router,
      private serv: SorteosService
    ){

    }

  ngOnInit(): void {

    this.getSorteosActivos();
    // this.getRaffleByid();

  }


  async getSorteosActivos(){

    this.serv.getSorteosActivos().subscribe({
      next: (rs: IApiResponseDto) => {

        if (!rs.error) {
          console.log("sorteos activos:" , rs);
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




    verDetalle(id: number): void {
      this.router.navigate(['sorteos', id]);
    }

    verSorteoByid(id: number) {
      this.router.navigate(['/sorteos', id]);
    }





}

