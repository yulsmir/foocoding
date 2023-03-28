'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // -------- Variables --------
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
  // TODO: Capitalize every word
  const generateBooksList = (titlesListArr) => {
    const list = document.createElement('ul');
    for (let i = 0; i < titlesListArr.length; i++) {
      const listItem = document.createElement('li');
      const bookTitle = titlesListArr[i]
        .split('_')
        .map((elem) => `${elem[0].toUpperCase()}${elem.substring(1)}`)
        .join(' ');

      listItem.innerHTML = `${bookTitle[0].toUpperCase()}${bookTitle.substring(1)}`;
      list.appendChild(listItem);
    }

    document.getElementById('container').appendChild(list);
  };

  // Function uses object with book information object for each book
  const generateBooksInfo = (objList, imagesList) => {
    const bookInfo = document.createElement('ul');
    bookInfo.classList.add('book-info');

    // TODO: optimize this part
    for (const [key] of Object.entries(objList)) {
      // TODO: create array of items
      const book = document.createElement('li');
      const title = document.createElement('h3');
      const language = document.createElement('p');
      const author = document.createElement('p');
      const cover = document.createElement('img');

      title.innerHTML = `${objList[key].title}`;
      language.innerHTML = `Language: ${objList[key].language}`;
      author.innerHTML = `Author: ${objList[key].author}`;

      cover.setAttribute('src', imagesList[key]);
      cover.setAttribute('alt', imagesList[key].split('/')[2]); // to fix

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

  // Split function into few
  // const createBookElement = (bookObj, imageSrc) => {
  //   const { title, language, author } = bookObj;
  //   const bookItem = document.createElement('li');
  //   bookItem.classList.add('book');

  //   const items = [
  //     { tag: 'h3', text: title, class: 'book-title' },
  //     { tag: 'p', text: `Language: ${language}`, itemClass: 'book-language' },
  //     { tag: 'p', text: `Author: ${author}`, itemClass: 'book-author' },
  //     {
  //       tag: 'img',
  //       src: imageSrc,
  //       alt: imageSrc,
  //       itemClass: 'book-cover',
  //     },
  //   ];

  //   items.forEach(({ tag, text, src, alt, itemClass }) => {
  //     const Item = document.createElement(tag);
  //     Item.classList.add(itemClass);
  //     if (text) Item.innerText = text;
  //     if (src && alt) Item.setAttribute('src', src, 'alt', alt);
  //     bookItem.appendChild(Item);
  //   });

  //   return bookItem;
  // };

  // const createBookList = (objList, imagesList) => {
  //   const bookListElement = document.createElement('ul');
  //   bookListElement.classList.add('book-info');

  //   Object.entries(objList).forEach(([key, bookObj]) => {
  //     const imageSrc = imagesList[key];
  //     const bookItem = createBookElement(bookObj, imageSrc);
  //     bookListElement.appendChild(bookItem);
  //   });

  //   return bookListElement;
  // };

  // const generateBooksInfo = (objList, imagesList) => {
  //   const bookListElement = createBookList(objList, imagesList);
  //   document.getElementById('container').appendChild(bookListElement);
  // };

  // -------- Events and handlers, functions call --------
  // Function that uses array
  generateBooksList(titles);

  generateBooksInfo(booksList, booksCovers);
});
