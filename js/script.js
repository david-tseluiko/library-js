const dialog = document.querySelector(".main__dialog");
const newBookButton = document.querySelector(".main__button");
const submitButton = document.querySelector(".form__submit");

newBookButton.addEventListener("click", () => {
    dialog.showModal();
});

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close();
});

const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

function displayBooks() {
    const cardsContainer = document.querySelector(".main__book-list");

    for (book of myLibrary) {
        const card = document.createElement("div");
        card.classList.add("main__card", "card");

        const cardTitle = document.createElement("div");
        cardTitle.classList.add("card__title");
        cardTitle.textContent = book.title;

        const cardAuthor = document.createElement("div");
        cardAuthor.classList.add("card__author");
        cardAuthor.textContent = book.author;

        const cardPages = document.createElement("div");
        cardPages.classList.add("card__pages");
        cardPages.textContent = `${book.pages} pages`;

        const cardRead = document.createElement("button");
        cardRead.classList.add("card__read");

        if (book.read) {
            cardRead.textContent = "Read";
            cardRead.classList.add("card__read--read");
        } else {
            cardRead.textContent = "Not read";
            cardRead.classList.add("card__read--not-read");
        }

        card.append(cardTitle, cardAuthor, cardPages, cardRead);
        cardsContainer.appendChild(card);
    }
}

addBookToLibrary("War and Peace", "Lev Tolstoy", "1500", true);
addBookToLibrary("Crime and punishment", "Fyodor Dostoevsky", "400", false);

displayBooks();
