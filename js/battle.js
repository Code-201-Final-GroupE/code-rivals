'use strict';

//-----------------GLOBAL VARIABLES

//character variables
let player_character = JSON.parse(localStorage.getItem('player-character'));
let npc_array = JSON.parse(localStorage.getItem('npc_array'));
let npc;

//round counter
let round_display = document.getElementById('Round');
let round = 1;
round_display.innerHTML = round;

//messages
let npc_message = document.getElementById('npc-message');
let player_message = document.getElementById('player-message');
let player_prompt = document.getElementById('player-prompt');

//buttons
let language_button = document.getElementById('action-one');
let element_button = document.getElementById('action-two');
let normal_button = document.getElementById('action-three');
let defend_button = document.getElementById('action-four');
let button_container = document.getElementById('button-container');

//hp bars
let player_hp_display = document.getElementById('player-hp-bar');
let npc_hp_display = document.getElementById('npc-hp-bar');

let effective = ''; // extra or less effective message

//other default variables

//-----------------PAGE LOAD EVENTS--------------

window.onload = (event) => {
  //set the current round display to default
  round_display.innerHTML = round;
  //randomly pick an npc from the array

  let npc_index = Math.floor(Math.random() * npc_array.length);
  npc = npc_array[npc_index];

  //reminder to render player image
  //reminder to render npc image

  //display npc and character messages
  npc_message.innerHTML = `${npc.name}: ${npc.startQuote}`;
  player_message.innerHTML = `${player_character.name}: ${player_character.startQuote}`;

  //set player prompt text
  player_prompt.innerHTML = `What will ${player_character.name} do?`;

  //set button text and ids (ids needed for )
  language_button.innerHTML = `${player_character.language} Attack`;
  language_button.setAttribute('id', 'language');

  element_button.innerHTML = `${player_character.element} Attack`;
  element_button.setAttribute('id', 'element');

  normal_button.innerHTML = 'Normal Attack';
  normal_button.setAttribute('id', 'normal');

  defend_button.innerHTML = 'Defend';
  defend_button.setAttribute('id', 'defend');
};


//-----ROUND LOGIC AND BUTTON EVENTS-----

//checks if player is defending and adds damage modifier if so
let defend_check = function () {
  if (player_character.defending === true || npc.defending === true) {
    return 0.6;
  }
  else return 1;
};

// -----LANGUAGE ------------------------

let language_check = function () {
  if (player_character.language === npc.language) {
    effective = `You both speak ${player_character.language}, extra effective!`;
    return 1.3;
  }
  else {
    effective = 'Some things were lost in translation, less effective.';
  } return 1;
};


// ---- ELEMENTAL MODIFIER LOGIC, next section on line 184

let player_element_check = function () {

  if (player_character.element === npc.element) return 1;

  switch (player_character.element) {

  case 'Water':
    if (npc.element === 'Fire') {
      effective = 'It\'s very effective!';
      return 1.2;
    }
    else if (npc.element === 'Air') {
      effective = 'It\'s not very effective.';
      return 0.6;
    }
    else return 1;

  case 'Earth':
    if (npc.element === 'Air') {
      effective = 'It\'s very effective!';
      return 1.2;
    }
    else if (npc.element === 'Fire') {
      effective = 'It\'s not very effective.';
      return 0.6;
    }
    else return 1;

  case 'Fire':
    if (npc.element === 'Earth') {
      effective = 'It\'s very effective!';
      return 1.2;
    }
    else if (npc.element === 'Water') {
      effective = 'It\'s not very effective.';
      return 0.6;
    }
    else return 1;

  case 'Air':
    if (npc.element === 'Water') {
      effective = 'It\'s very effective!';
      return 1.2;
    }
    else if (npc.element === 'Earth') {
      effective = 'It\'s not very effective.';
      return 0.6;
    }
    else return 1;

  default:
    return 1;

  }
};

// --------------------------------------------------------------

let npc_element_check = function () {

  if (player_character.element === npc.element) return 1;

  switch (npc.element) {

  case 'Water':
    if (player_character.element === 'Fire') {
      effective = 'It\'s very effective!';
      return 1.2;
    }
    else if (player_character.element === 'Air') {
      effective = 'It\'s not very effective.';
      return 0.6;
    }
    else return 1;

  case 'Earth':
    if (player_character.element === 'Air') {
      effective = 'It\'s very effective!';
      return 1.2;
    }
    else if (player_character.element === 'Fire') {
      effective = 'It\'s not very effective.';
      return 0.6;
    }
    else return 1;

  case 'Fire':
    if (player_character.element === 'Earth') {
      effective = 'It\'s very effective!';
      return 1.2;
    }
    else if (player_character.element === 'Water') {
      effective = 'It\'s not very effective.';
      return 0.6;
    }
    else return 1;

  case 'Air':
    if (player_character.element === 'Water') {
      effective = 'It\'s very effective!';
      return 1.2;
    }
    else if (player_character.element === 'Earth') {
      effective = 'It\'s not very effective.';
      return 0.6;
    }
    else return 1;
  }
};

