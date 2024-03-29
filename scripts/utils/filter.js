export function toggleFilter() {
	const sortmenu = document.querySelector('.dropdown-content');
	const sortMenuButton = document.querySelector('.sort-btn');
	const sortButtons = document.querySelectorAll('.dropdown-content button');
	const currentSort = document.querySelector('.current-sort');
  
	sortMenuButton.addEventListener('click', () => {
		const isExpanded = sortMenuButton.getAttribute('aria-expanded') === 'true';
		sortMenuButton.setAttribute('aria-expanded', !isExpanded);
		sortmenu.classList.toggle('dropdown-effect');
		document.querySelector('.fa-chevron-up').classList.toggle('rotate');
  
		const ariaHiddenValue = sortmenu.classList.contains('dropdown-effect') ? 'false' : 'true';
		sortmenu.setAttribute('aria-hidden', ariaHiddenValue);
  
		const tabIndexValue = sortmenu.classList.contains('dropdown-effect') ? '0' : '-1';
		sortButtons.forEach(button => button.setAttribute('tabindex', tabIndexValue));

		const btnsArray = Array.from(sortButtons);
		const removeActiveBtn = btnsArray.find(btn => btn.textContent == currentSort.textContent);
		removeActiveBtn.style.display = 'none';
	});
}