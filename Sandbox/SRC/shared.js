

const NOTE_INDEX_KEY = "selectedStickyNoteIndex"
const NOTE_DATA_KEY = "stickyNoteData"
class Stickynote{

    constructor(id){
        this._id = id
        this._name = ""
        this._description = "";
        this._tag = [];
        this._priority = "";
        this._storypoint = "";
    }
    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get tag() {
        return this._tag;
    }

    set tag(value) {
        this._tag += value;
    }

    get priority() {
        return this._priority;
    }

    set priority(value) {
        this._priority = value;
    }

    get storypoint() {
        return this._storypoint;
    }

    set storypoint(value) {
        this._storypoint = value;
    }
    fromData(data){
        this._name = data._name;
        this._tag = data._tag;
        this._description= data._description;
        this._priority = data._priority;
        this._storypoint = data._storypoint;
        this._id = data._id
    }

}

class itemList {

    constructor() {
        this._notes = []
    }

    get stickynotes() {
        return this._notes;
    }

    get count() {
        return this._notes.length;
    }

    addstickynotes(id) {
        this._notes.push(new Stickynote(id));


    }
    fromData(data){
        let theData = data._notes;
        this._notes = [];
        for(let i = 0; i < theData.length; i++){
            let theStickynote = new Stickynote();
            theStickynote.fromData(theData[i]);
            this._notes.push(theStickynote);
        }
    }
}

function checkIfDataExistsLocalStorage(){
    if(getDataLocalStorage() == null){
        return false;
    }
    else{
        return true;
    }

}
function updateLocalStorage(data){
    localStorage.setItem(NOTE_DATA_KEY, JSON.stringify(data));
}
function getDataLocalStorage(){
    let retrieve = JSON.parse(localStorage.getItem(NOTE_DATA_KEY));
    return retrieve;
}
let itemlist = new itemList();

let toCheck = checkIfDataExistsLocalStorage();

if(toCheck === true){
    let theData = getDataLocalStorage();
    itemlist.fromData(theData);
}
else{
    let new_id = gen_ID()
    itemlist.addstickynotes(new_id); //create a locker with default id that is A001
    updateLocalStorage(itemlist);
}

function gen_ID(){
    let gen_id = Math.random() * 1000
    return gen_id
}
function displayNotes(data){
    let listnotes = '';
    for(let i = 0; i < data.count; i++) {
        listnotes += "<div class='demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col'><table class='mdl-data-table mdl-js-data-table' style='width: 100%;'><thead><tr><th class='mdl-data-table__cell--non-numeric mdl-cell--4-col'>Task 1</th><th style='text-align:right; padding-right: 0px;'><button id='task1' class='mdl-button mdl-js-button mdl-button--icon' style='Scale: 1;\'><i class='material-icons'>more_vert</i></button><ul class='mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect' htmlFor='task1'><li class='mdl-menu__item'>Edit Task</li><li class='mdl-menu__item'>Delete Task</li><li class='mdl-menu__item'>Move to Sprint 1</li><li disabled class='mdl-menu__item'>Disable button</li></ul></th></tr></thead><tbody onClick=''><tr style='width: 100%';><td style='text-align:left'>Description:</td><td style='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>Some description</td></tr><tr style='width: 100%;'><td style='text-align:left'>Tags:</td><td style='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>Some tag</td></tr><tr style='width: 100%;'><td style='text-align:left'>Priority:</td><td style='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>High</td></tr><tr style='width: 100%;'><td style='text-align:left'>Story Point:</td><td class='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>Some here</td></tr></tbody></table></div>"
    }

    let outputArea = document.getElementById("NoteDisplay");
    outputArea.innerHTML = listnotes;
}

displayNotes(itemlist)


