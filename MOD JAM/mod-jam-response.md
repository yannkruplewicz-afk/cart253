
# MOD JAM response


Lucas Meldrum
https://lucasmeldrum.github.io/CART253/topics/assignments/mod-jam

# Response to the work of Lucas Meldrum

I find the idea of having the final boss throwing bullets that damage the frog very interstig. I explored a similar concept in my game, by making eye drops fall from the sky and splash when touching the frog's body. The narrative elements also give the game a story.

The following code shows how this the dialogues were made, this is the part right before that the boss appears :

```javascript
 else if (fliesEaten === 3) {
      dialogue = "That's it! You've gone too far!";
      dialogueTimer = 120;
      resetFly();
 }
```
 The level of difficulty is also well chosen, it is possible to beat the final boss but not easy. You have lives and he has lives too, but each has a reasonable amount of lives. The 3 phases for the final boss are well chosen regarding the timing. They don't change depending on a chronometer but on the player's score. The sound effect when the boss appears is very intersting and recalls retro video games. The idea of showing the flies that the frog captured at the top left corner is also very original and shows us our progression. Finally, during the last level, the idea of having the flies attacking the frog is somewhat very surprising and unexpected !


This idea is expressed here, thanks to boss phases the are evoked through if conditionals. The flies attack the frog thanks to the 'summonFly' function.
```javascript
 else if (boss.phase === 3) {
    boss.shootCooldown--;
    if (boss.shootCooldown <= 0) {
      summonFly();
      boss.shootCooldown = 100;
    }
 }
```
And then, the 'moveSummonedFlies' function move them in the frog's direction thanks to variables as well as a 'for' loop and a const dist(ance) :
```javascript
function moveSummonedFlies() {
  for (let i = summonedFlies.length - 1; i >= 0; i--) {
    const f = summonedFlies[i];
    if (!f.active) continue;

    const dx = frog.body.x - f.x;
    const dy = frog.body.y - f.y;
    const distToFrog = dist(f.x, f.y, frog.body.x, frog.body.y);

    f.x += (dx / distToFrog) * f.speed;
    f.y += (dy / distToFrog) * f.speed;

    if (f.y > height) {
      summonedFlies.splice(i, 1);
    }
  }
}
```




Haolei Ma
https://mmmcarter.github.io/CART253-Fall-2025-/topics/mod-jam

# Response to the work of Haolei Ma

In this game, what i really like are the sounds effects which are really funny and made me laugh more than once. 

Here they are, the sounds effects that says a lot about themselves only by their names, loaded and ready to be used :
```javascript
function preload() {
    soundFormats('mp3', 'wav');
    slurpSound = loadSound('assets/sounds/slurp.mp3');
    laughSound = loadSound('assets/sounds/laugh.wav');
}
```
The sound when the frog deploys her tongue is so exagerrated ! But it works and makes the game very funny for the player. 

The following code shows the way it is played, each time a fly is eaten
```javascript
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        // Play slurp sound
        if (slurpSound && !slurpSound.isPlaying()) {
            slurpSound.play();
        }
    }
    }
```
    Moreover, when you do a streak, the frog laugh like a child. This is so unexpected ! The idea of chaning the direction of the flies is also smart. Most of us kept the basic design of the flies going from left to right, here it moves randomly, both horitontally and vertically while staying in the canvas. An another idea could have been to add different flies at the same time while the player seems used to the game. Some flies could then be "bad" or "pourished" flies.




Ya Xuan Pang
https://yaxuanpang.github.io/cart253/topics/mod-jam/

# Response to the work of Ya Xuan Pang

I really like the realistic aspect of this game. It totally contrasts with the previous game in which the frog was laughing like a child. Here it shows reality. It shows what's it's like being a frog. There are not only flies, there are other animals, and the time to catch them is not infinite. There are dangers : birds, starving to death, and the night. I like the small white button in the middle of the instructions screen which explains very well everything. It is also explicitely shown that the frog is in a river since the water seems to be blue as well as green, which makes the game even more reality based. The idea of adding different days is also very interesting. It makes me asking questions about how a frog's life is really like. 

The 'time passed' variable as follows is at the heart of the narrative and realistic aspects of the game :
```javascript
let timePassed = millis() - startTime;
```
Thanks to it, the background's color changes, becomig darker, the surroundings' animals' colors change and the frog's color change. It is also used to make the 'days' following each other. This game is my favourite, i was really surprised by this idea of representing the frog's daily life.