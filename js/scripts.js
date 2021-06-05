//declaración de variables 

//arrays con las posiciones del tablero y opciones de victoria
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

//variables con el turno, nombre de los jugadores y mensaje
let turno = 'X';
let jugador1 = 'Jugador 1'
let jugador2 = 'Jugador 2'
let mensaje = $('#mensaje');

//arrays con las posiciones de las fichas de cada jugador
let fichasJugador1 = [];
let fichasJugador2 = [];

//auxiliares para marcarnos la posición del array de fichasJugador
let indexJugador1 = 0;
let indexJugador2 = 0;

//variables para IA
let ia = false;
let existeOpcion = false;
let idIA;

//función del click de cada celda
let controlClick = (valor) => {

    //sacamos el número de la celda
    let id = valor.getAttribute('id');
    id = id.split('-')[1];


    //si hay 3 fichas del jugador borra una de ellas (pasamos a tener 2)
    if (fichas() == 3) {

        mensaje.html('Ya tienes el máximo de fichas permitido, debes retirar una')
        if (turno == $('#celda-' + id).html()) {
            borrarPosicion(id);
        }

        //si se tiene menos de 3 fichas
    } else {

        //si la celda esta vacía
        if (valor.textContent == '') {
            pintarCelda(id, turno); //pintamos la ficha del jugador en la celda seleccionada
            rellenarArrayTablero(turno, id) //marcamos la posición en el array del tablero
            turno = controlTurno(turno); //cambiamos el turno

        }

        //si la casilla esta ocupada, mandamos mensaje de error
        else mensaje.html('Error, casilla no válida');
    }

    //en caso de IA
    if (turno == 'O' && ia) {
        if (existeOpcion == false) {
            idIA = seleccionIA();

        }

        pintarCelda(idIA, turno);
        rellenarArrayTablero(turno, idIA)
        turno = controlTurno(turno);
        existeOpcion = false;
    }

}

//función para pintar la ficha en la celda
let pintarCelda = (objetivo, posicion) => {
    $('#celda-' + objetivo).html(posicion);
}

//control de turno
let controlTurno = (val) => {
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
let rellenarArrayTablero = (jugador, posicion) => {
    tablero[posicion] = jugador;
    comprobar();
}

//comprobar opcionVictoria
let comprobar = () => {
    indexJugador1 = 0;
    indexJugador2 = 0;
    let contador = 0;

    //array que recorre el tablero y guarda las pocisicones de cada jugador
    for (var i = 0; i < tablero.length; ++i) {
        if (tablero[i] == turno) {

            if (tablero[i] == 'X') {
                fichasJugador1[indexJugador1] = i;
                indexJugador1++
            }

            if (tablero[i] == 'O') {
                fichasJugador2[indexJugador2] = i;
                indexJugador2++
            }
        }
    }

    //array que comprueba las opciones de victoria del jugador 1
    for (let index = 0; index < opcionVictoria.length; index++) {

        for (let index2 = 0; index2 < 3; index2++) {
            for (let index3 = 0; index3 < fichasJugador1.length; index3++) {

                //comparamos las coincidencias de las posiciones del jugador 1 con el array bidimensional de opciones de victoria
                if (fichasJugador1[index3] == opcionVictoria[index][index2]) {
                    contador++;

                    //IA selecciona mejor defensa
                    if (contador == 2) {
                        mejorOpcionIA(index);
                    }
                }
            }
        }

        //si el contador de aciertos del jugador 1 llega a 3
        if (contador == 3) alert('GANADOR JUGADOR 1');
        contador = 0;
    }

    //array que comprueba las opciones de victoria del jugador 2
    for (let index = 0; index < opcionVictoria.length; index++) {

        for (let index2 = 0; index2 < 3; index2++) {
            for (let index3 = 0; index3 < fichasJugador2.length; index3++) {

                //comparamos las coincidencias de las posiciones del jugador 2 con el array bidimensional de opciones de victoria
                if (fichasJugador2[index3] == opcionVictoria[index][index2]) {
                    contador++;

                    //IA selecciona mejor ataque
                    if (contador == 2) {
                        mejorOpcionIA(index);
                    }
                }
            }
        }

        //si el contador de aciertos del jugador 2 llega a 3
        if (contador == 3) alert('GANADOR JUGADOR 2');
        contador = 0;
    }
}

//comprobar número fichas
let fichas = () => {
    let rep = 0;

    for (var i = 0; i < tablero.length; ++i) {
        if (tablero[i] == turno) {
            rep++;
        }
    }

    return rep;
}

//borrar posición
let borrarPosicion = (posicion) => {
    tablero[posicion] = '';
    $('#celda-' + posicion).html('');
}

//reiniciar partida
let reiniciar = () => {
    fichasJugador1 = [];
    fichasJugador2 = [];
    tablero = ['', '', '', '', '', '', '', '', ''];
    $('.celda').html('');
}

//evento de escucha del botón para lanzar la función de reiniciar
$('#reset').click(function() {
    reiniciar()
});


//--------IA--------//

//activa o desactiva el booleano de la IA y el texto superior
$('#ia').click(function() {
    if (ia == false) {
        ia = true;
        $('#parrafo-sup').html('Jugador VS IA')
    } else {
        ia = false;
        $('#parrafo-sup').html('Jugador VS Jugador ')
    }
});

//IA selecciona una tirada aleatoria
let seleccionIA = () => {

    if (tablero[4] == '') {
        return idIA = 4;
    } else {
        for (let index = 0; index < tablero.length; index++) {
            if (tablero[index] == '') {
                console.log('Tirada aleatoria: ' + index);
                return index;
            }

        }
    }
}

//IA calcula la mejor opción de victoria de ambos jugadores
let mejorOpcionIA = (index) => {

    for (let index2 = 0; index2 < 3; index2++) {
        if (tablero[opcionVictoria[index][index2]] == '') {
            console.log('Mejor tirada: ' + opcionVictoria[index][index2]);
            existeOpcion = true;
            idIA = opcionVictoria[index][index2];
        }
    }
}

//borrar posición IA