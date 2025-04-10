import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})

export class Constants {
  constructor(){}


    /**************************** boletos ****************************/

    public static readonly getLstTickets:string = 'http://localhost:8082/ticket/allByRaffleId/';

}
