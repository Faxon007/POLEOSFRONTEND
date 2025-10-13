import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class Execution2Service {
  constructor(private http: HttpClient){}
  generateReport(pais: string){
    console.log('entra al generate,.,.,.,.')
     return this.http.post('api/reports/generate', { pais }); 
    }
  
}