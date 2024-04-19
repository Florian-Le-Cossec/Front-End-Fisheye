export default class Lightbox {
	constructor(photographer, medias) {
		this.photographer = photographer;
		this.mediasList = medias;
		this.currentIndex = 0;

		// je selectionne tout mon document pour gérer la navigation dans ma lightbox
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
		// je créé le contenu de ma lightbox
		const lightboxHTML = `
			<div class="background-blur" aria-modal="true" role="dialog">
				<div class="lightbox">
					<button class="lightbox_close" aria-label="Fermer le carrousel">
						<em class="fa-solid fa-xmark"></em>
					</button>
					<button class="lightbox_previous aria-label="Image précédente">
						<em class="fa-solid fa-chevron-left"></em>
					</button>
					<div class="lightbox_media"></div>
					<button class="lightbox_next" aria-label="Image suivante">
						<em class="fa-solid fa-chevron-right"></em>
					</button>
				</div>
			</div>
        `;
		// ici je prend le body de mon document et j'insere mon élément html lighbox après le dernier enfant du body (beforeend)
		document.body.insertAdjacentHTML('beforeend', lightboxHTML);
		const btnClose = document.querySelector('.lightbox_close');
		const btnPrevious = document.querySelector('.lightbox_previous');
		const btnNext = document.querySelector('.lightbox_next');

		btnClose.addEventListener('click', () => this.closeLightbox());
		btnPrevious.addEventListener('click', () => this.previousMedia());
		btnNext.addEventListener('click', () => this.nextMedia());

		// display actual media
		this.lightboxTemplate();
	}

	closeLightbox() {
		const lightbox = document.querySelector('.background-blur');
		lightbox.remove();
	}

	nextMedia() {
		// j'utilise un modulo pour récupérer le reste de la division entière/euclidienne de currentIndex + 1 et de mediaList.length
		// si mediaList.length est un array qui a 10 items alors 9 + 1 % 10 = 0 en effet il n'y a pas de reste
		this.currentIndex = (this.currentIndex + 1) % this.mediasList.length;
		this.lightboxTemplate();
	}

	previousMedia() {
		// ici c'est l'inverse si j'ai 10 items dans ma liste, alors (0-1+10) % 10 => 9%10 = 9. l'opération renvoie à la fin de la liste
		this.currentIndex = (this.currentIndex - 1 + this.mediasList.length) % this.mediasList.length;
		this.lightboxTemplate();
	}

	

	lightboxTemplate() {
		const currentMedia = this.mediasList[this.currentIndex];
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

	// cette méthode permet d'ouvrir la lightbox peut importe le filtre qui est appliqué
	updateMediaList(sortedMedias) {
		// ma liste des medias = à la liste trié
		this.mediasList = sortedMedias;
		// je réinitialise mon index à 0;
		this.currentIndex = 0;
		// je récupere les medias dans le DOM
		this.mediaLink = Array.from(document.querySelectorAll('.gallery_card a'));
		// Pour chaque media j'ajoute un écouteur d'evenement click
		this.mediaLink.forEach(media => {
			media.addEventListener('click', () => {
				// je recupere mon dataset media que je compare avec l'id des items de ma liste. pour récuperer l'index de mon media
				const mediaId = media.dataset.media;
				const mediaIndex = this.mediasList.findIndex(media => media.id.toString() === mediaId.toString());
				// index réutilisé pour gérer l'ouverture de la bonne media ainsi que la media suivante et précédente.
				this.currentIndex = mediaIndex;
				this.openLightbox();
			});
		});
	}
}


