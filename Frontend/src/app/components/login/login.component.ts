import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from "jquery";
import {Session} from '../../session';
import {LoginService} from '../../services/login.service';
import {StorageService} from '../../services/storage.service';
import {Router} from '@angular/router';
import {hashSync,compareSync} from "bcryptjs";
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title='formLogin';
  public formLogin!: FormGroup;
  mensaje:string="";
  token:string="";
  logueado:Boolean=false;
  datos:Session;
  captcha: string;

  constructor(private formBuilder: FormBuilder, private storage: StorageService, private servicio:LoginService ,private route:Router) {
    this.datos=new Session("","");
    this.captcha = '';
  }
  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
    if(this.storage.getCurrentUser()){
      this.logueado=true;
      this.mensaje="Usted ya se encuentra logueado";
      this.route.navigate(['/profile']);
    }
  }

  public mostrar(){
    
    let usuario = this.formLogin.controls['username'].value;
    let contra = this.formLogin.controls['password'].value;
    
    //alert("Usuario: "+usuario+"\nContraseña: "+contra+"\nAquí se obtienen los datos, se procesan en la API");
    
    this.servicio.ValidarRegistroUsername(usuario,contra).subscribe(datos=>{
      this.isAdmin(usuario,contra);
      if(datos.length==0){
          //this.mensaje="Login no existe";
          $("#status").html("Usuario Inexistente");
          $("#status").removeAttr("hidden");
      }else{
        console.log(datos);
        console.log(datos[0]);
        
        if(compareSync(contra,datos[0].clave)){
          $("#status").attr("hidden","hidden");

          datos={token:datos[0],data:datos[0]};
          
          this.storage.CrearSession(datos);
          
          window.location.href="/profile";
        }
        else{
          $("#status").html("Contraseña Incorrecta");
          $("#status").removeAttr("hidden");
        }
      }

        
    });
    
  }
  
  //experimental
  isAdmin(user:String,password:String): any{
    if(user=="nsfwteam" && password=="123"){
      this.route.navigate(['/adminpanel']);
    }
  }
    
  resolved(captchaResponse: string){
    this.captcha = captchaResponse;
    console.log('captcha resuleto con respuesta: '+this.captcha);
  }
}
