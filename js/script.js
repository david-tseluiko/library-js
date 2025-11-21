const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () =>
        `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

// addBookToLibrary("War and Peace", "Lev Tolstoy", "1500", "already read");
// addBookToLibrary("Crime and punishment", "Fyodor Dostoevsky", "400", "not read yet");

// console.log(myLibrary);
