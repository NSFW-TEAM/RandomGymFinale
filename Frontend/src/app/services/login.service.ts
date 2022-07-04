import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams, JsonpClientBackend} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ajaxTransport, data } from 'jquery';
import {compareSync,hashSync} from "bcryptjs";
//import { threadId } from 'worker_threads';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

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
  
  ValidarLogin(nombre:string,clave:string):Observable<any>{

    const user_byUsername= this.ValidarRegistroUsername(nombre,clave);
    let datos:any;
    var flag:boolean;
    return user_byUsername;
    
  }

  ValidarRegistroUsername(nombre:string,mail:string):Observable<any>{

    const params = new HttpParams();
    params.set("usuario",nombre);
    params.set("mail", mail);
    
    return this.http.get(`${environment.hostname}:${environment.port}/api/register/user/${nombre}`);
  }

  ValidarRegistroMail(nombre:string,mail:string):Observable<any>{

    const params = new HttpParams();
    params.set("usuario",nombre);
    params.set("mail", mail);
    
    return this.http.get(`${environment.hostname}:${environment.port}/api/register/mail/${mail}`);
  }

  InsertUser(user:any):Observable<any>{
    let url="http://127.0.0.1:6001/api/register/Insert/";
    return this.http.post(url,JSON.stringify(user),this.HttpUploadOptions);
  }

  ChangePicture(urlPicture:string,user:string){
    let data={
      "profile_pic":urlPicture
    }
    console.log("Entrada a servicio ChangePicture");
    return this.http.put(`${environment.hostname}:${environment.port}/api/profile/update/picture/${user}`,data);
  }

  DeleteUser(mail:string):Observable<any>{
    return this.http.delete(`${environment.hostname}:${environment.port}/api/Admin/delete/User/${mail}`);
  }

  Token():Observable<any>{
    return this.http.get(`${environment.hostname}":"${environment.port}/token`);
  }

}
