//Variables necesarias a ejecutar
let divAtaque = document.querySelector(".contenAtaque");
let divDefensa = document.querySelector(".contenDefensa");
let divMensaje = document.querySelector(".parrafoM");
let divM = document.querySelector(".contenMensaje");
let barraJug = document.querySelector(".vidaJugador");
let barraEne = document.querySelector(".vidaEnemigo");
let graColorJ = document.querySelector(".barraVidaJ");
let graColorE = document.querySelector(".barraVidaE");
let divInicio = document.querySelector(".contenInicio");
let gifJ1 = document.querySelector(".gifJ1");
let gifJ2 = document.querySelector(".gifJ2");
let gifV1 = document.querySelector(".gifV1");
let gifV2 = document.querySelector(".gifV2");
let iconDA = document.querySelector(".iconDA");
let gifJAtaque = document.querySelector(".gifJugadorA");
let gifVAtaque = document.querySelector(".gifEnemigoA");
let gifJMuerte = document.querySelector(".gifJugadorM");
let gifVMuerte = document.querySelector(".gifEnemigoM");
let iconAtaDef = document.querySelector(".ataDef");



/*Audio Batalla*/
let audioB = document.querySelector(".audioBatalla");
audioB.play();


//Cambio de animacion de los personaje de modo intro a batalla
function timeGif(){
    setTimeout(function() {
        gifJ1.style.display = "none";
        gifJ2.style.display = "block";
     }, 2700);
    
    setTimeout(function() {
        gifV1.style.display = "none";
        gifV2.style.display = "block";
    }, 2000);
}

//Segun el tiempo oculta el icono de entrada y muestra la intro de los personajes
setTimeout(function() {
    iconDA.style.display = "none";
    gifJ1.style.display = "block";
    gifV1.style.display = "block";
    timeGif();
}, 3000);

//Matriz de los puntos
const matriz = [
    /*defensa*/
    /*agua*//*fuego*//*rayo*/
/*agua*/ [10, 20, 0],
/*fuego*/[0, 10, 20],
/*rayo*/ [20, 0, 10],
/*ataque*/
];


//Escondo los div para validar primero
    divAtaque.style.display = "none";
    divDefensa.style.display = "none";
    divInicio.style.display = "none";
    divM.style.display = "none";

//Aleatoridad para saber si empieza atacando o defendiendo
    let ini = Math.floor(Math.random() * 2);

    if(ini === 0){
        divAtaque.style.display = "block";
        iconDA.style.backgroundImage = "url('../img/icon/luchando.png')";
        tiempoM(3000,1);
    }else{
        divDefensa.style.display = "block";
        iconDA.style.backgroundImage = "url('../img/icon/blindaje.png')";
        tiempoM(3000,0);
    }

    
//FUNCIONES

//FUNCIONES TEMPORIZADORES

//Funcion de tiempo de muestra del mensaje
var resetTime; //Variable para reiniciar el temporizador
function tiempoM(t) {
    clearTimeout(resetTime); //se reinicia el temporizador

    resetTime = setTimeout(function() {
        divM.style.display = "none";
    }, t);
}

//FIN FUNCIONES TEMPORIZADORES

//La aleatoridad del oponente
    function aleator(){
        return Math.floor(Math.random()*3);
    };

//convierte el valor de numeros a texto
    function texto(a){
        switch (a){
            case 0:
                return "AGUA";
            break;
            case 1:
                return "FUEGO";
            break;
            case 2:
                return "RAYO";
            break;
        }
    }

//Funcion para una gradiente de la barra de vida
    function gradiente(a,b) {
        let color = ['#00FF00', '#66FF33', '#FFFF00', '#FFA500', '#FF0000'];
        let grad = Math.floor((100-a)/20);
        if(b) {
            graColorE.style.backgroundColor = color[grad];
        }else{
            graColorJ.style.backgroundColor = color[grad];
        }
        console.log(a,b,grad);
    }

