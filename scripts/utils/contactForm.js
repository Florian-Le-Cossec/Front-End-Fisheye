export const openCloseModal = () => {
	const contactBtn = document.querySelector('.contact_button');
	const contactModal = document.querySelector('.contact_modal');
	const closeModal = document.querySelector('.modal_close_btn');
	contactBtn.addEventListener('click', () => {
		contactModal.style.display = 'flex';
		closeModal.focus();
	});
	closeModal.addEventListener('click', () => contactModal.style.display = 'none');
};