'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // -------- Variables --------
  const bookTitles = [
    'harry_potter_and_the_chamber_of_secrets',
    'the_little_prince',
    'nineteen_eighty_four',
    'thinner',
    'the_science_of_interstellar',
    'game_of_thrones',
    'the_theory_of_everything',
    'fahrenheit_451',
    'don_quixote',
    'invisible_man',
  ];

  const booksList = {
    harry_potter_and_the_chamber_of_secrets: {
      title: 'Harry potter and the chamber of secrets',
      language: 'English',
      author: 'J. K. Rowling',
    },

    the_little_prince: {
      title: 'The little prince',
      language: 'English',
      author: 'Antoine de Saint-Exupéry',
    },

    nineteen_eighty_four: {
      title: 'Nineteen eighty four',
      language: 'English',
      author: 'George Orwell',
    },

    thinner: {
      title: 'Thinner',
      language: 'English',
      author: 'Stephen King',
    },

    the_science_of_interstellar: {
      title: 'The science of interstellar',
      language: 'English',
      author: 'Kip Thorne',
    },

    game_of_thrones: {
      title: 'Game of thrones',
      language: 'English',
      author: 'George R. R. Martin',
    },

    the_theory_of_everything: {
      title: 'The theory of everything',
      language: 'English',
      author: 'Stephen Hawking',
    },

    fahrenheit_451: {
      title: 'Fahrenheit 451',
      language: 'English',
      author: 'Ray Bradbury',
    },

    don_quixote: {
      title: 'Don quixote',
      language: 'English',
      author: 'Miguel de Cervantes',
    },

    invisible_man: {
      title: 'Invisible man',
      language: 'English',
      author: 'Ralph Ellison',
    },
  };

  const booksCovers = {
    harry_potter_and_the_chamber_of_secrets: 'images/harry-potter-and-the-chamber-of-secrets.png',
    the_little_prince: './images/the-little-prince.jpg',
    nineteen_eighty_four: './images/nineteen-eighty-four.jpg',
    thinner: './images/thinner.jpg',
    the_science_of_interstellar: './images/the-science-of-interstellar.jpg',
    game_of_thrones: './images/game-of-thrones.jpg',
    the_theory_of_everything: './images/the-theory-of-everything.jpg',
    fahrenheit_451: './images/fahrenheit-451.png',
    don_quixote: './images/don-quixote.jpg',
    invisible_man: './images/invisible-man.jpg',
  };

  // -------- Methods --------
  // 1.3 Function uses array with book titles
  const generateBooksList = (titlesListArr) => {
    const list = document.createElement('ul');
    for (let i = 0; i < titlesListArr.length; i++) {
      const listItem = document.createElement('li');
      const bookTitle = titlesListArr[i].split('_').join(' ');

      // TODO: rewrite with string literals
      listItem.textContent = bookTitle[0].toUpperCase() + bookTitle.substring(1);
      list.appendChild(listItem);
    }

    document.getElementById('container').appendChild(list);
  };

  // TODO: add image alt
  // TODO: review naming of classes and ids
  // TODO: capitalize every word in a title
  // TODO: put all text to heading element
  // TODO: review lets and remove them with consts
  // TODO: change for loop to for ... of

  // Function uses object with book information object for each book
  const generateBookInfo = (objList, imagesList) => {
    const bookInfo = document.createElement('ul');

    // TODO: divide functions:
    // 1) generate template with
    // 2) get values
    // 3) show values

    for (const [key, value] of Object.entries(objList)) {
      // TODO: create array of elements
      const book = document.createElement('li');
      const bookTitle = document.createElement('h4');
      const bookLanguage = document.createElement('p');
      const bookAuthor = document.createElement('p');
      const bookCover = document.createElement('img');

      bookTitle.textContent = objList[key].title;
      bookLanguage.textContent = `Language: ${objList[key].language}`;
      bookAuthor.textContent = `Author: ${objList[key].author}`;

      bookCover.setAttribute('src', imagesList[key]);

      bookInfo.classList.add('book-info');

      // TODO: create array of classes
      book.classList.add('book');
      bookTitle.classList.add('book-title');
      bookLanguage.classList.add('book-language');
      bookAuthor.classList.add('book-author');
      bookCover.classList.add('book-cover');

      book.appendChild(bookTitle);
      book.appendChild(bookLanguage);
      book.appendChild(bookAuthor);
      book.appendChild(bookCover);
      bookInfo.appendChild(book);
    }

    document.getElementById('container').appendChild(bookInfo);
  };

  // -------- Events and handlers, functions call --------
  // Uncomment to check function that uses array
  // generateBooksList(bookTitles);
  generateBookInfo(booksList, booksCovers);
});
