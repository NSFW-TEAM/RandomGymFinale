function changeTitle(title) {
	document.title = title;
}

window.onload = function(){
    changeTitle("Change Title Test");
}

document.getElementById("therockimage").onclick = function(){
    alert("A continuación escucharás las declaraciones de \"La Roca\" acerca de Random Gym");
    //var audio = new Audio('sonidos/bgmusic2.ogg');
    //audio.play();
    setTimeout(() => {  alert("ENGLISH:\nHello there, I'm Dwayne Johnson A.K.A \"The Rock\". If you want to grow amazing muscles like mine then Random Gym is the place to be."+
    " NSFW did an amazing work developing this site, so give it a shot.\n\nSPANISH:\nHola a todos, soy Dwayne Johnson, más conocido como \"La Roca\". Si quieres tener unos músculos cómo"+
    " los míos, entonces Random Gym es tu sitio ideal. El equipo de NSFW ha hecho un excelente trabajo desarrollando este sitio así que deberías probarlo.");},3500);
    for(var i=0;i<10;i++)
    {   
        window.open("amogus.html", "_blank", 'top=500, menubar=no, status=no, width=100, height=120, titlebar=no, left='+i*200+'');
    }
}
