/**
 * Author: Conejo
 * Date: March 30th, 2017
 * Description: Uso de el objeto Date and the member function localeCompare
 */

function ponerFecha(str) {
	
	// Declaración explicita de una variable u objeto
	
	var fechaHoy = document.getElementById("hoy");
	var fechaCumple = document.getElementById("cumple");
	var fechaGrad = document.getElementById("grad");
	var fechaIndep = document.getElementById("indep");
	
	if(!str.localeCompare("hoy")) {
		fechaHoy.value = new Date() } // Current Date
	
	else if (!str.localeCompare("cumple")) {
		fechaCumple.value = new Date("June 21, 1977 11:00:00") // String 
	}
	
	else if (!str.localeCompare("grad")) {
		fechaGrad.value = new Date(2017, 11, 12) //YYYY, MM-1, DD
	}
	
	else if (!str.localeCompare("indep")) {
		fechaIndep.value = new Date(20, 00, 10, 09, 30, 40) // YY, MM-1, DD, HH, MM, SS
	}
	
} // fin de funcion ponerFecha
