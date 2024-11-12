// etiquetas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEtiquetas } from '../models/etiquetas.model';

@Injectable({
  providedIn: 'root'
})
export class EtiquetasService {

  private apiUrl = 'http://localhost:3001/etiquetas';  // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) { }

    // Método para obtener las etiquetas con paginación
    getEtiquetas(page: number, limit: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${page}/${limit}`);
    }
  
    // Método para crear una nueva etiqueta
    createEtiqueta(etiqueta: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}`, etiqueta);
    }
  
    // Método para eliminar una etiqueta
    deleteEtiqueta(id: string): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
  }