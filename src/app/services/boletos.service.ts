import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';
import { Observable } from 'rxjs';
import { IApiResponseDto } from '../interfaces/IApiResponseDTO';
// import { IApiResponseDto } from '../interfaces/IApiResponseDto';


@Injectable({
  providedIn: 'root'
})
export class BoletosService {

  constructor(
    private http: HttpClient,
    private cons: Constants) {
     }


     getTicketsRaffleByid(id: number): Observable<IApiResponseDto>{
      return this.http.get<IApiResponseDto>(`${Constants.getLstTickets}${id}`);
     }

     getSorteosImgs(id: number): Observable<IApiResponseDto>{
      return this.http.get<IApiResponseDto>(`${Constants.getSorteosImgs}/${id}`);
    }

    getSorteosByid(id: number): Observable<IApiResponseDto>{
      return this.http.get<IApiResponseDto>(`${Constants.getSorteosByid}${id}`);
    }



}
