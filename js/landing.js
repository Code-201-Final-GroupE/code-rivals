'use strict';
//------------------GLOBAL VARIABLES----------------
let new_player;
let npc_array = [];

const form = document.getElementById('player-form');

//-----------------NPC  ATTRIBUTE ARRAY--------------

let npc_data_array = [
  ['Alan Turing', 'Math', 'Air', 'We can only see a short distance ahead, but we can see plenty there that needs to be done…in kicking your butt.', 'Sometimes it is the people who no one imagines anything of who do the things that no one can imagine…but in your case, they were right.'],
  ['Ada Lovelace', 'Math', 'Fire', 'That brain of mine is something more than merely mortal; as this battle will show.', 'Imagination is the Discovering Faculty, pre-eminently. It is that which penetrates into the unseen worlds around us…but it took no imagination to defeat you.'],
  ['Admiral Grace Hopper', 'COBOL', 'Earth', 'A ship in port is safe, but that/’s not what ships are built for…this ship gonna take you to school.', 'One accurate measurement is worth a thousand expert opinions…you have been measured and found wanting.'],
  ['Guido Van Rossum', 'Python', 'Water', 'Now is better than never…now taste defeat.', 'Beautiful is better than ugly, explicit is better than implicit. The conundrum is your performance was explicitly ugly.'],
  ['Brendan Eich', 'JavaScript', 'Air', 'It took me ten days to write JavaScript..it’ll take me ten seconds to beat you.', 'Beating you was much less complicated than my programming language.']
];


//------------------CHARACTER CONSTRUCTOR------------

class Character {
  constructor(name, language, element, start_quote, win_quote) {
    this.name = name;
    this.language = language;
    this.element = element;
    this.startQuote = start_quote;
    this.winQuote = win_quote;
    this.health = 100;
    this.wins = 0;

  }
}

//-----------------FORM SUBMIT HANDLER---------------

const handle_submit = (event) => {
  //prevents browser from constantly submitting form with blank values
  event.preventDefault();
  //grab form values
  let new_name = event.target.name.value;
  let new_language_pref = event.target.language_pref.value;
  let new_element_pref = event.target.element_pref.value;
  let new_start_quote = event.target.start_quote.value;
  let new_win_quote = event.target.win_quote.value;
  //create new character object with constructor
  new_player = new Character(new_name, new_language_pref, new_element_pref, new_start_quote, new_win_quote);
  //place new player character in localStorage
  localStorage.setItem('player-character', JSON.stringify(new_player));
  //alert the user that their character was successfully  created
  alert(`A new fighter named ${new_name} was successfully created! See you in the ring, champ.`);
  //reset form fields
  form.reset();
};


//----------------EXECUTABLE CODE--------------------

for (let i = 0; i < npc_data_array.length; i++) {

  let new_npc =  new Character(npc_data_array[i][0], npc_data_array[i][1], npc_data_array[i][2], npc_data_array[i][3], npc_data_array[i][4]);
  npc_array.push(new_npc);
}

localStorage.setItem('npc_array', JSON.stringify(npc_array));

form.addEventListener('submit', handle_submit);
