//Mettre le code JavaScript lié à la page photographer.html
import PhotographerAboutTemplate from '../templates/PhotographerAboutTemplate.js';
import PhotographerModel from '../models/PhotographerModel.js';
import MediasFactory from '../factories/mediasFactory.js';
import PhotographerMediasTemplate from '../templates/PhotographerMediasTemplate.js';
import DropdownFilter from '../templates/filterTemplate.js';
import { openCloseModal, validateForm } from '../utils/contactForm.js';
import Lightbox from '../templates/PhotographerLightbox.js';

async function getPhotographerById() {
	const response = await fetch('./../../data/photographers.json');
	// je récupère mes photographes uniquement
	const { photographers, media } = await response.json();
	// je stock dans une constante l'id de mon url
	const photographerId = new URLSearchParams(window.location.search).get('id');
	// je return mon nouveau photographe qui correspond à l'id de mon url et je lui passe le model photographer
	const photographer = photographers
		.map(photographer => new PhotographerModel(photographer))
		.find(photographer => photographer.id.toString() === photographerId);
	const medias = media
		.map(media => new MediasFactory(media))
		.filter(media => media.photographerId.toString() === photographerId);

	return {photographer, medias};
}

async function displayData({photographer, medias}) {
	const photographAbout = new PhotographerAboutTemplate(photographer);
	photographAbout.createPhotographerInfos();
	
	const photographMedias = new PhotographerMediasTemplate(photographer, medias);
	photographMedias.createPhotographerMedias();
	
	const dropdownFIlter = new DropdownFilter(photographer, medias);
	dropdownFIlter.createDropdownFilter();
	dropdownFIlter.handleFilterMenu();
	dropdownFIlter.handleClickMenuItems();
	

	const lightbox = new Lightbox(photographer, medias);

	const galleryImages = document.querySelectorAll('.gallery_image');
	galleryImages.forEach(image => {
		image.addEventListener('click', () => {
			lightbox.openLightbox();
		});
	});
}

async function init() {
	const photographer = await getPhotographerById();
	displayData(photographer);
	openCloseModal();
	validateForm();
}
 
init();