//calcula la barra de energía y los mensajes y cambia si es ataque o defensa

    //variables
    let player = 100;
    let enemy = 100;
    //iconAtaDef.style.backgroundImage = "url('../img/icon/luchando.png')";
    //iconAtaDef.style.backgroundImage = "url('../img/icon/blindaje.png')";
    function barraMensaje(a,b,c,d){
        if(d == 0){
            divMensaje.textContent = "Has atacado con ataque de "+a+", el enemigo se ha defendido con escudo de "+b+", le bajaste "+c+" de vida";
            enemy -= c;
            if(enemy <= 0){
                enemy = 0;
                divMensaje.textContent = "¡HAS GANADO! ¡FELICIDADES!"
                divAtaque.style.display = "none";
                divInicio.style.display = "block";
                gifV2.style.display = "none";
                gifVMuerte.style.display ="block";
            }else{
                divAtaque.style.display = "none";
                divDefensa.style.display = "block";
                iconAtaDef.style.backgroundImage = "url('../img/icon/blindaje.png')";
            }
            barraEne.style.height = 100-enemy+"%";
            gradiente(enemy,1);
        }else{
            divMensaje.textContent = "Has defendido con escudo de "+a+", el enemigo ha atacado con "+b+", te bajó "+c+" de vida";
            player -= c;
            if(player <= 0){
                player = 0;
                divMensaje.textContent = "¡HAS PERDIDO! ¡OTRO DIA SERÁ!"
                divDefensa.style.display = "none";
                divInicio.style.display = "block";
                gifJ2.style.display = "none";
                gifJMuerte.style.display ="block";
            }else{
                divDefensa.style.display = "none";
                divAtaque.style.display = "block";
                iconAtaDef.style.backgroundImage = "url('../img/icon/luchando.png')";
            }
            barraJug.style.height = 100-player+"%";
            gradiente(player,0);
        }
        divM.style.display = "flex";
        tiempoM(5000);
    }

//Aqui vienen las funciones de los ataques y defensa del adversario
    function advAtaque(defensa){
        let aleatorio = aleator();
        let defTextoJ = texto(defensa);
        let defTextoO = texto(aleatorio);
        let puntaje = matriz[aleatorio][defensa];
        barraMensaje(defTextoJ, defTextoO, puntaje, 1)
    }
    function advDefensa(ataque){
        let aleatorio = aleator();
        let ataTextoJ = texto(ataque);
        let ataTextoO = texto(aleatorio);
        let puntaje = matriz[ataque][aleatorio];
        barraMensaje(ataTextoJ, ataTextoO, puntaje, 0)
    }

    //Tiempo del ataque
    var reinicio;
    function timeJuegoA(t,a) {
        clearTimeout(reinicio); //se reinicia el temporizador
    
        reinicio = setTimeout(function() {
            advDefensa(a);
            gifJ2.style.display = "block";
            gifJAtaque.style.display = "none";
        }, t);
    }
    function timeJuegoD(t,a) {
        clearTimeout(reinicio);

        reinicio = setTimeout(function() {
            advAtaque(a);
            gifV2.style.display = "block";
            gifVAtaque.style.display = "none";
        }, t);
    }

//Fucniones de ataque y defensa del jugador
    function ataAgua(){
        timeJuegoA(800,0);
        gifJ2.style.display = "none";
        gifJAtaque.style.display = "block";
    }
    function ataFuego(){
        timeJuegoA(800,1);
        gifJ2.style.display = "none";
        gifJAtaque.style.display = "block";
    }
    function ataRayo(){
        timeJuegoA(800,2);
        gifJ2.style.display = "none";
        gifJAtaque.style.display = "block";
    }
    function defAgua(){
        timeJuegoD(1600,0);
        gifV2.style.display = "none";
        gifVAtaque.style.display = "block"; 
    }
    function defFuego(){
        timeJuegoD(1600,1);
        gifV2.style.display = "none";
        gifVAtaque.style.display = "block";
    }
    function defRayo(){
        timeJuegoD(1600,2);
        gifV2.style.display = "none";
        gifVAtaque.style.display = "block";
    }

