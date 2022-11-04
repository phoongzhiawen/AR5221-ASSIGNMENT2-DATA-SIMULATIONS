
console.log("Yo, I am alive!");

// Grab the div where we will put our Raphael paper
var centerDiv = document.getElementById("centerDiv");

// Create the Raphael paper that we will use for drawing and creating graphical objects
var paper = new Raphael(centerDiv);

// put the width and heigth of the canvas into variables for our own convenience
var pWidth = paper.width*0.95;
var pHeight = paper.height*0.95;
console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);
//---------------------------------------------------------------------

// Just create a nice black background
var bgRect = paper.rect(0,0,pWidth*2/3, pHeight);
bgRect.attr({"fill": "#BD8869", "stroke" : "none"});


let randInt = function(m,n){
    range=n-m
    return m+=Math.random()*range       //dont need to Math.floor it in this case to allow for more variety in speed changes through xrate and yrate
}


bgRect.node.addEventListener("click",function(ev){
    length = randInt(20,70)
    var disk = paper.rect(ev.offsetX, ev.offsetY, length, length, length/2);
    // console.log(disk)
    disk.attr({"fill": "#D8E3DD", "stroke" : "none"});

    // Add some properties to disk just to keep track of it's "state"
    disk.xpos= ev.offsetX ;
    disk.ypos= ev.offsetY ;
    disk.width = length ;
    disk.height = length ;
    disk.radius = length/2 ;
    disk.borderR = pWidth ;
    disk.borderL = 0 ;
    // Add properties to keep track of the rate the disk is moving
    disk.xrate=randInt(-10,20);
    disk.yrate=randInt(-10,20);

    var draw = function(){
        // console.log("disk pos is ["+disk.xpos + "," + disk.ypos + "]");
    
        // Update the position where we want our disk to be
        disk.xpos += disk.xrate;
        disk.ypos += disk.yrate;
    
        // Now actually move the disk using our 'state' variables
        disk.attr({'x': disk.xpos, 'y': disk.ypos});
    
        // keep the object on the paper
        if (disk.xpos > disk.borderL) {disk.xrate = -disk.xrate;}
        if (disk.ypos > pHeight) {disk.yrate = - disk.yrate};
        if (disk.xpos < disk.borderR) {disk.xrate = -disk.xrate;}
        if (disk.ypos < 0) (disk.yrate = - disk.yrate);

        if (disk.width<=50 && disk.height<=50) {
            disk.attr({"fill" : "#D8E3DD"})
        } else {
            if (disk.xpos > 2/3*pWidth){
                disk.attr({"fill" : "#C26C49", "stroke" : "white"})
        
            } else {
                disk.attr({"fill" : "#D8E3DD", "stroke" : "none"})      //when distance>100, change color back to colorstring
            }
        }

        var trace = paper.circle(ev.offsetX, ev.offsetY,3).attr(
            {"fill" : disk.attr("fill"), "stroke" : "none"});
        trace.xpos = disk.xpos+disk.width/2
        trace.ypos = disk.ypos+disk.height/2

        trace.xrate = disk.xrate
        trace.yrate = disk.yrate

        trace.xpos += trace.xrate
        trace.ypos += trace.yrate
        trace.attr({
            "cx" : trace.xpos,
            "cy" : trace.ypos
        })
        trace.animate({"fill" : "white"},3000,function(){trace.remove()})

    }

    // console.log(disk.attr("fill"))

    if (disk.xpos>2/3*pWidth && disk.radius>=0){
        disk.attr({"fill" : "#C26C49" , "r" : disk.radius})}

    var timesRun = 0;
    var interval = setInterval(function(){
        timesRun += 1;

        if(disk.attr("fill")==="#C26C49"){
            if (disk.xpos >2/3*pWidth && timesRun > 250){
                disk.borderL = 2/3*pWidth - length
                disk.borderR = pWidth
                if (timesRun%200===0){
                    disk.radius-=5
                    // console.log("disk radius is" + disk.radius)
                    disk.width += randInt(-5,20)
                    disk.height += randInt(-5,20)
                    disk.attr({"r" : disk.radius , "width" :  disk.width, "height" :  disk.height})

                    if (disk.radius<=length/2){
                        clearInterval(interval)}
                }
            }
        } else if (disk.attr("fill")==="#D8E3DD"){
            if (disk.xpos < 2/3*pWidth && timesRun>800){
                disk.borderR = 2/3 * pWidth
                disk.borderL = 0
            }

            if (timesRun > 2000){disk.remove()}
        }
            draw()}, 20); 
})

//------------------------------------------------------------------
