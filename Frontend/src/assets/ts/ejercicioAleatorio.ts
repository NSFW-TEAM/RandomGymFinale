function GenerateExercise() {
    alert("caca");
    const formData = new FormData(document.querySelector('form'));
    var selections:string[] =[];
    var cont = 0;
    for (var pair of formData.entries()) {
        selections[cont] = pair[1] as string;
        console.log(pair[1]);
        cont++;
    }
    var ejercicios = [];
    $.getJSON("./data/ejercicios.json", function(data) {
        $.each(data.ejercicio,function(i, exe){
            if(selections[0] == exe.diff && selections[1] == exe.area){
                console.log(selections[0]+" + "+selections[1]+" = "+exe.name);
                $(".contenedor").removeAttr("hidden");
                $(".imgexe").attr("src",exe.demopath);
                $("#nameexe").html(exe.name);
                $(".explicacion").html(exe.desc);
                $(".duracion").html(exe.duration);
                $(".workarea").html(exe.workarea);
                document.getElementById("nameexe").scrollIntoView({behavior: 'smooth'});
            }
        });
    });
};
//pruebita chica