import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from "jquery";

@Component({
  selector: 'app-nutinfo',
  templateUrl: './nutinfo.component.html',
  styleUrls: ['./nutinfo.component.scss']
})
export class NutinfoComponent implements OnInit {

  title = 'formNutInfo';
  public formNutInfo!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formNutInfo = this.formBuilder.group({
      peso: ['', [Validators.required]],
      altura: ['', Validators.required]
    });
  }

  CalcImc(): any{
    var peso:number = parseInt(this.formNutInfo.controls['peso'].value);
    var altura:number = parseInt(this.formNutInfo.controls['altura'].value)/100;
    var aux:number = peso/(altura*altura);
    var imc = Math.round(aux * 10) / 10;
    var premsg:string = "<p>Tu IMC es de "+imc+", por lo tanto, ";
    if(imc<11){
      $(".textresultado").html("Verifica los datos ingresados...");
      $("#quedebobutton").prop("hidden",true);
    }
    if(imc>=11 && imc<18.5){
        $(".textresultado").html(premsg+"te encuentras bajo tu peso ideal...</p>");
        $("#quedebobutton").prop("hidden",false);
    }
    if(imc>=18.5 && imc<25){
        $(".textresultado").html(premsg+"te encuentras en tu peso ideal. ¡Hurra!</p>");
        $("#quedebobutton").prop("hidden",false);
    }
    if(imc>=25 && imc<30){
        $(".textresultado").html(premsg+"te encuentras sobre tu peso ideal...</p>");
        $("#quedebobutton").prop("hidden",false);
    }
    if(imc>=30 && imc<35){
        $(".textresultado").html(premsg+"te encuentras en Obesidad I...</p>");
        $("#quedebobutton").prop("hidden",false);
    }
    if(imc>=35 && imc<40){
        $(".textresultado").html(premsg+"te encuentras en Obesidad II...</p>");
        $("#quedebobutton").prop("hidden",false);
    }
    if(imc>=40 && imc<50){
        $(".textresultado").html(premsg+"te encuentras en Obesidad III...</p>");
        $("#quedebobutton").prop("hidden",false);
    }
    if(imc>=50 && imc <75){
        $(".textresultado").html(premsg+"te encuentras en Obesidad IV...</p>");
        $("#quedebobutton").prop("hidden",false);
    }
    if(imc >= 75){
        $(".textresultado").html("Verifica los datos ingresados...");
        $("#quedebobutton").prop("hidden",true);
    }
    return imc;
    }

  ScrollToDiet(): any{
    var imc:number = this.CalcImc();
    var selected:String = "none";
    if(imc>=11 && imc<18.5){
        document.getElementById("sup")!.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
        selected = "sup";
    }
    if(imc>=18.5 && imc<25){
        document.getElementById("bal")!.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
        selected = "bal";
    }
    if(imc>=25){
        document.getElementById("def")!.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
        selected = "def";
    }
    var boxes = document.querySelectorAll('.diets');
    boxes.forEach(box => {
      box.setAttribute("style","border-color: transparent;");
      if(box.id==selected){
        box.setAttribute("style","border: 5px solid white");
      }
    });
  }
}