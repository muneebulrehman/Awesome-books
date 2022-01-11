const inputTitle = document.querySelector('.title');
const inputAuthor = document.querySelector('.author');
const addBtn = document.querySelector('.add-btn');
const sectionBooks = document.querySelector('.books');

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

class BookApp {
  constructor() {
    this.bookCollection = localStorage.getItem('bookCollection')
      ? JSON.parse(localStorage.getItem('bookCollection'))
      : [];
  }

  addBook(title, author) {
    this.bookCollection.push({
      title,
      author,
    });
    localStorage.setItem('bookCollection', JSON.stringify(this.bookCollection));
    loadBooks(this.bookCollection);
  }

  removeBook(i) {
    this.bookCollection.splice(i, 1);
    localStorage.setItem('bookCollection', JSON.stringify(this.bookCollection));
    loadBooks(this.bookCollection);
  }
  /* eslint-disable */
	returnBook(title, author, i) {
		const html = `<div class="each-book">
		  <span class="book-title">${title}</span>
		  <span class="author">${author}</span>
		  <button class="remove-btn" data-id=${i}>Remove</button>
	  </div>`;
		return html;
	}
	/* eslint-enable */
}

const books = new BookApp();

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const title = inputTitle.value;
  const author = inputAuthor.value;
  if (title && author) {
    books.addBook(title, author);
    /* eslint-disable */
		inputAuthor.value = inputTitle.value = '';
		/* eslint-enable */
  }
});

sectionBooks.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    const num = +e.target.dataset.id;
    books.removeBook(num);
  }
});

loadBooks(books.bookCollection);