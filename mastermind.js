
// Setting variables and let's
let colors = ["red", "blue", "yellow", "green"];
let row_number = 1;
let clicked = 0;
var solution = [];
var user_solution = []

// Initialisation of the solution
initialisation()
function initialisation () {
    random1_4();
}

// Returns the second class of an element
function get2ndClass(element) {
    return (element && element.classList.length>1) ? element.classList[1] : null;
}

// Checks if a circle already has a color if not gives it the first color of the colors array
// Checks the color number higher then 3 then resets the number to 0
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
    let row = "rij_" + row_number;
    div.id = row
    document.getElementById("rijen").appendChild(div);
    user_solution = [];

    let circle_number;
    for (circle_number = 1; circle_number < 5; circle_number++) {
        let circle = "g1_" + circle_number;
        let element = document.getElementById(circle);
        let color = get2ndClass(element);
        user_solution.push(color);
        createCircle(row_number, circle_number, color)
    }

    //console.log(user_solution)

    checkAnswer(row)
    // appendContent()
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
        solution.push (colors[color_number]);
    }
    return solution
}

// Toggle between showing the solution and not showing it
function toonOplossing () {


    if (clicked == 1) {
            // Not show solution
            removeSolutionColors();
        clicked--
    } else
        {
            // Shows solution
            showSolution();
            clicked++
    }
}

// Shows color of the solution
function showSolution () {
    for (i = 0; i < 4; i++) {
        let circle_number = i + 1
        let circle = "sol" + circle_number;
        let element = document.getElementById(circle);
        element.classList.add(solution[i]);
    }
}

// Removes colors of the solution
function removeSolutionColors () {
    for (i = 0; i < 4; i++)
    {
        let circle_number = i + 1
        let circle = "sol" + circle_number;
        let element = document.getElementById(circle);
        let secondClass = get2ndClass(element)
        element.classList.remove(secondClass);
    }
}

function checkAnswer( el_name) {

    let white = 0;
    let black = 0;
    let test_solution = solution.slice()
    for (i = 0; i < 4; i++) {

        if (test_solution[i] == user_solution[i]){
            black++
            user_solution[i] = "black"
            test_solution[i] = "null"
        }
    }

    for (i = 0; i < 4; i++) {

        if (test_solution.includes(user_solution[i])){
            white++
            let remove_color = user_solution[i]
            let remove_color_number = test_solution.indexOf(remove_color)
            user_solution[i] = "white"
            test_solution[remove_color_number] = "null"
        }
    }

    console.log(user_solution)
    console.log(solution)
    feedback(black, white, el_name);

}

// Shows dots that indicate how you've guessed
// 4 black dots means you've won
function feedback( black, white, el_name ) {

    if (black == 4) {

        for (i = 0; i < black; i++) {
            createDot("black", el_name)
        }
        showSolution()
        setNewGameButton()
        alert("You've won!")
    }
        else {
            for (i = 0; i < black; i++) {
                createDot("black", el_name)
            }
            for (i = 0; i < white; i++) {
                createDot("white", el_name)
            }
        }
}

function createDot (color , el_name) {

    let span= document.createElement("span");
    span.className = color;
    document.getElementById(el_name).appendChild(span);

}

// Toggle between check and new game button
function setNewGameButton() {

    let check = document.getElementById("check");
    let restart = document.getElementById("restart");

    check.style.display = "none";

    /* if (restart.style.display == "none") {
        check.style.display = "none";
        restart.style.display = "block";
    }
    else
        {
        check.style.display = "block";
        restart.style.display = "none";
    } */
}

// Removes the rows from the previous game
function removeOldRows() {

    let to_delete_rows = row_number + 1

    for (r = 2; r < to_delete_rows; r++){

        let row = "rij_" + r;
        let element = document.getElementById(row);
        element.parentNode.removeChild(element);
    }
}

function removeGuessColors () {
    for (i = 0; i < 4; i++)
    {
        let circle_number = i + 1
        let circle = "g1_" + circle_number;
        let element = document.getElementById(circle);
        let secondClass = get2ndClass(element)
        element.classList.remove(secondClass);
    }
}

function newGame(){
    removeSolutionColors()
    removeOldRows()
    removeGuessColors()
    row_number = 1;
    clicked = 0;
    solution = [];
    user_solution = []
    console.log(user_solution)
    console.log(solution)
    initialisation()
    console.log(solution)
}