// ----------------------------------------------------------------

let battle_resolution = function () {

  if (npc.health <= 0) {
    npc_message.innerHTML = `${npc.name} was defeated!`;
    player_message.innerHTML = player_character.winQuote;
    player_character.wins += 1;
  }
  else if (player_character.health <= 0) {
    npc_message.innerHTML = npc.winQuote;
    player_message.innerHTML = `${player_character.name} was defeated!`;
  }
};

// -----------HP UPDATE----------------------------------

let player_hp_update = function () {
  let hp_width = Math.floor((player_character.health /100) * 120) + 'px';
  //set width of hp bar
  if (player_character.health <= 0) {
    player_hp_display.style.width = '0px';
  }
  else {
    player_hp_display.style.width = hp_width;
  }

  //set color of hp bar
  if (player_character.health < 30) {
    player_hp_display.style.backgroundColor = 'red';
  }
  else if (player_character.health < 70) {
    player_hp_display.style.backgroundColor = 'yellow';
  }
};

let npc_hp_update = function () {
  let hp_width = Math.floor((npc.health / 100) * 120) + 'px';
  //set width of hp bar
  if (npc.health <= 0) {
    npc_hp_display.style.width = '0px';
  }
  else {
    npc_hp_display.style.width = hp_width;
  }


  if (npc.health < 30) {
    npc_hp_display.style.backgroundColor = 'red';
  }
  else if (npc.health < 70) {
    npc_hp_display.style.backgroundColor = 'yellow';
  }
};

//----------NPC TURN-----------------

let npc_turn = function () {
  effective = '';
  //random generate number from 1 to 4
  let random_action = Math.floor((Math.random() * 4) + 1);

  //calculate base damage dealt to player
  let damage_dealt = Math.floor(((Math.random() * 20) + 10) * defend_check());

  //resolve action results
  switch (random_action) {

  case 1:
    damage_dealt *= language_check();
    damage_dealt = Math.floor(damage_dealt);

    npc_message.innerHTML = `${npc.name} used a ${npc.language} attack to deal ${damage_dealt} damage. ${effective}`;
    player_character.health -= damage_dealt;
    round += 1;
    break;

  case 2:
    damage_dealt *= npc_element_check();
    damage_dealt = Math.floor(damage_dealt);

    npc_message.innerHTML = `${npc.name} used a ${npc.element} attack to deal ${damage_dealt} damage. ${effective}`;
    player_character.health -= damage_dealt;
    round += 1;
    break;

  case 3:
    npc_message.innerHTML = `${npc.name} used a normal attack to deal ${damage_dealt} damage.`;
    player_character.health -= damage_dealt;
    round += 1;
    break;

  case 4:
    npc_message.innerHTML = `${npc.name} is defending.`;
    npc_message.defending = true;
    round += 1;
    break;
  }

  //update hp display
  player_hp_update();
  console.log(player_character.health);
  //check if battle is over
  battle_resolution();
  round_display.innerHTML = round;
};

// --------BATTLE LOGIC IMPLEMENTED HERE----------------------------

let buttonHandler = function (event) {
  effective = '';
  //base damge calculator
  let damage_dealt = Math.floor(((Math.random() * 20) + 10) * defend_check());

  // switch to decide behavior based on button pressed
  switch (event.target.id) {

  case 'language':
    damage_dealt *= language_check();
    damage_dealt = Math.floor(damage_dealt);

    player_message.innerHTML = `${player_character.name} used a ${player_character.language} attack to deal ${damage_dealt} damage. ${effective}`;
    npc.health -= damage_dealt;
    break;

  case 'element':
    damage_dealt *= player_element_check();
    damage_dealt = Math.floor(damage_dealt);

    player_message.innerHTML = `${player_character.name} used a ${player_character.element} attack to deal ${damage_dealt} damage. ${effective}`;
    npc.health -= damage_dealt;
    break;

  case 'normal':
    player_message.innerHTML = `${player_character.name} used a normal attack to deal ${damage_dealt} damage.`;
    npc.health -= damage_dealt;
    break;

  case 'defend':
    player_message.innerHTML = `${player_character.name} is defending,`;
    break;
  }

  //update hp display
  npc_hp_update();


  battle_resolution();
  // see line 72 for npc_turn function declaration
  npc_turn();
  //see line ## for battle resoultion function
};


button_container.addEventListener('click', buttonHandler);
