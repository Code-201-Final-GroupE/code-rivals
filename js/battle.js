'use strict';

//-----------------GLOBAL VARIABLES

//character variables
let player_character = JSON.parse(localStorage.getItem('player-character'));
let npc_array = JSON.parse(localStorage.getItem('npc_array'));
let npc;

//DOM variables
let round_display = document.getElementById('Round');
let npc_message = document.getElementById('npc-message');
let player_message = document.getElementById('player-message');
let player_prompt = document.getElementById('player-prompt');

let language_button = document.getElementById('action-one');
let element_button = document.getElementById('action-two');
let normal_button = document.getElementById('action-three');
let defend_button = document.getElementById('action-four');

let button_container = document.getElementById('button-container');

//other default variables
let round = 1;
//-----------------PAGE LOAD EVENTS--------------

window.onload = (event) => {
  //set the current round display to default
  round_display.innerHTML = round;
  //randomly pick an npc from the array

  let npc_index = Math.floor(Math.random() * npc_array.length);
  let npc = npc_array[npc_index];
  console.log(npc);

  //reminder to render player image
  //reminder to render npc image

  //display npc and character messages
  npc_message.innerHTML = npc.startQuote;
  player_message.innerHTML = player_character.startQuote;

  //set player prompt text
  player_prompt.innerHTML = `What will ${player_character.name} do?`;

  //set button text
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

let buttonHandler = function (event) {
  // switch to decide behavior based on button pressed

  let damage_dealt = Math.floor((Math.random() * 20) + 10);

  switch (event.target.id) {

  case 'language':
    player_message.innerHTML = `${player_character.name} used a ${player_character.language} attack to deal ${damage_dealt} damage.`;
    npc.health -= damage_dealt;
    break;

  case 'element':
    player_message.innerHTML = `${player_character.name} used a ${player_character.element} attack to deal ${damage_dealt} damage.`;
    npc.health -= damage_dealt;
    break;

  case 'normal':
    player_message.innerHTML = `${player_character.name} used a ${player_character.normal} attack to deal ${damage_dealt} damage.`;
    npc.health -= damage_dealt;
    break;

  case 'defend':
    player_message.innerHTML = `${player_character.name} is defending,`;

  }
};

button_container.addEventListener('click', buttonHandler);

