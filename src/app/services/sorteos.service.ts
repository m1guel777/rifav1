import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constants } from "../app.constants";
import { Observable } from "rxjs";
import { IApiResponseDto } from "../interfaces/IApiResponseDTO";

@Injectable({
  providedIn: 'root'
})
export class SorteosService {

    constructor(
      private http: HttpClient,
      private cons: Constants) {
       }


     getSorteosActivos(): Observable<IApiResponseDto>{
      return this.http.get<IApiResponseDto>(`${Constants.getSorteosActivos}`);
    }




  }
