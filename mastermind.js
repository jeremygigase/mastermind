
// Initialisation variables and let's
let colors = ["red", "blue", "yellow", "green"];
let row_number = 1;
let clicked = 0;
var oplossing = [];

// Returns the second class of an element
function get2ndClass(element) {
    return (element && element.classList.length>1) ? element.classList[1] : null;
}

// Checks if a circle already has a color if not gives it the first color of the colors array
// Checks the color number higher then 3 thrn resets the number to 0
// In both cases it gets sent to the function setBGcolor
function processClick(id) {

    let element = document.getElementById(id);
    if (element.className == 'circle'){
        element.classList.add("red")
    } else {
        var color = get2ndClass(element);
        var color_number = colors.indexOf(color);

        if (color_number > 3) {
            color_number = 0;
            setBGColor(element, color_number);
        } else {
            setBGColor(element, color_number);
        }
    }
}

// Checks what the previous color was
// Then replaces it with the next one in the colors array
function setBGColor (element , color_number){

    let color = colors[color_number];
    let new_color_number = color_number + 1;
    let new_color = colors[new_color_number];

    if (element.classList.contains(color)){
        return element.classList.replace(color,new_color);
    }
}

// Adds a new row with the colors the user gave
function newRow (){
    row_number++;
    let div = document.createElement("div");
    div.id = "rij_" + row_number;
    document.getElementById("rijen").appendChild(div);


    let circle_number;
    for (circle_number = 1; circle_number < 5; circle_number++) {
        let circle = "g1_" + circle_number;
        let element = document.getElementById(circle);
        let color = get2ndClass(element);
        createCircle(row_number, circle_number, color)
    }

}


// Creates a circle with the right color
function createCircle (row_number, circle_number,color){

    let row = "rij_" + row_number;
    let div = document.createElement("div");
    div.id = "g" + row_number + "_" + circle_number;
    div.className = "circle";
    div.classList.add(color);
    document.getElementById(row).appendChild(div);
}

// Creates 4 random numbers which will be used to choose the 4 random colors
function random1_4(){

    for (i = 1; i < 5; i++) {
        var color_number = Math.floor(Math.random() * 4);
        oplossing.push (colors[color_number]);
    }
    return oplossing
    //console.log(oplossing)
}

// Toggle between showing the solution and not showing it
function toonOplossing () {

    // document.write(oplossing)
    if (clicked == 1) {
        //document.getElementById("message").innerHTML = "Already showed solution!";
        for (i = 0; i < 4; i++) {
            let circle_number = i + 1
            let circle = "sol" + circle_number;
            let element = document.getElementById(circle);
            let secondClass = get2ndClass(element)
            element.classList.remove(secondClass);
            //document.getElementById("message").style.display="block"
        }
        clicked--
    } else {
        var oplossing = random1_4();
        for (i = 0; i < 4; i++) {
            let circle_number = i + 1
            let circle = "sol" + circle_number;
            let element = document.getElementById(circle);
            element.classList.add(oplossing[i]);
            //document.write(oplossing[i])
        }
        clicked++
    }
}

function appendContent( el_name, new_content ) {

}

function feedback( black, white ) {

}