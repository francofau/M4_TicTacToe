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

//función del click de cada celda
function controlClick(valor) {



    let id = valor.getAttribute('id');
    id = id.split('-')[1];
    console.log(turno);
    turno = pintarCelda(id, turno);

}

//función para pintar
function pintarCelda(objetivo, posicion) {
    $('#celda-' + objetivo).html(posicion);

    if (turno == 'X') {
        mensaje.html('Turno de ' + jugador1)
        turno = 'O';
    } else if (turno == 'O') {
        turno = 'X';
        mensaje.html('Turno de ' + jugador2)
    }

    return turno;
}

//input de los nombres de los jugadores

//función enviar el contenido al array del tablero

//comprobar opcionVictoria

//comprobar número fichas

//funcción cuando hay 3 fichas