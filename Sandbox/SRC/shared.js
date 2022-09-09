

const NOTE_DATA_KEY = "stickyNoteData"
class Stickynote{
    constructor(id){
        this._id = id;
        this._editId = gen_ID();
        this._deleteId = gen_ID();
        this._buttonId = gen_ID();
        this._name = "";
        this._description = "";
        this._tag = [];
        this._priority = "";
        this._storypoint = "";
    }

    get id() {
        return this._id;
    }

    get editId() {
        return this._editId;
    }

    get deleteId() {
        return this._deleteId;
    }

    get buttonId() {
        return this._buttonId;
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
        this._tag = value;
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


    get count() {
        return this._notes.length;
    }

    addstickynotes(Stickynote) {
        this._notes.push(Stickynote);

    }
    deletestickynotes(id){
        for(let i = 0;i < this._notes.length;i++){
            if(id==this._notes[i].deleteId){
                this._notes.splice(i,1);
            }
        }

    }
    getNote(id){
        for(let i = 0;i < this._notes.length;i++){
            if(id==this._notes[i].id){
                return this._notes[i]
            }
        }
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


function gen_ID(){
    let gen_id = Math.random() * 1000
    return gen_id
}
function displayNotes(data){
    let listnotes = '';
    for(let i = 0; i < data.count; i++) {
        //let id = data._notes.id
        listnotes += "<div class='demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col' draggable='true' ondragstart='drag(event)'id = "+data._notes[i].id+"><table class='mdl-data-table mdl-js-data-table' style='width: 100%;'><thead><tr><th class='mdl-data-table__cell--non-numeric mdl-cell--4-col'>"+data._notes[i].name+"</th><th style='text-align:right; padding-right: 0px;'><button id="+data._notes[i].buttonId+" class='mdl-button mdl-js-button mdl-button--icon' style='Scale: 1;\'><i class='material-icons'>more_vert</i></button><ul class='mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect' for="+data._notes[i].buttonId+"><li class='mdl-menu__item'>Edit Task</li><li id="+data._notes[i].deleteId+" class='mdl-menu__item' onclick='deleteTask(this.id)'>Delete Task</li><li class='mdl-menu__item'>Move to Sprint 1</li><li disabled class='mdl-menu__item'>Disable button</li></ul></th></tr></thead><tbody onClick=''><tr style='width: 100%;'><td style='text-align:left'>Tags:</td><td style='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>"+data._notes[i].tag+"</td></tr><tr style='width: 100%;'><td style='text-align:left'>Priority:</td><td style='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>"+data._notes[i].priority+"</td></tr><tr style='width: 100%;'><td style='text-align:left'>Story Point:</td><td class='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>"+data._notes[i].storypoint+"</td></tr><tr style='width: 100%';><td style='text-align:Left' onclick=''>Click Here to Expand</td></tr></tbody></table></div>"

    }

    let outputArea = document.getElementById("NoteDisplay");
    outputArea.innerHTML = listnotes;
}

displayNotes(itemlist)


function addTask(){
    let task_name = document.getElementById('task_name');
    let task_description = document.getElementById('task_description');
    let task_tags = document.getElementById('task_tags');
    let task_priority = document.getElementById('task_priority');
    let task_storypoint = document.getElementById('task_story_point');


    let task = new Stickynote(gen_ID())
    task.description = task_description.value;
    task.name = task_name.value;
    task.tag =task_tags.value;
    task.priority =task_priority.value;
    task.storypoint = task_storypoint.value;
    itemlist.addstickynotes(task)
    updateLocalStorage(itemlist)
    window.location = "index.html"


}
function deleteTask(id){
    let toConfirm = confirm("Press OK to delete this task.") //to confirm if the user want to delete the locker
    if (toConfirm===true){ //if it's true
        console.log(id)
        itemlist.deletestickynotes(id);
        updateLocalStorage(itemlist);
        alert("This task has been deleted.");
        window.location="index.html";
    }   //if the user do not confirm, do nothing

}
function expand(id){
    let displayoutput = "";
    let note = itemlist.getNote(id);
}

function allowDrop(ev) {
    ev.preventDefault();
    }
    function drag(ev) {
        // Text plain refers to the data type (DOMString) of the object being dragged
        // ev.target.id is the id of the object being dragged
        ev.dataTransfer.setData("text/plain", ev.target.id);

    }
    function drop(ev) {
        ev.preventDefault();
        let sourceId = ev.dataTransfer.getData("text/plain");
        let sourceIdEl = document.getElementById(sourceId);
        let sourceIdParentEl = sourceIdEl.parentElement;
        let targetEl = document.getElementById(ev.target.id);
        let targetParentEl = targetEl.parentElement;

        if (targetParentEl.id !== sourceIdParentEl.id) {
            if (targetEl.className === sourceIdEl.className) {
                targetParentEl.appendChild(sourceIdEl);

            } else {
                targetEl.appendChild(sourceIdEl)
            }
        } else {
            let holder = targetEl;
            let holderText = holder.textContent;
            targetEl.textContent = sourceIdEl.textContent;
            sourceIdEl.textContent = holderText;
            holderText = ''
        }
    }

/*
function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
} */



function new_display(){
    filter_value = document.getElementById("filterId").value;
    if(filter_value=="UI CORE"){
        UICORE(itemlist);
    }
    else if(filter_value =="TESTING"){
        TESTING(itemlist);
    }
    else{
        displayNotes(itemlist);
    }

}

function UICORE(data){
    let filterNotes = '';
    for(let i = 0; i < data.count; i++) {
        if(data._notes[i].tag=="UI CORE") {
            filterNotes += "<div class='demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col' draggable='true' ondragstart='drag(event)'id = "+data._notes[i].id+"><table class='mdl-data-table mdl-js-data-table' style='width: 100%;'><thead><tr><th class='mdl-data-table__cell--non-numeric mdl-cell--4-col'>"+data._notes[i].name+"</th><th style='text-align:right; padding-right: 0px;'><button id="+data._notes[i].buttonId+" class='mdl-button mdl-js-button mdl-button--icon' style='Scale: 1;\'><i class='material-icons'>more_vert</i></button><ul class='mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect' for="+data._notes[i].buttonId+"><li class='mdl-menu__item'>Edit Task</li><li id="+data._notes[i].deleteId+" class='mdl-menu__item' onclick='deleteTask(this.id)'>Delete Task</li><li class='mdl-menu__item'>Move to Sprint 1</li><li disabled class='mdl-menu__item'>Disable button</li></ul></th></tr></thead><tbody onClick=''><tr style='width: 100%;'><td style='text-align:left'>Tags:</td><td style='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>"+data._notes[i].tag+"</td></tr><tr style='width: 100%;'><td style='text-align:left'>Priority:</td><td style='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>"+data._notes[i].priority+"</td></tr><tr style='width: 100%;'><td style='text-align:left'>Story Point:</td><td class='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>"+data._notes[i].storypoint+"</td></tr><tr style='width: 100%';><td style='text-align:Left' onclick=''>Click Here to Expand</td></tr></tbody></table></div>"
        }
    }
    let outputArea = document.getElementById("NoteDisplay");
    outputArea.innerHTML = filterNotes;
}
function TESTING(data){
    let filterNotes = '';
    for(let i = 0; i < data.count; i++) {
        if(data._notes[i].tag=="TESTING") {
            filterNotes += "<div class='demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col' draggable='true' ondragstart='drag(event)'id = "+data._notes[i].id+"><table class='mdl-data-table mdl-js-data-table' style='width: 100%;'><thead><tr><th class='mdl-data-table__cell--non-numeric mdl-cell--4-col'>"+data._notes[i].name+"</th><th style='text-align:right; padding-right: 0px;'><button id="+data._notes[i].buttonId+" class='mdl-button mdl-js-button mdl-button--icon' style='Scale: 1;\'><i class='material-icons'>more_vert</i></button><ul class='mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect' for="+data._notes[i].buttonId+"><li class='mdl-menu__item'>Edit Task</li><li id="+data._notes[i].deleteId+" class='mdl-menu__item' onclick='deleteTask(this.id)'>Delete Task</li><li class='mdl-menu__item'>Move to Sprint 1</li><li disabled class='mdl-menu__item'>Disable button</li></ul></th></tr></thead><tbody onClick=''><tr style='width: 100%;'><td style='text-align:left'>Tags:</td><td style='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>"+data._notes[i].tag+"</td></tr><tr style='width: 100%;'><td style='text-align:left'>Priority:</td><td style='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>"+data._notes[i].priority+"</td></tr><tr style='width: 100%;'><td style='text-align:left'>Story Point:</td><td class='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>"+data._notes[i].storypoint+"</td></tr><tr style='width: 100%';><td style='text-align:Left' onclick=''>Click Here to Expand</td></tr></tbody></table></div>"
        }
    }
    let outputArea = document.getElementById("NoteDisplay");
    outputArea.innerHTML = filterNotes;
}
