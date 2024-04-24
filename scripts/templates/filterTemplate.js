import PhotographerMediasTemplate from './PhotographerMediasTemplate.js';
import PhotographerLightbox from './PhotographerLightbox.js';

export default class DropdownFilter {
	constructor(photographer, medias) {
		// j'instancie les classe photographerMediasTemplate et photographerLightbox pour réutiliser leur fonction
		this._photographerMediasTemplate = new PhotographerMediasTemplate(photographer, medias);
		this._photographerLightbox = new PhotographerLightbox(photographer, medias);
		this._medias = medias;
		// l'appel d'handleFilterMedias ici me permet de filtrer ma liste par popularité par défaut
		this.handleFilterMedias('Popularité');
	}
	createDropdownFilter() {
		const filterSection = document.querySelector('.filter-section');
		const dropdownHTML = `
		<div class="dropdown" role="combobox" aria-haspopup="listbox" aria-expanded="false" aria-controls="filter-options" aria-labelledby="sort-label">
			<button id="sort-btn" class="sort-btn" type="button" aria-haspopup="listbox" aria-expanded="false" aria-controls="filter-options" aria-label="Trier par">
				<span class="current-sort">Popularité</span>
				<span class="fa-solid fa-chevron-up" aria-hidden="true"></span>
			</button>
			<ul id="filter-options" class="dropdown-content" aria-hidden="true" role="listbox" aria-labelledby="sort-label" tabindex="-1">
				<li role="option" aria-selected="false">
					<button class="dropdown-option" type="button" tabindex="-1" aria-label="Trier par popularité">Popularité</button>
				</li>
				<li role="option" aria-selected="true">
					<button class="dropdown-option" type="button" tabindex="-1" aria-label="Trier par titre">Titre</button>
				</li>
				<li role="option" aria-selected="false">
					<button class="dropdown-option" type="button" tabindex="-1" aria-label="Trier par date">Date</button>
				</li>
			</ul>
		</div>`;
		filterSection.innerHTML = dropdownHTML + filterSection.innerHTML;
		
		return filterSection;
	}
	
	handleFilterMenu() {
		const sortMenu = document.querySelector('.dropdown-content');
		const sortMenuButton = document.querySelector('.sort-btn');
		const sortButtons = document.querySelectorAll('.dropdown-content button');
	
		sortMenuButton.addEventListener('click', () => {
			// vérifie si l'attribut aria-expanded est à true. S'il ne l'est pas il renvoie false sinon true;
			const isExpanded = sortMenuButton.getAttribute('aria-expanded') === 'true';

			// ici je set aria expanded à l'inverse de son état actuel
			sortMenuButton.setAttribute('aria-expanded', !isExpanded);

			// toggle l'ouverture du menu et le rotate du chevron
			sortMenu.classList.toggle('dropdown-effect');
			document.querySelector('.fa-chevron-up').classList.toggle('rotate');
			
			// retire ou ajoute l'accessibilité sur le menu de tri s'il ouvert ou non
			const ariaHiddenValue = sortMenu.classList.contains('dropdown-effect') ? 'false' : 'true';
			sortMenu.setAttribute('aria-hidden', ariaHiddenValue);

			// rendre focusable ou non les boutons si sortMenu est ouvert
			const tabIndexValue = sortMenu.classList.contains('dropdown-effect') ? '0' : '-1';
			sortButtons.forEach(button => button.setAttribute('tabindex', tabIndexValue));
		});
		
		// event qui sert à fermer le menu au clic sur la page.
		document.addEventListener('click', (event) => {
			const targetElement = event.target;
			// tant que l'utilisateur ne clique pas sur l'élément dropdown on rentre dans la condition
			if (!targetElement.closest('.dropdown')) {
				sortMenu.classList.remove('dropdown-effect');
				sortMenuButton.setAttribute('aria-expanded', 'false');
				document.querySelector('.fa-chevron-up').classList.remove('rotate');
				sortMenu.setAttribute('aria-hidden', 'true');
				sortButtons.forEach(button => button.setAttribute('tabindex', '-1'));
			}
		});
	}
	
	handleClickMenuItems() {
		const currentButton = document.querySelector('.current-sort');
		const sortButtons = document.querySelectorAll('.dropdown-content button');
		const btnsArray = Array.from(sortButtons);
		let previousButton = btnsArray.find(btn => btn.textContent === currentButton.textContent);
		previousButton.style.display = 'none';

		btnsArray.forEach(btn => btn.addEventListener('click', () => {
			currentButton.textContent = btn.textContent;

			if (previousButton) previousButton.style.display = 'block';

			previousButton = btn;
			previousButton.style.display = 'none';

			this.handleFilterMedias(currentButton.textContent);
		}));
	}

	// cette fonction me permet de gérer le tri et de mettre à jour la page medias
	handleFilterMedias(value) {
		switch (value) {
		case 'Titre':
			this._medias.sort((a, b) => a.title.localeCompare(b.title));
			break;
		case 'Popularité':
			this._medias.sort((a, b) => b.likes - a.likes);
			break;
		case 'Date':
			this._medias.sort((a, b) => new Date(b.date) - new Date(a.date));
			break;
		}
		this._photographerMediasTemplate.createPhotographerMedias();
		this._photographerLightbox.updateMediaList(this._medias);
	}
}