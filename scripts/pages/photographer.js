//Mettre le code JavaScript lié à la page photographer.html
import PhotographerAboutTemplate from '../templates/PhotographerAboutTemplate.js';

async function getPhotographerById() {
	const response = await fetch('./../../data/photographers.json');
	// je récupère mes photographes uniquement
	const { photographers } = await response.json();
	// je stock dans une constante l'id de mon url
	const photographerId = new URLSearchParams(window.location.search).get('id');
	// je return mon nouveau photographe qui correspond à l'id de mon url
	return photographers
		.map(photographer => photographer)
		.find(photographer => photographer.id.toString() === photographerId);
}

async function displayData(photographer) {
	const photographAboutModel = new PhotographerAboutTemplate(photographer);
	photographAboutModel.createPhotographerInfos();
}

async function init() {
	const photographer = await getPhotographerById();
	displayData(photographer);
}
 
init();