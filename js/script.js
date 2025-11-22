const dialog = document.querySelector(".main__dialog");
const newBookButton = document.querySelector(".main__button");
const submitButton = document.querySelector(".form__submit");
const booksList = document.querySelector(".main__book-list");

const myLibrary = [];

newBookButton.addEventListener("click", () => {
    dialog.showModal();
});

submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const cardsContainer = document.querySelector(".main__book-list");
    const inputs = document.querySelectorAll(".form__input");
    const isRead = document.querySelector(".form__is-read-checkbox");

    if (validateForm(inputs)) {
        addBookToLibrary(
            inputs[0].value,
            inputs[1].value,
            inputs[2].value,
            isRead.checked
        );

        clearScreen(cardsContainer);
        displayBooks(cardsContainer);
        clearForm(inputs, isRead);
        dialog.close();
    }
});

booksList.addEventListener("click", (e) => {
    if (e.target.classList.contains("card__read--read")) {
        e.target.classList.remove("card__read--read");
        e.target.classList.add("card__read--not-read");
        e.target.textContent = "Not read";
    } else if (e.target.classList.contains("card__read--not-read")) {
        e.target.classList.remove("card__read--not-read");
        e.target.classList.add("card__read--read");
        e.target.textContent = "Read";
    } else if (e.target.classList.contains("card__remove")) {
        for (let i = 0; i < myLibrary.length; i++) {
            if (e.target.attributes[1].value === myLibrary[i].id) {
                console.log(e.target);
                myLibrary.splice(i, 1);

                const cardsContainer =
                    document.querySelector(".main__book-list");
                clearScreen(cardsContainer);
                displayBooks(cardsContainer);
            }
        }
    }
});

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

function displayBooks(cardsContainer) {
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

        const cardRemove = document.createElement("button");
        cardRemove.classList.add("card__remove");
        cardRemove.textContent = "Remove";
        cardRemove.setAttribute("data-index-number", book.id);

        if (book.read) {
            cardRead.textContent = "Read";
            cardRead.classList.add("card__read--read");
        } else {
            cardRead.textContent = "Not read";
            cardRead.classList.add("card__read--not-read");
        }

        card.append(cardTitle, cardAuthor, cardPages, cardRead, cardRemove);
        cardsContainer.appendChild(card);
    }
}

function clearScreen(cardsContainer) {
    cardsContainer.innerHTML = "";
}

function validateForm(inputs) {
    for (input of inputs) {
        if (input.value.trim().length === 0) {
            alert(`${input.placeholder} field is empty, please fill that out.`);
            return false;
        }
    }

    return true;
}

function clearForm(inputs, isRead) {
    for (input of inputs) {
        input.value = "";
    }

    isRead.checked = false;
}
