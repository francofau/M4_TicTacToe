//declaración de variables 
let turno = 'X';

let tablero = ['', '', '', '', '', '', '', '', ''];

const opcionVictoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let jugador1 = 'Aziz'
let jugador2 = 'Franco'
let mensaje = $('#mensaje');

let fichasJugador1 = [];
let fichasJugador2 = [];

let indexJugador1 = 0;
let indexJugador2 = 0;


//función del click de cada celda
controlClick = (valor) => {

    //sacamos el número de la celda
    let id = valor.getAttribute('id');
    id = id.split('-')[1];



    //si hay 3 fichas del jugador borra una de ellas (pasamos a tener 2)
    if (fichas(turno) == 3) {
        if (turno == $('#celda-' + id).html()) {
            borrarPosicion(id);
        }

        //si se tiene menos de 3 fichas
    } else {
        //si la celda esta vacía
        if (valor.textContent == '') {
            rellenarArrayTablero(turno, id) //marcamos la posición en el array del tablero
            pintarCelda(id, turno); //pintamos la ficha del jugador en la celda seleccionada
            turno = controlTurno(turno); //cambiamos el turno
        }

        //si la casilla esta ocupada, mandamos mensaje de error
        else mensaje.html('Error, casilla no válida');
    }

}

//función para pintar la ficha en la celda
pintarCelda = (objetivo, posicion) => {
    $('#celda-' + objetivo).html(posicion);
}

//control de turno
controlTurno = (val) => {
    if (val == 'X') {
        mensaje.html('Turno de ' + jugador2)
        val = 'O';
        return val;
    } else if (val == 'O') {
        val = 'X';
        mensaje.html('Turno de ' + jugador1)
        return val;
    }
}

//input de los nombres de los jugadores

//función para enviar el contenido al array del tablero
rellenarArrayTablero = (jugador, posicion) => {
    tablero[posicion] = jugador;
    comprobar(turno);
}

//comprobar opcionVictoria
comprobar = (turno) => {
    indexJugador1 = 0;
    indexJugador2 = 0;
    let coincidencias = 0;
    //array que recorre el tablero y guarda las pocisicones de cada jugador
    for (var i = 0; i < tablero.length; ++i) {
        if (tablero[i] == turno) {

            if (tablero[i] == 'X') {
                fichasJugador1[indexJugador1] = i;
                indexJugador1++
                console.log(' fichas 1: ' + fichasJugador1);
            }

            if (tablero[i] == 'O') {
                fichasJugador2[indexJugador2] = i;
                indexJugador2++
                console.log('fichas 2: ' + fichasJugador2);
            }
        }
    }

    //array que comprueba las opciones de victoria de cada jugador

}


//comprobar número fichas
fichas = (turno) => {
    let rep = 0;

    for (var i = 0; i < tablero.length; ++i) {
        if (tablero[i] == turno) {
            rep++;
        }

    }

    return rep;
}

//borrar posición
borrarPosicion = (posicion) => {
    tablero[posicion] = '';
    $('#celda-' + posicion).html('');
}






//prueba
for (let index = 0; index < opcionVictoria.length; index++) {

    for (let index2 = 0; index2 < 3; index2++) {
        for (let index3 = 0; index3 < fichasJugador1.length; index3++) {
            if (fichasJugador1 == opcionVictoria[index]) {
                console.log('Victoria');
            }

        }

    }
}