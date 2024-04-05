

export function openCloseModal() {
	const contactBtn = document.querySelector('.contact_button');
	const contactModal = document.querySelector('.contact_modal');
	const closeModal = document.querySelector('.modal_close_btn');
	contactBtn.addEventListener('click', () => {
		contactModal.style.display = 'flex';
	});
	closeModal.addEventListener('click', () => contactModal.style.display = 'none');
}

export function validateForm() {
	const form = document.querySelector('form');
	const contactModal = document.querySelector('.contact_modal');
	const firstname = document.querySelector('#firstname');
	const lastname = document.querySelector('#lastname');
	const email = document.querySelector('#email');
	const messageArea = document.querySelector('#message');

	//error messages
	const messages = {
		stringMessage: 'Ce champ nécessite au minimum 2 caractères et ne doit pas contenir de chiffres.',
		emailMessage: 'Veuillez entrer une adresse e-mail valide.',
		stringAreaMessage: 'Votre message doit contenir au mininum 15 caractères.'
	};

	//function to display or hide errorMessages
	function showErrorMessage(element, message) {
		element.parentElement.dataset.errorVisible = 'true';
		element.parentElement.dataset.error = message;
	}

	function removeErrorMessage(element) {
		delete element.parentElement.dataset.errorVisible;
		delete element.parentElement.dataset.error;
	}

	//function to verify input
	function verifyStringInput(string) {
		const stringValue = string.value;
		const stringRegex = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}$');
		if (!stringRegex.test(stringValue)) {
			showErrorMessage(string, messages.stringMessage);
			return false;
		}
		removeErrorMessage(string);
		return true;
	}

	function verifyEmailInput(email) {
		const emailValue = email.value;
		const emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
		
		if (!emailRegex.test(emailValue)) {
			showErrorMessage(email, messages.emailMessage);
			return false;
		}
		removeErrorMessage(email);
		return true;
	}

	function verifyInputArea(string) {
		if(string.value.length < 15) {
			showErrorMessage(string, messages.stringAreaMessage);
			return false;
		}
		removeErrorMessage(string);
		return true;
	}

	//function to validate form
	function validate(e) {
		e.preventDefault();
		const isFirstnameValid = verifyStringInput(firstname);
		const isLastnameValid = verifyStringInput(lastname);
		const isEmailValid = verifyEmailInput(email);
		const isInputAreaValid = verifyInputArea(messageArea);

		if (isFirstnameValid && isLastnameValid && isEmailValid && isInputAreaValid) {
			console.log('Prénom:', firstname.value, 'Nom:', lastname.value, 'Email:', email.value, 'Message:', messageArea.value);
			contactModal.style.display = 'none';
			form.reset();
		}
	}

	//eventListner to verify input
	firstname.addEventListener('input', () => {
		verifyStringInput(firstname);
	});
	lastname.addEventListener('input', () => {
		verifyStringInput(lastname);
	});
	email.addEventListener('input', () => {
		verifyEmailInput(email);
	});
	messageArea.addEventListener('input', () => {
		verifyInputArea(messageArea);
	});


	form.addEventListener('submit', e => validate(e));
}