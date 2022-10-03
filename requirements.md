# Software Requirements

The software requirements for the Code Rivals game.

## Vision

### Product Vision
To provide a pokemon battle style game that allows for user character creation and learning about Code Fellows classmates.

### Pain Point
Classmates in our cohort will be spending a lot of time together and yet we don't know a lot about each other.

### Why Care?
This project delivers useful information about classmates at CF in an entertaining way.

## Scope

### IN

- The website will have an about us page that provides information about the team which can be useful in the game.
- The landing page will have a player creation form to make a fighter the player can use on the battle page.
- The battle page will have an interface similar to that of the Pokemon battle which allows the user character to fight against a roster of NPCs.
- There will be a high score section or page.

### Out

- This will not be an iOS or Android app.
- The game will only be turn-based, no navigation of a player character on a map.

## MVP

The user character is created, recalled through local storage on the battle page, a turn-based battle is conducted and resolved with a winner and loser. The about me page can be reviewed for information about the team.

Stretch goals: 
- There are animations or effects that result from user choices on the battle page.
- The player can take quizzes at some point about the team members which boosts their attributes.


## Functional Requirements

- User can create their character using the provided form.
- On the battle page, the user can choose from 4 actions and the NPC will randomly choose an action.
- Damage will be subtracted from the user and NPC health counter based on a semi-random algorithm.
- The battle will resolve when a character's health counter goes to zero.

## Data Flow

1. User inputs info on the form and presses submit.
2. Form input goes to a constructor that makes a user object which is saved in local storage.
3. On battle page, user attributes are retrieved from local storage and user character is rendered on screen.
(Steps 1-3 take place in parralel to create NPC objects and render them on the battle page)
4. Player choices are compared with internal logic and damage output is calculated and applied to computer character.
5. Computer action is randomly generated, resulting damage is calculated and applied to player character.
6. When a characters health goes to zero, the game ends. If the user won, their victory count is incremented and saved to local storage as well as displayed in the high score section.



