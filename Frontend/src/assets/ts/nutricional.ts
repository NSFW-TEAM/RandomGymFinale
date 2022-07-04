function CalcIMC() {

    const formData = new FormData(document.querySelector('form'));
    var selections:string[] =[];
    var cont = 0;
    for (var pair of formData.entries()) {
        selections[cont] = pair[1] as string;
        console.log(pair[1]);
        cont++;
    }
    var peso:number = parseInt(selections[0]);
    var altura:number = parseInt(selections[1])/100;
    var aux:number = peso/(altura*altura);
    var imc = Math.round(aux * 10) / 10
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

function ScrollToDiet(){
    var imc:number = CalcIMC();
    if(imc>=11 && imc<18.5){
        document.getElementById("sup").scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
    }
    if(imc>=18.5 && imc<25){
        document.getElementById("bal").scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
    }
    if(imc>=25){
        document.getElementById("def").scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
    }
}