import { CompilerFactory, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import * as $ from "jquery";
import { ConfirmedValidator } from '../../confirmed.validator';
import {Session} from '../../session';
import {LoginService} from '../../services/login.service';//Se reutiliza LoginService para validar registro
import {StorageService} from '../../services/storage.service';
import {hashSync} from "bcryptjs";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  public formRegister!: FormGroup;
  captcha: string;

  constructor(private formBuilder: FormBuilder, private route:Router,private storage: StorageService, private servicio:LoginService) { 
    this.captcha = '';
  }

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
      username: ['',[Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      password1: ['',[Validators.required]],
      password2: ['',[Validators.required]],
      sex: ['',[Validators.required]],
      obj: ['',[Validators.required]],
      area: ['',[Validators.required]],
      equip: ['',[Validators.required]],
      diff: ['',Validators.required],
      peso: ['',Validators.required],
      altura: ['',Validators.required]
    }, {
      validator: ConfirmedValidator('password1','password2')
  })
  }
  procesar(): any{
    var usuario = this.formRegister.controls['username'].value;
    var correo = this.formRegister.controls['email'].value.toLowerCase();
    var contra1 = this.formRegister.controls['password1'].value;
    var contra2 = this.formRegister.controls['password2'].value;
    var sexo = this.formRegister.controls['sex'].value;
    var objetivo = this.formRegister.controls['obj'].value;
    var area = this.formRegister.controls['area'].value;
    var equipo = this.formRegister.controls['equip'].value;
    var dificultad = this.formRegister.controls['diff'].value;
    var peso = this.formRegister.controls['peso'].value;
    var altura = this.formRegister.controls['altura'].value;
    var alturaenmt = parseFloat(altura)/100;
    //LLamada a la API para comprobar usuario inexistente:
    this.servicio.ValidarRegistroUsername(usuario,correo).subscribe(datos=>{//Se consigue usuario mediante Username
      if(datos.length==0){//Si se obtiene vacio se procede a verificar correo
        console.log(datos);
        this.servicio.ValidarRegistroMail(usuario,correo).subscribe(datosCorreo=>{
          if(datosCorreo.length==0){
            $("#status").html("Registro exitoso...");
            $("#status").removeAttr("hidden");
            let contra_hash= hashSync(contra1,10);
            if(contra_hash.includes("/")){
              while(contra_hash.includes("/")){
                contra_hash= hashSync(contra1,1);
              }
            }
            
            var data={
              "clave":contra_hash,
              "mail":correo,
              "sex":sexo,
              "objetivo":objetivo,
              "area":area,
              "tipo":equipo,
              "diff":dificultad,
              "peso":peso,
              "altura":altura,
              "usuario":usuario,
              "profile_pic":"NaN"
            }
            this.servicio.InsertUser(data).subscribe((respuesta) =>{
              console.log(respuesta);
            });

            datos={token:usuario,data:data};
          
            this.storage.CrearSession(datos);
          
            window.location.href="/profile";

          }
          else{
            $("#status").html("Correo actualmente en uso");
            $("#status").removeAttr("hidden");
          }
        });
       }else{
        console.log(datos);  
          $("#status").html("Nombre de usuario actualmente en uso");
          $("#status").removeAttr("hidden");
       }
    });
  }

  resolved(captchaResponse: string){
    this.captcha = captchaResponse;
    console.log('captcha resuleto con respuesta: '+this.captcha);
  }

}
