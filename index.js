const inputTitle = document.querySelector('.title');
const inputAuthor = document.querySelector('.author');
const addBtn = document.querySelector('.add-btn');
const sectionBooks = document.querySelector('.books');

/* eslint-disable */
// if (localStorage.getItem('bookCollection')) {
// 	bookCollection = JSON.parse(localStorage.getItem('bookCollection'));
// } else bookCollection = [];
/* eslint-enable */

class BookApp {
	constructor() {
		this.bookCollection = localStorage.getItem('bookCollection')
			? JSON.parse(localStorage.getItem('bookCollection'))
			: [];
	}

	// database = () =>
	// 	window.localStorage.getItem('bookCollection') !== null
	// 		? JSON.parse(window.localStorage.getItem('bookCollection'))
	// 		: [];

	/* eslint-disable */

	addBook(title, author) {
		// sectionBooks.insertAdjacentHTML(
		// 	'afterbegin',
		// 	this.returnBook(title, author)
		// );
		/* eslint-disable */
		this.bookCollection.push({ title, author });
		localStorage.setItem('bookCollection', JSON.stringify(this.bookCollection));
		loadBooks(this.bookCollection);
		/* eslint-enable */
	}

	/* eslint-disable */
	removeBook(i) {
		this.bookCollection.splice(i, 1);
		localStorage.setItem('bookCollection', JSON.stringify(this.bookCollection));
		loadBooks(this.bookCollection);
	}
	/* eslint-enable */
	returnBook(title, author, i) {
		const html = `<div class="each-book">
		  <span class="book-title">${title}</span>
		  <span class="author">${author}</span>
		  <button class="remove-btn" data-id=${i}>Remove</button>
	  </div>`;
		return html;
	}
}

const books = new BookApp();
console.log(books.bookCollection);

addBtn.addEventListener('click', (e) => {
	e.preventDefault();
	const title = inputTitle.value;
	const author = inputAuthor.value;
	if (title && author) {
		books.addBook(title, author);
	}

	inputAuthor.value = inputTitle.value = '';
});

sectionBooks.addEventListener('click', (e) => {
	if (e.target.classList.contains('remove-btn')) {
		const num = +e.target.dataset.id;
		books.removeBook(num);
	}
});

function loadBooks(bookCollection) {
	sectionBooks.innerHTML = '';
	/* eslint-disable */
	if (bookCollection.length > 0) {
		bookCollection.forEach((book, i) => {
			sectionBooks.insertAdjacentHTML(
				'afterbegin',
				books.returnBook(book.title, book.author, i)
			);
		});
	}
	/* eslint-enable */
}

function clickToRemove(e) {
	if (e.target.classList.contains('remove-btn')) {
		const num = +e.target.dataset.id;
		books.removeBook(num);
	}
}
loadBooks(books.bookCollection);
