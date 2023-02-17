import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cep } from '../interfaces/cep';

@Injectable({
  providedIn: 'root'
})
export class apiCepService {

  private readonly baseURL: string = 'https://viacep.com.br/ws/'

  constructor(
    private http: HttpClient //
  ) { }

  procurarCep(numeroCep: string){
    return this.http.get<cep>(`${this.baseURL}${numeroCep}/json/`)
  }
}
