import { Component, HostListener, OnInit } from '@angular/core';
import { BoletosService } from './services/boletos.service';
import { IApiResponseDto } from './interfaces/IApiResponseDTO';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit{

  title = 'app-rifas';
  public data : any;
  public data1 : any;


  constructor(private  serv: BoletosService){
  }
  ngOnInit(): void {


  }

  numeroSelected(number: String){
    console.log(number);

  }






}
