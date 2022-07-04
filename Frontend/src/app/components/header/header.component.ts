import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../services/storage.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private servicioStorage:StorageService) { }

  ngOnInit(): void {
    if(this.servicioStorage.Autenticado()){
      
      try{
        document.getElementById("ButtonChange")!.innerHTML = "Iniciar Sesion";
      }catch(e){
        console.log("Error al cargar el perfil");
      }
    }
    else{
      console.log(this.servicioStorage.Autenticado());
      document.getElementById("ButtonChange")!.innerHTML = "Iniciar Sesion";
    }
  }

}
