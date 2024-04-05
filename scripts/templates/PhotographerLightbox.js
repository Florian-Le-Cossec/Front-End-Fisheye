export default class Lightbox {
	constructor(photographer, medias) {
		this.photographer = photographer;
		this.mediasList = medias;
		this.currentIndex = 0;

		this.mediaProvider = Array.from(document.querySelectorAll('.gallery_card a'));
		this.mediaProvider.forEach(media => {
			media.addEventListener('click', () => {
				const mediaId = media.dataset.media;
				const mediaIndex = this.mediasList.findIndex(media => media.id.toString() === mediaId.toString());
				this.currentIndex = mediaIndex;
				this.openLightbox();
			});
		});

		document.addEventListener('keyup', e => {
			switch (e.key) {
			case 'Escape':
				this.closeLightbox();
				break;
			case 'ArrowLeft':
				this.previousMedia();
				break;
			case 'ArrowRight':
				this.nextMedia();
				break;
			}
		});
	}

	openLightbox() {
		const lightboxHTML = `
			<div class="background-blur" aria-modal="true" role="dialog">
				<div class="lightbox">
					<button class="lightbox_close" aria-label="Fermer le carrousel">
						<i class="fa-solid fa-xmark"></i>
					</button>
					<button class="lightbox_previous aria-label="Image précédente"">
						<i class="fa-solid fa-chevron-left"></i>
					</button>
					<div class="lightbox_media"></div>
					<button class="lightbox_next" aria-label="Image suivante">
						<i class="fa-solid fa-chevron-right"></i>
					</button>
				</div>
			</div>
        `;

		document.body.insertAdjacentHTML('beforeend', lightboxHTML);
		const btnClose = document.querySelector('.lightbox_close');
		const btnPrevious = document.querySelector('.lightbox_previous');
		const btnNext = document.querySelector('.lightbox_next');

		btnClose.addEventListener('click', () => this.closeLightbox());
		btnPrevious.addEventListener('click', () => this.previousMedia());
		btnNext.addEventListener('click', () => this.nextMedia());

		// Affiche le contenu du media actuel
		this.lightboxTemplate();
	}

	closeLightbox() {
		const lightbox = document.querySelector('.background-blur');
		lightbox.remove();
	}

	nextMedia() {
		this.currentIndex = (this.currentIndex + 1) % this.mediasList.length;
		this.lightboxTemplate();
	}

	previousMedia() {
		this.currentIndex = (this.currentIndex - 1 + this.mediasList.length) % this.mediasList.length;
		this.lightboxTemplate();
	}

	lightboxTemplate() {
		const currentMedia = this.mediasList[this.currentIndex];
		console.log(currentMedia);
		const lightboxMedia = document.querySelector('.lightbox_media');
		const lightboxContent = currentMedia.image
			? `	<img class="lightbox_img" src="./assets/images/${this.photographer.name}/${currentMedia.image}" alt="${currentMedia.title}">`
			: `	<video class="lightbox_video" controls aria-label="${currentMedia.name}">
            		<source src="./assets/images/${this.photographer.name}/${currentMedia.video}" type="video/mp4">
				</video>`;
		lightboxMedia.innerHTML = 
			`${lightboxContent}
			<figcaption>${currentMedia.title}</figcaption>
			`;
	}
}