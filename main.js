var piezas = document.getElementsByClassName('movil');

var tamWidh = [134, 199, 134, 166, 167, 134, 167, 167, 134];
var tamHeight = [134, 134, 166, 168, 167, 134, 166, 167, 166];

for (var i = 0; i < piezas.length; i++) {
	piezas[i].setAttribute("width", tamWidh[i]);
	piezas[i].setAttribute("height", tamHeight[i]);
	piezas[i].setAttribute("x", Math.floor((Math.random() * 10) + 1));
	piezas[i].setAttribute("y", Math.floor((Math.random() * 409) + 1));
	piezas[i].setAttribute("onmousedown", "seleccionarElemento(evt)");
}

var elementSelect = 0;
var currentX = 0;
var currentY = 0;
var currentPosX = 0;
var currentPosY = 0;

function seleccionarElemento(evt) {
	elementSelect = reordenar(evt);
	currentX = evt.clientX;
	currentY = evt.clientY;
	currentPosx = parseFloat(elementSelect.getAttribute("x"));
	currentPosy = parseFloat(elementSelect.getAttribute("y"));
	elementSelect.setAttribute("onmousemove", "moverElemento(evt)");
}

function moverElemento(evt) {
	var dx = evt.clientX - currentX;
	var dy = evt.clientY - currentY;
	currentPosx = currentPosx + dx;
	currentPosy = currentPosy + dy;
	elementSelect.setAttribute("x", currentPosx);
	elementSelect.setAttribute("y", currentPosy);
	currentX = evt.clientX;
	currentY = evt.clientY;
	elementSelect.setAttribute("onmouseout", "deseleccionarElemento(evt)");
	elementSelect.setAttribute("onmouseup", "deseleccionarElemento(evt)");
	iman();
}

function deseleccionarElemento(evt) {
	testing();
	if (elementSelect != 0) {
		elementSelect.removeAttribute("onmousemove");
		elementSelect.removeAttribute("onmouseout");
		elementSelect.removeAttribute("onmouseup");
		elementSelect = 0;
	}
}

var all = document.getElementById('all');

function reordenar(evt) {
	var piece = evt.target.parentNode;
	var clone = piece.cloneNode(true);
	var id = piece.getAttribute("id");
	all.removeChild(document.getElementById(id));
	all.appendChild(clone);
	return all.lastChild.firstChild;
}

var origX = [200, 301, 466, 200, 333, 466, 200, 333, 466];
var origY = [100, 100, 101, 200, 200, 233, 334, 334, 334];

function iman() {
	for (var i = 0; i < piezas.length; i++) {
		if (Math.abs(currentPosx - origX[i]) < 15 && Math.abs(currentPosy - origY[i]) < 15) {
			elementSelect.setAttribute("x", origX[i]);
			elementSelect.setAttribute("y", origY[i]);
		}
	}
}

var win = document.getElementById("win");

function testing() {
	var bien_ubicada = 0;
	var pieces = document.getElementsByClassName('piece');
	for (var i = 0; i < piezas.length; i++) {
		var posx = parseFloat(pieces[i].firstChild.getAttribute("x"));
		var posy = parseFloat(pieces[i].firstChild.getAttribute("y"));
		ide = pieces[i].getAttribute("id");
		if (origX[ide] == posx && origY[ide] == posy) {
			bien_ubicada = bien_ubicada + 1;
		}
	}
	if (bien_ubicada == 9) {
		win.play();
	}
}