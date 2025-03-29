import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produkty } from '../produkty';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProduktyService {

  private apiServerUrl = 'http://localhost:8080';

  constructor(private _http: HttpClient) { }

  public getProduktyList(): Observable<Produkty[]>{
    return this._http.get<any>(`${this.apiServerUrl}/produkty`);
  }

  public addProdukt(produkt: Produkty): Observable<Produkty>{
    return this._http.post<any>(`${this.apiServerUrl}/produkty` , produkt);
  }

  public updateProdukt(produktId: number,produkt: Produkty): Observable<Produkty>{
    return this._http.put<any>(`${this.apiServerUrl}/produkty/${produktId}` , produkt);
  }

  public deleteProdukt(produktId: number): Observable<void>{
    return this._http.delete<any>(`${this.apiServerUrl}/produkty/${produktId}`);
  }
}
