'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // -------- Variables --------
  // TODO: optimize all variables using titles
  // TODO: title is a function of using id and id is a value from array
  const titles = [
    'marry_poppins',
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

  // TODO: fix id of booksList objects
  const booksList = {
    marry_poppins: {
      title: 'Marry Poppins',
      language: 'English',
      author: 'P. L. Travers',
    },

    the_little_prince: {
      title: 'The Little Prince',
      language: 'English',
      author: 'A. de Saint-Exupéry',
    },

    nineteen_eighty_four: {
      title: 'Nineteen Eighty Four',
      language: 'English',
      author: 'George Orwell',
    },

    thinner: {
      title: 'Thinner',
      language: 'English',
      author: 'Stephen King',
    },

    the_science_of_interstellar: {
      title: 'The Science of Interstellar',
      language: 'English',
      author: 'Kip Thorne',
    },

    game_of_thrones: {
      title: 'Game of Thrones',
      language: 'English',
      author: 'G. R. R. Martin',
    },

    the_theory_of_everything: {
      title: 'The Theory of Everything',
      language: 'English',
      author: 'Stephen Hawking',
    },

    fahrenheit_451: {
      title: 'Fahrenheit 451',
      language: 'English',
      author: 'Ray Bradbury',
    },

    don_quixote: {
      title: 'Don Quixote',
      language: 'English',
      author: 'M. de Cervantes',
    },

    invisible_man: {
      title: 'Invisible Man',
      language: 'English',
      author: 'Ralph Ellison',
    },
  };

  const booksCovers = {
    marry_poppins: './images/marry-poppins.jpg',
    the_little_prince: './images/the-little-prince.jpg',
    nineteen_eighty_four: './images/nineteen-eighty-four.jpg',
    thinner: './images/thinner.jpg',
    the_science_of_interstellar: './images/the-science-of-interstellar.jpg',
    game_of_thrones: './images/game-of-thrones.jpg',
    the_theory_of_everything: './images/the-theory-of-everything.jpg',
    fahrenheit_451: './images/fahrenheit-451.jpg',
    don_quixote: './images/don-quixote.jpg',
    invisible_man: './images/invisible-man.jpg',
  };

  // -------- Methods --------
  // 1.3 Function uses array with book titles

  // TODO: move title formatting into a separate function
  const formatTitle = (title) => {
    console.log(title);
  };

  // TODO: add image alt
  const addImageAlt = () => {
    console.log('image alt added');
  };

  // TODO: add image path from image name
  const setImagePath = () => {
    console.log('image path');
  };

  const generateBooksList = (titlesListArr) => {
    const list = document.createElement('ul');
    for (let element in list) {
      element = document.createElement('li');
      const title = titlesListArr[element].split('_').join(' ');

      element.textContent = `${title[0].toUpperCase()}${title.substring(1)}`;
      list.appendChild(element);
    }

    document.getElementById('container').appendChild(list);
  };

  // TODO: review naming of classes and ids
  // TODO: capitalize every word in a title - function formatTitle(inputTitle){ return outputTitle; }
  // TODO: put all text to heading element - create element 'heading'
  // TODO: add separate div for image
  // TODO: put image on top

  // Function uses object with book information object for each book
  const generateBookLayout = () => {
    const bookInfo = document.createElement('ul');
    const book = document.createElement('li');
    const title = document.createElement('h3');
    const language = document.createElement('p');
    const author = document.createElement('p');
    const cover = document.createElement('img');

    title.textContent = 'Title: ';
    language.textContent = 'Language: ';
    author.textContent = 'Author: ';

    bookInfo.classList.add('book-info');
    book.classList.add('book');
    title.classList.add('book-title');
    language.classList.add('book-language');
    author.classList.add('book-author');

    cover.classList.add('book-cover');

    book.appendChild(title);
    book.appendChild(language);
    book.appendChild(author);
    book.appendChild(cover);
    bookInfo.appendChild(book);
  };

  const generateBookInfo = (objList, imagesList) => {
    const bookInfo = document.createElement('ul');

    // TODO: divide functions:
    // 1) generate template with default values
    // 2) get values
    // 3) show values

    for (const [key, value] of Object.entries(objList)) {
      // TODO: create array of elements
      const book = document.createElement('li');
      const title = document.createElement('h3');
      const language = document.createElement('p');
      const author = document.createElement('p');
      const cover = document.createElement('img');

      title.textContent = `${objList[key].title}`;
      language.textContent = `Language: ${objList[key].language}`;
      author.textContent = `Author: ${objList[key].author}`;

      cover.setAttribute('src', imagesList[key]);

      bookInfo.classList.add('book-info');

      // TODO: create array of classes
      book.classList.add('book');
      title.classList.add('book-title');
      language.classList.add('book-language');
      author.classList.add('book-author');

      cover.classList.add('book-cover');

      book.appendChild(title);
      book.appendChild(language);
      book.appendChild(author);
      book.appendChild(cover);
      bookInfo.appendChild(book);
    }

    document.getElementById('container').appendChild(bookInfo);
  };

  // -------- Events and handlers, functions call --------
  // Uncomment to check function that uses array
  // generateBooksList(titles);
  formatTitle('format title');
  addImageAlt();
  setImagePath();
  generateBookInfo(booksList, booksCovers);
});
