# Challenge

Build a game of your choice using HTML, CSS and JavaScript.

## Context

I like to play Wordle. I don’t like that I can only play once a day. So I would like to create a clone that will remove the once per day limit for replay-ability.

### Game Rules

- The player has to guess a hidden word.
- Each guess must be a valid English word of the same length as the hidden word.
- After each guess, the game provides feedback on the correctness of the letters in the guessed word.
- Feedback typically consists of coloured tiles:
    - Green tiles indicate correct letters in the correct position.
    - Yellow tiles indicate correct letters but in the wrong position.
    - Grey tiles indicate letters that are not present in the hidden word.
- The player has a limited number of attempts (usually six) to guess the hidden word correctly.
- The game ends when the player correctly guesses the hidden word or exhausts all attempts.

### User Stories

- Player should be able to start a new game.
- Player should be able to input a letter guess and see if it is correct or incorrect.
- Player should only be able to enter an English word.
- Player should receive feedback on their guess, such as whether the letter is in the word (Yellow) and its correct position (Green), or if it's not in the word at all (Grey).
- Player should be able to see the letters they have guessed so far, along with their correctness, to help me make informed decisions for subsequent guesses.
- Player should receive a visual cue or indication when they’ve successfully guessed the entire word.
- Player should be able to see that the game came to an end either when they correctly guess the word or when they exhausted a predetermined number of attempts.
- Player should have the option to start a new game after completing or ending a game.

### Wireframe

![wireframe](img/wordle-wireframe.png)

### Screenshot

![screenshot](<img/Codle Screenshot2.png>)

### Roadmap

- Add functional keyboard to the game with tile colour display
- For scalability I can consider using [WordAPI](https://www.wordsapi.com/) which can generate up to 2,500 requests per Day
- Implementation of AI and blockchain because why not?