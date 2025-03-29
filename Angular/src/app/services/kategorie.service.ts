import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Kategorie } from '../kategorie';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class KategorieService {

  private apiServerUrl = 'http://localhost:8080';

  constructor(private _http: HttpClient) { }

  public getKategorieList(): Observable<Kategorie[]>{
    return this._http.get<any>(`${this.apiServerUrl}/kategorie`);
  }

  getKategoriaById(id: number[]): Observable<Kategorie[]> {
    return this._http.post<Kategorie[]>(`${this.apiServerUrl}/kategorie/id`, id);
  }

  public addKategoria(kategoria: Kategorie): Observable<Kategorie>{
    return this._http.post<any>(`${this.apiServerUrl}/kategorie` , kategoria);
  }

  public updateKategoria(kategoriaId: number,kategoria: Kategorie): Observable<Kategorie>{
    return this._http.put<any>(`${this.apiServerUrl}/kategorie/${kategoriaId}` , kategoria);
  }

  public deleteKategoria(kategoriaId: number): Observable<void>{
    return this._http.delete<any>(`${this.apiServerUrl}/kategorie/${kategoriaId}`);
  }
}
