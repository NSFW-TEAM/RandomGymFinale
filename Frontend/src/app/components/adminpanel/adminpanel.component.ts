import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from "jquery";
import { isEmptyObject } from 'jquery';
import {EjercicioService} from '../../services/ejercicio.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.scss']
})
export class AdminpanelComponent implements OnInit {
  public formAddExe!: FormGroup;
  public formDelExe!: FormGroup;
  public formDelUser!: FormGroup;
  constructor(private formBuilder: FormBuilder,private servicio:EjercicioService,private servicioUsers:LoginService) {
  }

  ngOnInit(): void {
    this.formAddExe = this.formBuilder.group({
      addexename: ['', [Validators.required]],
      addexedesc: ['', Validators.required],
      addexefile: ['', Validators.required],
      addexedur: ['', Validators.required],
      addexeworkarea: ['', Validators.required],
      addexediff: ['', Validators.required],
      addexearea: ['', Validators.required]
    });
    this.formDelExe = this.formBuilder.group({
      delexeid: ['0',Validators.required],
    });
    this.formDelUser = this.formBuilder.group({
      delusermail: ['',[Validators.required,Validators.email]]
    });
  }

  AdminTool(func:string){
    $(".panel").attr("hidden","hidden");
    var tag:string = "#"+func;
    $(tag).removeAttr("hidden");
  }

  getsize(){
    let id_:number;
    let A =this.servicio.EncontrarEjercicio(-1).subscribe(datos=>{
      id_ = datos.length;
      return id_;
    });
  }
  AddExe(){  
    this.servicio.LenghtEx().subscribe(aux=>{
      console.log(aux);
      let id= JSON.stringify(aux);
      let id2=JSON.parse(id);
      var data = {
        "name" : this.formAddExe.controls['addexename'].value,
        "desc" : this.formAddExe.controls['addexedesc'].value,
        "demopath" : this.formAddExe.controls['addexefile'].value,
        "diff" : this.formAddExe.controls['addexediff'].value,
        "area" : this.formAddExe.controls['addexearea'].value,
        "workarea" : this.formAddExe.controls['addexeworkarea'].value,
        "duration" :this.formAddExe.controls['addexedur'].value,
        "id":id2["count"]
      }
      this.servicio.InsertExercise(data).subscribe((respuesta) =>{
        console.log(respuesta);
      });
      
      $("#resultadoadd").html("El ejercicio \""+data.name+"\" se ha agregado exitosamente");
      this.ngOnInit();
    });  
    
  }

  DelExe(){
    var delexeid = this.formDelExe.controls['delexeid'].value;
    
    this.servicio.EncontrarEjercicio(Number(delexeid)).subscribe(aux=>{
      console.log(aux);
      if(aux.length==0){
        
        $("#resultadodel").html("No existe un ejercicio con ese ID, comprueba e intenta nuevamente");

      }
      else{
        this.servicio.DeleteEx(delexeid).subscribe(msg=>{
          console.log(msg);
          $("#resultadodel").html("Se ha eliminado el ejercicio con ID\""+delexeid+"\" exitosamente");
          this.ngOnInit();
        });
      }
    })
    
  }

  DelUser(){
    var delusermail = this.formDelUser.controls['delusermail'].value;
    //if(this.servicioUsers.ValidarRegistroMail("null",delusermail))
    console.log(delusermail);
    this.servicioUsers.ValidarRegistroMail("NaN",delusermail).subscribe(obj=>{
      if(obj.length==0){
        $("#deluserresult").html("Email no registrado");
          this.ngOnInit();
      }
      else{
        this.servicioUsers.DeleteUser(delusermail).subscribe(respuesta =>{
          console.log(respuesta);
          $("#deluserresult").html("Los datos del usuario identificado con el mail \""+delusermail+"\" han sido eliminados exitosamente");
          this.ngOnInit();
        })
      }
    });
  }
    
  
}
