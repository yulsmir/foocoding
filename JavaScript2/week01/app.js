'use strict';

document.addEventListener('DOMContentLoaded', function () {
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

  const createList = () => {
    const list = document.createElement('ul');
    for (let i = 0; i < bookTitles.length; i++) {
      const listItem = document.createElement('li');
      const bookTitle = bookTitles[i].split('_').join(' ');

      listItem.textContent = bookTitle[0].toUpperCase() + bookTitle.substring(1);

      list.appendChild(listItem);

      console.log(listItem); // Delete comment
    }

    document.getElementById('books').appendChild(list);
  };

  const booksInfo = {
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

  createList();
});
