import { Component, OnInit } from '@angular/core';
import { BoletosService } from './services/boletos.service';
import { IApiResponseDto } from './interfaces/IApiResponseDTO';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit{

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  title = 'app-rifas';

  numerosRifa: String[] = [];

  public data : any;

  constructor(private  serv: BoletosService){
    this.generarNumerosRifa();
  }
  ngOnInit(): void {

    this.getTickets();
  }

  //99999
  generarNumerosRifa() {
    this.numerosRifa = [];
    for (let i = 0; i <= 200; i++) {
      const numero = ('00000' + i).slice(-5); // Formatea el número para que tenga 5 dígitos
      this.numerosRifa.push(numero);
    }
  }


  numeroSelected(number: String){
    console.log(number);

  }



  async getTickets(){

    this.serv.getLstApiKeys().subscribe({
      next: (rs: IApiResponseDto) => {

        if (!rs.error) {
          console.log("boletos :" , rs);
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
