import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IApiResponseDto } from 'src/app/interfaces/IApiResponseDTO';
import { BoletosService } from 'src/app/services/boletos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  public data1 : any;

    constructor(
      private router: Router
    ){

    }

  ngOnInit(): void {


    // this.getRaffleByid();

  }





    verDetalle(id: number): void {
      this.router.navigate(['sorteos', id]);
    }

}
