export default class PhotographerMediasTemplate {
	constructor(photographer, medias) {
		this.photographer = photographer;
		this.medias = medias;
	}
	generateMediaHTML(media) {
		const mediaContent = media.image
			? 	`<img class="gallery_img" src="./assets/images/${this.photographer.name}/${media.image}" alt="${media.title}">`
			:	`<video class="gallery_img" aria-label="${media.title}">
                    <source src="./assets/images/${this.photographer.name}/${media.video}" type="video/mp4">
            	</video>`;
		return `
            <article class="gallery_card">
                <a href="#" data-media=${media.id} role="link" aria-label="View media large">
                    ${mediaContent}
                </a>
				<div class="gallery_card_info">
					<h2>${media.title}</h2>
					<div class="gallery_card_like" role="group" aria-label="Like button and number of likes">
						<span class="like_number">${media.likes}</span>
						<button class="btn_like" type="button" aria-label="Like">
							<span class="fas fa-heart" aria-hidden="true"></span>
						</button>
					</div>
				</div>
            </article>
        `;
	}
	createPhotographerMedias() {
		const profilePageContent = document.querySelector('.photograph-main');
		const mediaHTML = this.medias.map(media => this.generateMediaHTML(media)).join('');
		const content = `
            <section class="photograph_gallery">
                ${mediaHTML}
            </section>
			<div class="photograph_likes-price">
				<div class="likes_count">
					<span class="count">200 000</span>
					<span class="fas fa-heart" aria-hidden="true"></span>					
				</div>
				<span>${this.photographer.price}€ / jour</span>
			</div>
			
        `;

		profilePageContent.innerHTML = content;
		return content;
	}
}