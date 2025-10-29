
# Planning

## Starting point

The initial idea:

> Frog eating flies

---

## Experience design

The experience:

> The user controls a frog at the bottom of the screen.
> They can shoot out the frog's tongue and catch a fly that moves across the screen.
> If the tongue hits the fly, it gets eaten.
> Over time, music, difficulty, and visuals evolve — creating a living, fun, and challenging experience.

---

## Breaking it down

Basic things to do:

* Draw the frog (image? a circle?)
* Draw the tongue
* Move the frog (how? mouse? keyboard?)
* Move the fly (straight line? curved? random?)
* Detect tongue–fly overlap

---

### Questions

* **What does the frog look like?**

  * Circles for simplicity
  * Futuristic design: big eyes, glowing edges, power button on its back
  * Eyes follow the flies

* **How does the user control the frog?**

  * The frog follows the mouse horizontally
  * The tongue launches when the player clicks

* **How does the fly move?**

  * Starts from the left at random y-position
  * Moves right in a curved path
  * Random speed and size
  * Color changes from light to dark green
  * 50% chance to escape on first attack

* **What does the tongue look like?**

  * Red line from the frog upward
  * Small red circle at the tip

* **What happens if the frog misses?**

  * The fly exits right and reappears on the left with a new random position

* **Layout**

  * Frog sits at the bottom center
  * Flies move across the top and middle areas
  * Tongue shoots vertically

---

## The program starts to form...

### What is there?

* **Frog**

  * Body position and size
  * Tongue position, speed, and state (idle, outbound, inbound)

* **Fly**

  * Position, speed, and size
  * Color and escape chance

* **Score**

  * Current score
  * Best score (saved)
  * Score decay and bonuses

* **Timer**

  * Limits total playtime
  * Used for strikes and end-game conditions

* **Background**

  * Animated clouds
  * Music and ambient sounds

* **Strike system**

  * Intense mode triggered by performance
  * Visual, audio, and speed changes

* **Falling hazards**

  * Appear during strikes
  * Reduce score if they hit the frog

---

### Basic structure

```
frog
    body
        x
        y
        size
    tongue
        x
        y
        size
        speed
        state

fly
    x
    y
    size
    speed
```

---

## What happens in this project?

### Start (setup)

* Create a 640x480 canvas
* Initialize frog, fly, score, and timer
* Display animated instruction screen with falling leaves
* Wait for SPACE key to start
* Play background music of nature
* Load best score

---

### Every frame (draw)

* Draw background and moving clouds
* Move and draw the fly

  * Add fly’s speed to its x
  * Apply curved vertical motion
  * If off-screen, reset position and color
* Move and draw the frog

  * Set frog’s x to mouse x
  * Eyes follow the nearest fly
* Move and draw the tongue

  * If idle → do nothing
  * If outbound → move upward by speed

    * If hits top → switch to inbound
  * If inbound → move downward by speed

    * If hits bottom → return to idle
* Check if the tongue overlaps a fly

  * If overlap → eat fly, add score, retract tongue
  * 50% chance fly escapes instead
* Update score and timer

  * -1 point every 5 seconds
  * Score starts at 5
* Check for strikes or game over
* Draw interface elements

  * Frog, tongue, flies, score (inside frog), and timer

---

## Game logic details

### moveFly()

* Add fly speed to x
* Apply curved motion to y
* If fly x > canvas width

  * Reset x to 0
  * Set random y position, color, and size

### drawFly()

* Draw small circle with wings
* Fly buzzing sound loops continuously

### moveFrog()

* Set frog x to mouse x
* Eyes follow fly positions

### moveTongue()

* Set tongue x to frog x
* If idle → do nothing
* If outbound → move tongue up by speed

  * If tongue hits top → set state to inbound
* If inbound → move tongue down by speed

  * If tongue hits bottom → set state to idle

### drawFrog()

* Draw a red circle at the tongue position
* Draw a red line from tongue to frog
* Draw a green circle at frog’s position
* Draw eyes looking toward the nearest fly

### checkTongueFlyOverlap()

* If tongue circle overlaps fly

  * If fly doesn’t escape

    * Add score: big = +0.5, medium = +1, small = +3
    * Reset fly position
    * Retract tongue
  * Else → fly escapes and continues

---

## Scoring system

* Score begins at 5
* -1 point every 5 seconds
* Big fly = +0.5
* Medium fly = +1
* Small fly = +3
* Best score saved locally

---

## Strike mode

### Start conditions

* Triggered when:

  * 3 small flies caught, **or**
  * 15 total flies caught

### Effects

* Background and music change
* Frog gains focused eyebrows and sweat
* Flies move faster
* Falling objects appear and can remove points
* Frog and fly visuals shift for intensity
* Score multiplier applied
* Lasts 30 seconds

### Second strike (hard mode)

* Triggered if 25 flies caught during first strike
* Music changes again
* Frog looks fierce, sweats more
* Background darker and faster clouds
* More falling hazards
* Lasts 30 seconds

---

## Audio and visuals

* **Frog sound** when tongue launches
* **Continuous fly buzzing**
* **Nature background music** for calm gameplay
* **Strike music** replaces background during strike
* **Victory/defeat music** for transitions
* **Intro theme** on title screen

---

## Game flow

1. **Instruction screen**

   * Animated intro with falling leaves
   * “Press SPACE to start” message
   * Background music starts

2. **Gameplay begins**

   * Frog and flies appear
   * Score set to 5
   * Timer starts (1 minute)

3. **During play**

   * Flies fly in curves
   * Player clicks to catch them
   * Score and timer update
   * Possible strike activation

4. **Strike mode**

   * New music and effects
   * Faster movement and hazards

5. **Hard strike (if reached)**

   * Most intense version
   * Shorter reaction times
   * 30 seconds duration

6. **Game over**

   * If timer ends or score ≤ 0
   * Show losing screen
   * Play end music
   * Display best score

---

## Events

* **mousePressed()**

  * If tongue state = idle

    * Set tongue state to outbound
    * Play frog sound

* **spacePressed()**

  * If at start screen

    * Start the game

* **onTongueFlyHit()**

  * If fly doesn’t escape

    * Add score
    * Retract tongue
  * Else → let fly escape

* **onScoreUpdate()**

  * Decrease by 1 every 5 seconds

* **onTimerEnd()**

  * If time runs out

    * End game
    * Show losing screen
    * Play defeat music

* **onStrikeTriggered()**

  * Change visuals
  * Increase fly speed
  * Change background music

* **onStrikeEnd()**

  * Revert to normal state
  * Resume nature background music

---
