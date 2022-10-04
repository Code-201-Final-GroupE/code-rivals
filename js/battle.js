'use strict';

//-----------------GLOBAL VARIABLES

//character variables
let player_character = JSON.parse(localStorage.getItem('player-character'));
let npc_array = JSON.parse(localStorage.getItem('npc_array'));
let npc;

//DOM variables
let round_display = document.getElementById('Round');
let round = 1;
round_display.innerHTML = round;

let npc_message = document.getElementById('npc-message');
let player_message = document.getElementById('player-message');
let player_prompt = document.getElementById('player-prompt');

let language_button = document.getElementById('action-one');
let element_button = document.getElementById('action-two');
let normal_button = document.getElementById('action-three');
let defend_button = document.getElementById('action-four');

let button_container = document.getElementById('button-container');

let effective = ''; // extra or less effective message

//other default variables

//-----------------PAGE LOAD EVENTS--------------

window.onload = (event) => {
  //set the current round display to default
  round_display.innerHTML = round;
  //randomly pick an npc from the array

  let npc_index = Math.floor(Math.random() * npc_array.length);
  npc = npc_array[npc_index];
  console.log(npc);

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

// ---- ELEMENTAL MODIFIER LOGIC, next section on line 184

let player_element_check = function () {
  switch (player_character.element) {

  // water > fire
  // earth > air
  // fire > earth
  // air > water
  case 'Water':
    if (npc.element === 'Fire') {
      effective = 'It\'s very effective!';
      return 1.2;
    }
    else if (npc.element === 'Air') {
      effective = 'It\'s not very effective.';
      return 0.6;
    }
    break;

  case 'Earth':
    if (npc.element === 'Air') {
      effective = 'It\'s very effective!';
      return 1.2;
    }
    else if (npc.element === 'Fire') {
      effective = 'It\'s not very effective.';
      return 0.6;
    }
    break;

  case 'Fire':
    if (npc.element === 'Earth') {
      effective = 'It\'s very effective!';
      return 1.2;
    }
    else if (npc.element === 'Water') {
      effective = 'It\'s not very effective.';
      return 0.6;
    }
    break;

  case 'Air':
    if (npc.element === 'Water') {
      effective = 'It\'s very effective!';
      return 1.2;
    }
    else if (npc.element === 'Earth') {
      effective = 'It\'s not very effective.';
      return 0.6;
    }
    break;

  default:
    return 1;

  }
};

let npc_element_check = function () {
  switch (npc.element) {

  // water > fire
  // earth > air
  // fire > earth
  // air > water
  case 'Water':
    if (player_character.element === 'Fire') {
      effective = 'It\'s very effective!';
      return 1.2;
    }
    else if (player_character.element === 'Air') {
      effective = 'It\'s not very effective.';
      return 0.6;
    }
    break;

  case 'Earth':
    if (player_character.element === 'Air') {
      effective = 'It\'s very effective!';
      return 1.2;
    }
    else if (player_character.element === 'Fire') {
      effective = 'It\'s not very effective.';
      return 0.6;
    }
    break;

  case 'Fire':
    if (player_character.element === 'Earth') {
      effective = 'It\'s very effective!';
      return 1.2;
    }
    else if (player_character.element === 'Water') {
      effective = 'It\'s not very effective.';
      return 0.6;
    }
    break;

  case 'Air':
    if (player_character.element === 'Water') {
      effective = 'It\'s very effective!';
      return 1.2;
    }
    else if (player_character.element === 'Earth') {
      effective = 'It\'s not very effective.';
      return 0.6;
    }
    break;

  default:
    return 1;

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

//----------NPC TURN-----------------
let npc_turn = function () {
  //random generate number from 1 to 4
  let random_action = Math.floor((Math.random() * 4) + 1);

  //calculate base damage dealt to player
  let damage_dealt = Math.floor(((Math.random() * 20) + 10) * defend_check());
  console.log(damage_dealt);

  //resolve action results
  switch (random_action) {

  case 1:
    npc_message.innerHTML = `${npc.name} used a ${npc.language} attack to deal ${damage_dealt} damage. ${effective}`;
    player_character.health -= damage_dealt;
    round += 1;
    break;

  case 2:
    damage_dealt *= npc_element_check();
    console.log(damage_dealt);
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
  //check if battle is over
  battle_resolution();
  round_display.innerHTML = round;
};

//handler of battle logic
let buttonHandler = function (event) {

  //base damge calculator
  let damage_dealt = Math.floor(((Math.random() * 20) + 10) * defend_check());

  // switch to decide behavior based on button pressed
  switch (event.target.id) {

  case 'language':
    player_message.innerHTML = `${player_character.name} used a ${player_character.language} attack to deal ${damage_dealt} damage. ${effective}`;
    npc.health -= damage_dealt;
    break;

  case 'element':
    damage_dealt *= player_element_check();
    player_message.innerHTML = `${player_character.name} used a ${player_character.element} attack to deal ${damage_dealt} damage. ${effective}`;
    npc.health -= damage_dealt;
    break;

  case 'normal':
    player_message.innerHTML = `${player_character.name} used a ${player_character.normal} attack to deal ${damage_dealt} damage.`;
    npc.health -= damage_dealt;
    break;

  case 'defend':
    player_message.innerHTML = `${player_character.name} is defending,`;
    break;
  }

  battle_resolution();
  // see line 72 for npc_turn function declaration
  npc_turn();
  //see line ## for battle resoultion function
};


button_container.addEventListener('click', buttonHandler);
