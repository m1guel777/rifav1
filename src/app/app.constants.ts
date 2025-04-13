import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})

export class Constants {
  constructor(){}


    /**************************** boletos ****************************/

    public static readonly getLstTickets:string = 'http://localhost:8082/ticket/allByRaffleId/';

    /**************************** sorteos ****************************/
    public static readonly getSorteosActivos:string = 'http://localhost:8082/raffles/all';

    /**************************** sorteos ****************************/
    public static readonly getSorteosImgs:string = 'http://localhost:8082/imgRaffles/all';


}
