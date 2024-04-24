export default class IndexCardTemplate {
	constructor(data) {
		this._photographer = data;
	}
	createPhotographerCard() {
		const article = document.createElement('article');
		const card = `
		<a href="photographer.html?id=${this._photographer.id}" role="link" aria-label="Consulter le profil de ${this._photographer.name}">
			<img class="photographer_img" src="./assets/photographers/${this._photographer.portrait}" alt="photo de profil de ${this._photographer.name}">
			<h2 class="photographer_name">${this._photographer.name}</h2>
		</a>
		<span class="photographer_location">${this._photographer.city}, ${this._photographer.country}</span>
		<p class="photographer_tagline">${this._photographer.tagline}</p>
		<span class="photographer_price">${this._photographer.price}€/jour</span>
		`;
		article.innerHTML = card;
		return article;
	}
}