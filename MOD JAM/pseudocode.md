# Pseudocode for Frogfrogfrog

setup()
    Create a 640x480 game window
    Initialize the frog, the fly, the score, and the timer
    Set the score to 5 at the start
    Load the best score if available
    Play the background music of nature
    Display the animated instruction screen with falling leaves
    Wait for the player to press SPACE to start the game

draw()
    Draw the background with moving clouds
    Move and draw all the flies
    Move the frog according to the mouse position
    Move and draw the frog’s tongue
    Check if the tongue overlaps any fly
    Draw the frog and its eyes
    Draw the score inside the frog
    Check for strike mode or game over conditions

moveFly()
    Move each fly forward with a curved flight path
    If a fly reaches the right edge of the screen
        Move it back to the left at a random height
        Randomize its size and color between light and dark green
        Give it a 50% chance to escape when attacked

drawFly()
    Draw a small circle for the fly’s body
    Draw wings on both sides
    Give it a buzzing sound that plays continuously

moveFrog()
    Set the frog’s horizontal position to the mouse position
    Make the frog’s eyes follow the nearest fly

moveTongue()
    If the tongue is idle
        Do nothing
    If the tongue is outbound
        Move it upward
        If it reaches the top of the screen
            Set its state to inbound
    If the tongue is inbound
        Move it downward
        If it reaches the frog’s body
            Set its state to idle

drawFrog()
    Draw a red circle at the tongue’s tip
    Draw a red line between the tongue and the frog’s body
    Draw the frog’s green circular body
    Draw the frog’s eyes that follow the flies

checkTongueFlyOverlap()
    If the tongue touches a fly
        If the fly does not escape
            Add points based on the fly’s size
            Big flies give 0.5 points
            Medium flies give 1 point
            Small flies give 3 points
            Move the fly back to the left at a random height
            Set the tongue state to inbound
        If the fly escapes
            Let it continue flying normally

mousePressed()
    If the tongue is idle
        Set the tongue state to outbound
        Play the frog tongue sound

DrawScore()
    Display the score inside the frog’s body in black text
    Keep updating it as flies are eaten
    Save and display the best score at the end of each game

updateTimer()
    Every second, reduce the timer by one
    Every five seconds, subtract one point from the score
    If the timer reaches zero
        End the game and go to the losing screen

checkStrikeConditions()
    If the player catches three small flies or fifteen total flies
        Start a strike mode

startStrike()
    Change the background to a more intense, faster-moving version
    Replace the music with strike music
    Give the frog focused eyebrows and sweat
    Make the flies move faster
    Make dangerous objects start falling from the sky
    Keep the strike active for thirty seconds

updateStrike()
    While the strike is active
        Decrease the strike timer
        Continue spawning falling objects
        If the player catches twenty-five flies during the strike
            Start a harder strike
    When the strike timer ends
        End the strike and return to normal gameplay

startHarderStrike()
    Play new intense music
    Make the frog sweat more and look determined
    Make the flies fly faster and less predictably
    Make more obstacles fall from the sky
    Keep the strike active for another thirty seconds

checkGameOver()
    If the timer reaches zero or the score reaches zero
        Stop the game
        Show the losing screen
        Play the losing music
        Save the score if it is higher than the best score

fallingObjects()
    Occasionally fall from the top of the screen
    If the frog is hit by one, subtract points
    During strikes, make them fall more often

background()
    Draw clouds moving in the same direction as the flies
    Make the clouds move faster as the flies move faster
    Keep the background with a natural theme and calm colors

soundEffects()
    Play frog sound when the tongue is used
    Play continuous buzzing for the flies
    Play nature background music during normal gameplay
    Play emote song at the start
    Play strike music during strike mode
    Play intense music during harder strikes
    Play losing music on game over

instructionsScreen()
    Show the title and animated leaves falling
    Display basic instructions on how to play
    Wait for the player to press SPACE to begin

menu()
    Display the animated instruction screen
    When SPACE is pressed
        Play an emote intro song
        Start the main game

gameOverScreen()
    Display “You Lose!” and the final score
    Show the best score achieved
    Play the losing music
    Allow the player to restart by pressing SPACE

summary()
    The frog moves with the mouse and uses its tongue to catch flies
    Flies move in curved paths, vary in color and size, and sometimes escape
    Points depend on the fly’s size
    The score decreases over time to keep tension
    After enough flies are caught, a strike begins with faster gameplay
    Falling objects appear that can remove points
    If the player catches enough flies during a strike, a harder strike begins
    The game ends when time or score runs out
    Music, visuals, and difficulty change dynamically throughout the game
