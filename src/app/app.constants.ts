import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})

export class Constants {
  constructor(){}


    /**************************** boletos ****************************/

    public static readonly getLstTickets:string = 'http://192.168.1.98:8082/ticket/allByRaffleId/';

    /**************************** sorteos ****************************/
    public static readonly getSorteosActivos:string = 'http://192.168.1.98:8082/raffles/all';

    public static readonly getSorteosByid:string = 'http://192.168.1.98:8082/raffles/byId/';

    /**************************** sorteos ****************************/
    public static readonly getSorteosImgs:string = 'http://192.168.1.98:8082/imgRaffles/all';


}
