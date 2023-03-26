'use strict';

{
  // Variables
  const bookTitles = [
    'harry_potter_and_chamber_of_secrets',
    'the_little_prince',
    'nineteen_eighty_four',
    'thinner',
    'the_science_of_interstellar',
    'game_of_thrones:_clash_of_kings',
    'the_theory_of_everything:_the_origin_and_fate_of_the_universe',
    'fahrenheit_451',
    'don_quixote',
    'invisible_man',
  ];

  // Methods
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

  createList();
  // Inits & Event Listeners
}
