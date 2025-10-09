# ART JAM response

# Response to the work by Ya Xuan Pang
https://yaxuanpang.github.io/cart253/topics/art-jam

I find the idea of hidding icons in the canvas very original, the mouse acts as a lamp that reveals these elements where there since the beginning.
The eyes rotate perfectly too and the sky appears on the screen when we press the mouse, so even if the character in the middle is somehow simple, the program works and is very interctive. This work might symbolize everyday's thoughts and interests versus the calm of the dreams since we can see a character stood in the sky while pressing the mouse.
Regarding the program, the function 'move cover' as put below, is the core of this system of flashlight that i find really original.
The idea was represented usings Ifs that changes values of variables, very interesting.


function moveCover() {
    const d = dist(flashlight.x, flashlight.y, cover.x, cover.y);
    const overlap = (d < flashlight.size / 2 + cover.size / 2);
    if (overlap) {
        flashlight.fill = cover.fills.overlap;

        if (overlap && flashlight.x < (cover.x)) {
            cover.fill = "#00000000"; // if the flashlight and the cover overlaps then the cover turns transparent
        }

        if (overlap && flashlight.y < (cover.y)) {
            cover.fill = "#00000000"; // if the flashlight and the cover overlaps then the cover turns transparent
        }

        if (overlap && flashlight.y > (cover.y)) {
            cover.fill = "#00000000"; // if the flashlight and the cover overlaps then the cover turns transparent
        }

        if (overlap && flashlight.x > (cover.x)) {
            cover.fill = "#00000000"; // if the flashlight and the cover overlaps then the cover turns transparent
        }
    }
    else {
        cover.fill = "#0d4f4b"; // if there is no overlapping the color goes back to the original color
    }
}


The pupils' movements were also restricted so that they stay in the center of the eyebowls, which was done using the following variable :
  
    let maxOffset = eyeRadius - pupilRadius - 2;
    
Finally, the function "pupilOffset" make the movements of the eyes possible for the user when he moves the mouse using 'mouseX' and 'mouseY' which is very intersting altough it is not fully explained in the comments.



# Response to the work by Tasha Oest O Leary
https://mewmewpewpew.github.io/cart253/topics/art-jam

In this work, there is something that i find awesome which is the user interactivity ! The character has on purpose not been fully completed, hair is missing as well as 'makeup', although for me a mouth is also missing. Anyways, my point here is that it is not there, but we, as the spectators, have the possibility to draw it ourselves, to complete the character. I find this idea very original. The star that acts as a pen following the movements of the mouse is also very cool. Plus, it spins, which recall us that we HAVE to use it ! In the program, this idea of letting the viewer act on the character is even stated in the comments :"I also thought that something that kinda reprents me is my love for eyeliner and my creative use of it when I can. - so I made the user able to draw me one or just be creative.", and it works ! 

The lines of code i have found interesting are the following : 

const speechAlt ={
    x: 540,
    y: 770,
    x2: 580,
    y2: 790,
    fill: '#c2ffbcff',
    size: 100,
   //make the guy (me) say two things over time
    strs:{
        hey: 'Hello!!',
        text: 'I have no arm but still seak new\n makeup and hair or anything cool \n if you would be so kind to draw it \n   on me ♡ :3 ',
        
    } ,
}
    
The speech buble that we see in the program that litteraly tells us we can draw, i like this idea to actually talk to the viewer and tell him what he can do. This speech buble changes the meaning of the program because we are not destroying a portrait by making lines everywhere, as we should think if these lines were not there, here we are simply interacting on a property in which we are welcomed to try something and be creative.

# Response to the work by Camelia Pitsilis
https://cameliapitsilis-lgtm.github.io/cart253/art-jam

In this artwork, i really like the consistency. i did something similar in mine, adding shapes one by one, here it is the same process, each square was added to form a self portrait, we can see it in the program, with a long list of rectangle of same dimensions, but different places and colors. The interactivity here is made by changing the place of the pupil of the eyes as well as changing the background's color depending on where the mouse is located in the screen. It was made, as a consequence, using mouseX and mouseY.

In the program, what i find interesting is the eye movements. 

//EYE MOVEMENT
    let leftEyeX = constrain(mouseX, 200, 240)
    let rightEyeX = leftEyeX + 120;

    let leftEyeHighlightY = constrain(mouseY, 200, 220)
    let rightEyeHighlightY = leftEyeHighlightY
    
This is the formula that was used to make them move and as we look directly at the program itself. But what i find funny here is that it changes by square, so it's wheter top or bottom, as in old videos games or even minecrafts with the square world, and it works for sure !
    