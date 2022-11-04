
console.log("Yo, I am alive!");

// Grab the div where we will put our Raphael paper
var centerDiv = document.getElementById("centerDiv");

// Create the Raphael paper that we will use for drawing and creating graphical objects
var paper = new Raphael(centerDiv);

// put the width and heigth of the canvas into variables for our own convenience
var pWidth = paper.width;
var pHeight = paper.height;
console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);
//---------------------------------------------------------------------

// Just create a background
var bgRect = paper.rect(0,0,pWidth, pHeight);
bgRect.attr({"fill": "#030B2A", "stroke" : "none"});

let randInt = function(m,n){
    range=n-m
    return Math.floor(m+=Math.random()*range) 
}

var cnt = 0
var cnt1 = 0
var grid = []
var numrow = pHeight/20
var numcol = pWidth/50
var pxWidth= 20	
var pxHeight = 20

var dataGrid = function(){
    while (cnt<numrow){
        grid[cnt] = []
        while (cnt1<numcol){
            grid[cnt][cnt1] = paper.rect(cnt1*pxWidth , cnt*pxHeight,pxWidth,pxHeight).attr({ 	//create pixel bg
                // "fill" : "white",
                "stroke" : "none",
            })	
            grid[cnt][cnt1].ypos = cnt1
            grid[cnt][cnt1].xpos = cnt
            grid[cnt][cnt1].space = "empty" //set the state of the squares
            grid[cnt][cnt1].color = "#5c5c8a"
            cnt1++
        }
    cnt1=0
    cnt++
    }

    return grid
}

var grid = dataGrid()

lineV =[]
lineV = function(count){
    lineV[count] = paper.path(`M${count*pxWidth} 0V0`).attr({"stroke" : "#77DF8A"})
    setTimeout(function(){lineV[count].animate({"path" : `M${count*pxWidth} 0V ${pxHeight*numrow}`}, 3000)}, count*300)
    // lineV[count].animate({"stroke": "#4FB9E3"},5000)
}

lineH=[]
lineH = function(count){
    lineH[count] = paper.path(`M0 ${count*pxHeight}`).attr({"stroke" : "#77DF8A"})
    setTimeout(function(){lineH[count].animate({"path" : `M0 ${count*pxHeight}H${pxWidth*numcol}`}, 300)}, count*150)
    // lineH[count].animate({"stroke": "#4FB9E3"},5000)
}

var cnt1 = 0
var cnt2 = 0

while (cnt1<numcol-1){
    cnt1++
    lineV(cnt1)
    // console.log(cnt1)
}

while (cnt2<numrow){
    cnt2++
    lineH(cnt2)
    // console.log(cnt2)
}

var cnt3 = 0
var ylist = []
var xlist = []
var highlight = 100

while (cnt3<highlight){
    xRandom = randInt(0,numcol-1)
    yRandom = randInt(0, numrow) 
    ylist.push(yRandom)
    xlist.push(xRandom)

    grid[yRandom][xRandom].animate({"fill" : "#4FB9E3"}, cnt3*250)

    var changeC = function(y,x){
        var count = cnt3
        if (count>40){count/=10}
        // if (count<0)(count+=2)
        var a = function(){
            grid[y][x].animate({"fill" : "#0E426D"}, count*100, b)
            // console.log("a is running)")
        }
        var b = function(){
            grid[y][x].animate({"fill" : "#77DF8A"}, 200, a)
            // console.log("b is running")
        }
        a()
    }
    changeC(yRandom,xRandom)
    cnt3++
}

// console.log(ylist)
// console.log(xlist)

cnt=0
cnt1=0
grid2 = [] 
var resultGrid = function(){
    while (cnt<numrow/3){
        grid2[cnt] = []
        while (cnt1<numcol){
            grid2[cnt][cnt1] = paper.circle((numcol+5)*pxWidth + (cnt1*pxWidth) , pHeight/3+(cnt*pxHeight),pxWidth/3).attr({ 	//create pixel bg
                "fill" : "#4FB9E3",
                "stroke" : "white",
            })	
            grid2[cnt][cnt1].ypos = cnt1
            grid2[cnt][cnt1].xpos = cnt
            grid2[cnt][cnt1].space = "empty" //set the state of the squares
            grid[cnt][cnt1].color = "#5c5c8a"
            cnt1++
        }
    cnt1=0
    cnt++
    }
    return grid2
}
var grid2 = resultGrid()

var cnt3 = 0
var ylist1 = []
var xlist1 = []
var highlight = 100

while (cnt3<highlight){
    xRandom = randInt(0,numcol-1)
    yRandom = randInt(0, numrow/3) 
    ylist1.push(yRandom)
    xlist1.push(xRandom)

    grid2[yRandom][xRandom].animate({"fill" : "#4FB9E3"}, cnt3*500)

    var changeC = function(y,x){
        var count = cnt3
        if (count>40){count/=10}
        // if (count<0)(count+=2)
        var a = function(){
            grid2[y][x].animate({"fill" : "#0E426D"}, count*300, b)
            // console.log("a is running)")
        }
        var b = function(){
            grid2[y][x].animate({"fill" : "red"}, 300, a)
            // console.log("b is running")
        }
        a()
    }
    changeC(yRandom,xRandom)
    cnt3++
}
console.log(ylist1)
console.log(xlist1)

lineC =[]
lineC = function(count){
    xpos1 = (xlist[count]-1) * pxWidth
    ypos1 = (ylist[count] * pxHeight) - pxHeight/2

    xpos2 = (xlist1[count]+numcol+6)*pxWidth 
    ypos2 = (ylist1[count] * pxHeight) + pHeight/3 - pxHeight/2

    lineC[count] = paper.path(`M${xpos1} ${ypos1}H${xpos2} V${ypos2}`).attr(
        {"stroke" : "none",
        "stroke-dasharray":"- ",
        "stroke-width" : 2})

        setTimeout(function(){lineC[count].animate({"stroke" : "red"}, 3000)}, count*1000)
    }

cnt6 = 0
while (cnt6<highlight){
    lineC(cnt6)
    cnt6++
}