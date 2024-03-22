export default class IndexCardTemplate {
	constructor(data) {
		this._id = data.id;
		this._name = data.name;
		this._portrait = data.portrait;
		this._city = data.city;
		this._country = data.country;
		this._tagline = data.tagline;
		this._price = data.price;
	}
	createPhotographerCard() {
		const article = document.createElement('article');
		const card = `
		<a href="photographer.html?id=${this._id}" role="link" aria-label="Consulter le profil de ${this._name}">
			<img class="photographer_img" src="./assets/photographers/${this._portrait}" alt="">
			<h2 class="photographer_name">${this._name}</h2>
		</a>
		<span class="photographer_location">${this._city}, ${this._country}</span>
		<p class="photographer_tagline">${this._tagline}</p>
		<span class="photographer_price">${this._price}€/jour</span>
		`;
		article.innerHTML = card;
		return article;
	}
}