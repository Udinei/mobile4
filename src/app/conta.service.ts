import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ContaTO } from './ContaTO';
import { NumeroTO } from './NumeroTO';
import { TransferenciaTO } from './TransferenciaTO';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  private base_path = 'http://localhost:8080/transferencia/';
  private httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})}

  constructor(private http: HttpClient) {
  }
 
  getConta(conta: number): Observable<ContaTO> {
    var to = new NumeroTO()
    to.conta = conta ? conta : null
    return this.http.post<ContaTO>(this.base_path + 'getconta', JSON.stringify(to), this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  transferir(c1: number, c2: number, vl: number) {
    var to = new TransferenciaTO()
    to.conta1 = c1 ? c1 : null
    to.conta2 = c2 ? c2 : null
    to.valor = vl ? vl : null
    return this.http.put(this.base_path + 'transferir', JSON.stringify(to), this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred:', error.error.message);
    } else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
      if (error.status == 0) {
        return throwError("Sistema fora de ar, tenta mais tarde")
      } else {
        return throwError(error.error)
      }
    }
  };
}