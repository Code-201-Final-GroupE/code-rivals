'use strict';
//------------------GLOBAL VARIABLES----------------
let new_player;
let npc_array = [];
const form = document.getElementById('player-form');

//-----------------NPC  ATTRIBUTE ARRAY--------------




//------------------CHARACTER CONSTRUCTOR------------

class Character {
  constructor(name,language,element,start_quote,win_quote) {
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
  new_player = new Character(new_name, new_language_pref,new_element_pref,new_start_quote,new_win_quote);
  //place new player character in localStorage
  localStorage.setItem('player-character', JSON.stringify(new_player));
  //alert the user that their character was successfully  created
  alert(`A new fighter named ${new_name} was successfully created! See you in the ring, champ.`);
  //reset form fields
  form.reset();
};


//----------------EXECUTABLE CODE--------------------


form.addEventListener('submit', handle_submit);
