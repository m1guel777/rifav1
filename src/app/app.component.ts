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

    this.getTickets();
    // this.getRaffleByid();
  }

  numeroSelected(number: String){
    console.log(number);

  }



  async getTickets(){

    this.serv.getLstApiKeys().subscribe({
      next: (rs: IApiResponseDto) => {

        if (!rs.error) {
          console.log("boletos raflle 1:" , rs);
          this.data = rs.data;
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
