import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ejercicio_interface } from '../Ejercicio_interface';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {

  constructor(private http:HttpClient) {
  }
  HttpUploadOptions = {
    headers: new HttpHeaders(
      {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Content-Type': 'application/json',
    }
    ),
  };

  RandomExercise(diff:string,area:string):Observable<any>{
    const params = new HttpParams();
    params.set("diff",diff);
    params.set("area",area);
    return this.http.get(`${environment.hostname}:${environment.port}/api/RandomExercise/${diff}/${area}`);
  }

  EncontrarEjercicio(id_:number):Observable<any>{
    const params = new HttpParams();
    params.set("id",id_);
    return this.http.get(`${environment.hostname}:${environment.port}/api/RandomExercise/${id_}`);
  }

  DeleteEx(id:number):Observable<any>{
    const params = new HttpParams();
    params.set("id",id);
    return this.http.delete(`${environment.hostname}:${environment.port}/api/Exercise/delete/${id}`);
  }

  LenghtEx(){
    const params = new HttpParams();
    return this.http.get(`${environment.hostname}:${environment.port}/api/RandomExerciseIDs/count/`);
  }

  InsertExercise(ejercicio:any):Observable<any>{

    let url="http://127.0.0.1:6001/api/RandomExercise/Insert/";
    return this.http.post(url,JSON.stringify(ejercicio),this.HttpUploadOptions);
  }

  Token():Observable<any>{
    return this.http.get(`${environment.hostname}":"${environment.port}/token`);
  }
}
