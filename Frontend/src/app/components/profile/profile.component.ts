import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {LoginService} from '../../services/login.service';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
//import { json } from 'stream/consumers';
import {Router} from '@angular/router';
import { JsonpInterceptor } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  formulario_foto:FormGroup;
  constructor(private storage: StorageService,private servicio:LoginService , private Form:FormBuilder,private route:Router) {
    this.formulario_foto=this.Form.group({ControlUrl:['',[Validators.required]]});

  }
  Enviar_foto(){
    console.log(this.formulario_foto.get("ControlUrl")?.value);
    let url = this.formulario_foto.get("ControlUrl")?.value;
    let info = this.storage.CargarDatos();
    
    const jsonStr= JSON.stringify(info["data"]);
    var jsonObj = JSON.parse(jsonStr);
    console.log(jsonObj.usuario);
    
    this.servicio.ChangePicture(url,jsonObj.usuario).subscribe(result=>{
      console.log(result);
      this.storage.CerrarSession();
      this.route.navigate(['/login']);
    });
  }

  CerrarSesion(){
    this.storage.CerrarSession();
    this.route.navigate(['/login']);
  }

  ShowPhotoChange(){
    $("#cambiarfoto").removeAttr("hidden");
  }

  ngOnInit(): void {
    let info = this.storage.CargarDatos();
    
    const jsonStr= JSON.stringify(info["data"]);
    var jsonObj = JSON.parse(jsonStr);
    console.log(jsonObj);
    try{
      document.getElementById("nombre")!.innerHTML = jsonObj.usuario;
      document.getElementById("email")!.innerHTML = jsonObj.mail;
      document.getElementById("peso")!.innerHTML = jsonObj.peso + " Kg";
      document.getElementById("objetivo")!.innerHTML = "Objetivo: "+jsonObj.objetivo;
      if(jsonObj.profile_pic != "NaN"){
        $("#profile_pic")!.attr("src", jsonObj.profile_pic);
      }
    }catch(e){
      console.log("Error al cargar el perfil");
    }
  }

  Tool(func:string){
    $(".panel").attr("hidden","hidden");
    var tag:string = "#"+func;
    $(tag).removeAttr("hidden");
  }

}


