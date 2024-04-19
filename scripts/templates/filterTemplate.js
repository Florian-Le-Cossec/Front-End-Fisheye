import PhotographerMediasTemplate from './PhotographerMediasTemplate.js';

export default class DropdownFilter {
	constructor(photographer, medias) {
		this._photographerMediasTemplate = new PhotographerMediasTemplate(photographer, medias);
		this._medias = medias;
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
		const sortmenu = document.querySelector('.dropdown-content');
		const sortMenuButton = document.querySelector('.sort-btn');
		const sortButtons = document.querySelectorAll('.dropdown-content button');
	
		sortMenuButton.addEventListener('click', () => {
			const isExpanded = sortMenuButton.getAttribute('aria-expanded') === 'true';
			sortMenuButton.setAttribute('aria-expanded', !isExpanded);
			sortmenu.classList.toggle('dropdown-effect');
			document.querySelector('.fa-chevron-up').classList.toggle('rotate');

			const ariaHiddenValue = sortmenu.classList.contains('dropdown-effect') ? 'false' : 'true';
			sortmenu.setAttribute('aria-hidden', ariaHiddenValue);

			const tabIndexValue = sortmenu.classList.contains('dropdown-effect') ? '0' : '-1';
			sortButtons.forEach(button => button.setAttribute('tabindex', tabIndexValue));
		});
	
		document.addEventListener('click', (event) => {
			const targetElement = event.target;
			if (!targetElement.closest('.dropdown')) {
				sortmenu.classList.remove('dropdown-effect');
				sortMenuButton.setAttribute('aria-expanded', 'false');
				document.querySelector('.fa-chevron-up').classList.remove('rotate');
				sortmenu.setAttribute('aria-hidden', 'true');
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
	}
}