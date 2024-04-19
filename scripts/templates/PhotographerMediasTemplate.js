export default class PhotographerMediasTemplate {
	constructor(photographer, medias) {
		this.photographer = photographer;
		this.medias = medias;
	}
	generateMediaHTML(media) {
		// j'ajoute un data-media dans ma balise <a> qui me servira à ouvrir la lightbox
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
						<button class="btn_like" type="button" data-media="${media.id}" aria-label="Like">
							<span class="fas fa-heart" aria-hidden="true"></span>
						</button>
					</div>
				</div>
            </article>
        `;
	}
	createPhotographerMedias() {
		let totalLikes = 0;
		this.medias.forEach(media => {
			totalLikes += media.likes;
		});
		//handle total of likes
		const profilePageContent = document.querySelector('.photograph-main');
		const mediaHTML = this.medias.map(media => this.generateMediaHTML(media)).join('');
		const content = `
            <section class="photograph_gallery">
                ${mediaHTML}
            </section>
			<div class="photograph_likes-price">
				<div class="likes_count">
					<span class="count">${totalLikes}</span>
					<span class="fas fa-heart" aria-hidden="true"></span>					
				</div>
				<span>${this.photographer.price}€ / jour</span>
			</div>
			
        `;
		profilePageContent.innerHTML = content;

		const likeButtons = document.querySelectorAll('.btn_like');
		likeButtons.forEach(button => {
			button.addEventListener('click', (e) => {
				const mediaId = parseInt(e.target.closest('.btn_like').dataset.media);
				const media = this.medias.find(media => media.id == mediaId);
			
				// Toggle like status
				media.liked = !media.liked;
				if (media.liked) {
					media.likes++;
					totalLikes++;
					button.classList.add('btn_like--active');

				} else {
					media.likes--;
					totalLikes--;
					button.classList.remove('btn_like--active');
				}
				
				// Update media like for the media
				const mediaLikeCountElement = e.target.closest('.gallery_card_like').querySelector('.like_number');
				mediaLikeCountElement.textContent = media.likes;

				// Update total like in count
				const totalLikesCount = document.querySelector('.count');
				totalLikesCount.textContent = totalLikes;

			});
		});

		return content;
	}

}