export default class PhotographerAboutTemplate {
	constructor(data) {
		this._photographer = data;
	}

	createPhotographerInfos() {
		const phographHeader = document.querySelector('.photograph-header');
		const about = `
            <div class="photographer_profile__infos">
                <h1 class="photographer_name">${this._photographer.name}</h1>
                <p class="photographer_location">${this._photographer.city}, ${this._photographer.country}</p>
                <p class="photographer_tagline">${this._photographer.tagline}</p>    
            </div>
            <button class="contact_button" type="button" aria-label="Open contact form">Contactez-moi</button>
            <img class="photographer_img" src="./assets/photographers/${this._photographer.portrait}" alt="${this._photographer.name}">
        `;
		phographHeader.innerHTML = about;
		return phographHeader;
	}
}