import IndexCardTemplate from '../templates/IndexCardTemplate.js';

async function getPhotographers() {
	// Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
	// mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
	const response = await fetch('./../../data/photographers.json');
	const photographers = await response.json();
	return photographers;
}

async function displayData(photographers) {
	const photographersSection = document.querySelector('.photographer_section');

	photographers.forEach((photographer) => {
		const photographerModel = new IndexCardTemplate(photographer);
		const userCardDOM = photographerModel.createPhotographerCard();
		photographersSection.appendChild(userCardDOM);
	});
}

async function init() {
	// Récupère les datas des photographes
	const { photographers } = await getPhotographers();
	displayData(photographers);
}
    
init();
    
