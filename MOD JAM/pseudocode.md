# Pseudocode for Frogfrogfrog

```
frog
    body
        x: 320 // Halfway across a 640x480 canvas
        y: 480 // Bottom of a 640x480 canvas
        size: 100 // Diameter of the frog circle
    tongue
        x: undefined // Will always match the body
        y: 480 // At the bottom (important to draw it BEHIND the frog)
        size: 20 // The tip of the tongue
        speed: 20 // Speed the tongue movies in pixels/second
        state: idle // At the start the tongue hasn't been launched

fly
    x: 0 // The left
    y: 200? // This will be a random position...
    size: 10 // Small?
    speed: 3 // How fast it moves across the screen

setup()
    Create a 640x480 canvas

draw()
    Draw the background // Probably just blue or something
    moveFly()
    drawFly()
    moveFrog()
    moveTongue()
    drawFrog()
    checkTongueFlyOverlap()

moveFly()
    add fly speed to fly x
    if (fly x is past the right side of the canvas)
        move the fly back to the left
        give the fly a random y position

drawFly()
    Draw a black circle at the fly's position with its size

moveFrog()
    Set the frog's x to the mouse x

moveTongue()
    Set tongue x to frog x
    if (tongue state is idle)
        Do nothing
    else if (tongue state is outbound)
        move the tongue up by its speed
        if (tongue hit the top)
            set the tongue state to inbound
    else if (tongue state is inbound)
        move the tongue down by its speed
        if (tongue hit the bottom)
            set the tongue state to idle

drawFrog()
    Draw a red circle at the tongue position with its size
    Draw a red line from the tongue position to the frog position
    Draw a green circle at the frog position with its size

checkTongueFlyOverlap()
    if (tongue circle overlaps the fly)
        Move the fly back to the left at a random y
        set the tongue state to inbound

mousePressed()
    if (tongue state is idle)
        set tongue state to outbound
        
        
        
20 ideas for MOD JAM


instructions screen ( animated )       DONE
leaves when you click at the screen    DONE

frog's eyes follow flies       , finally they just look more real.

best score saved.


    DrawScore()
1    //draws the score, different flies flies have different size and gives different numbers of points if eaten, so the player prefers to eat small ones which are also the harder ones
big ones = 0.5, medium ones = 1 and small ones = 3

2   // a streak as in duolingo should be added after having captured 3 small ones, or 15 flies in total which brings adrenaline and sticks the player to the screen, he doesn't want to stop playing

3   // the flies should have a curved trajectory, not just flying straight and going from point 50,x to point 50,y on the screen so that it is harder for the player and less repetitive

4   // once attacked at first, the flies should be able to escape, to avoid the first attack in 50% of the cases, not 100%. so the player doesn't know how they are going to react at all but can anticipate if it happens.

5   // the score could be placed in the frog itself so that is it visible ( black in light green ) as well as practical since it doesn't disturb the player from seeing the flies

6   // both the frog and the flies should have a themed design. Maybe they can be the frog and the flies from the future, the frog could have glasses through which we see big eyes , as well as a turn on / off button on her back that the player has to turn on at the beggining of the game using the 'space' touch.
The flies could have a variable that make their color change from light green to dark green as well as wings.

7   // the background should also have a design related to them, like clouds moving in the same sense as the flies, they would go faster as the flies go faster during the strikes

8   // the score loses 1 every 5 seconds to add more spice, so that if the player does nothing, he can loose

9   // the score begins at 5 at the start because i don't want the player to loose immediately

10  // a sound of frog when the tong is used to captivate different senses of the player

11  // continous sounds of flies to really show that the black dots are flies 

12  // background music of nature to give a context of nature 

13  // emote song when the game begins, after the beggining screen to make it more attractive and interactive

14  // emote song in case of strike to make the game more interactive and tell the player ' you're in fire man '

15  // when there is a strike, the borders of the screen become different as well as the frog and the flies
the frog now has focused eyebrows and sweets, we can see it in her face

16  // a new music is added during the strike to replace the nature background music

17  // a new music is also added when the player looses, leading him to the loser screen

18  // flies arrive faster during the strike

19  // the strike's duration is 30 secs. if the player catches 25 flies in this set of time, a new strike even harder happens, it's the hardest level
there, the frog's eyebrows are really focused , she also sweets a lot, this last strike takes place during 30 secs


21  // there is a timer, if player didn't reach x number of points before the 1 min is called, they lose, and it goes on and on.

22  // things fall from the sky and takes points away from the frog, during strikes they fall more often and are really dangerous.