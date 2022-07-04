import { Injectable } from '@angular/core';
import {Session} from '../session';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private localStorageService;
  private currentSession:Session;


  constructor(private router:Router) {
    this.localStorageService=localStorage;
    this.currentSession=this.CargarDatos();
   }

   CargarDatos():Session{
    let datos=this.localStorageService.getItem("datos");
     return (datos) ? <Session> JSON.parse(datos):new Session("","");
  }

  getCurrentUser(){
    var session: Session = this.CargarDatos();
    return (session && session.token) ? session.token : null;
  };

  CrearSession(session:Session){
    this.currentSession=session;
    this.localStorageService.setItem('datos', JSON.stringify(session));
    console.log("Sesion Creada");
  }

  CerrarSession(){
    this.localStorageService.removeItem('datos');
    this.currentSession = new Session("","");
    this.router.navigate(['/landing']);
  }

  Autenticado(): boolean {
    return (this.getCurrentUser() != null) ? true : false;
  };
}
