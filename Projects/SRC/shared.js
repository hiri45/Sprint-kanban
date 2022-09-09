

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
        this._assignee = "";
        this.type = [];
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

    get type() {
        return this._type;
    }

    set tag(value) {
        this._tag = value;
    }

    set type(value) {
        this._type = value;
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

    get assignee(){
        return this._assignee;
    }

    set assignee(value) {
        this._assignee = value;
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
        this._id = data._id;
        this._type = data._type;
        this._assignee = data._assignee;
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
            if(id==this._notes[i].id){
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
    /*
    the display notes function is what presents the task in the stickynote format on the product backlog when it has been added
    the items displayed on the note include: the name, tag, type, priority and story point
    there are buttons on the note which prompts the user to: expand, edit, delete and move to sprint
    :argument
        data: data is used as an input to get all the specific information
    */
    let listnotes = '';
    for(let i = 0; i < data.count; i++) {
        let id = data._notes.id
        listnotes += "<div class='demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col'><table class='mdl-data-table mdl-js-data-table' style='width: 100%;'><thead><tr><th class='mdl-data-table__cell--non-numeric mdl-cell--4-col'>"+data._notes[i].name+"</th><th style='text-align:right; padding-right: 0px;'><button id="+data._notes[i].id+" class='mdl-button mdl-js-button mdl-button--icon' style='Scale: 1;\'><i class='material-icons'>more_vert</i></button><ul class='mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect' for="+data._notes[i].id+"><li class='mdl-menu__item'onclick = 'editTask("+data._notes[i]._id+")'>Edit Task</li><li id="+data._notes[i].id+" class='mdl-menu__item' onclick='deleteTask("+data._notes[i].id+")'>Delete Task</li><li class='mdl-menu__item'>Move to Sprint 1</li><li disabled class='mdl-menu__item'>Disable button</li></ul></th></tr></thead><tbody onClick=''><tr style='width: 100%;'><td style='text-align:left'>Tags:</td><td style='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>"+data._notes[i].tag+"</td></tr><tr style='width: 100%;'><td style='text-align:left'>Type:</td><td style='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>"+data._notes[i].type+"</td></tr><tr style='width: 100%;'><td style='text-align:left'>Priority:</td><td style='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>"+data._notes[i].priority+"</td></tr><tr style='width: 100%;'><td style='text-align:left'>Story Point:</td><td class='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>"+data._notes[i].storypoint+"</td></tr><tr style='width: 100%;'><td style='text-align:left'>Assignee:</td><td style='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>"+data._notes[i].assignee+"</td></tr><tr style='width: 100%';><td style='text-align:Left' onclick='expand("+data._notes[i]._id+")'>Click Here to Expand</td></tr></tbody></table></div>"

    }

    let outputArea = document.getElementById("NoteDisplay");
    outputArea.innerHTML = listnotes;
}

displayNotes(itemlist)


function addTask(){
    /*
    this function is used to add the task onto the product backlog
    */

    // gets each element needed for the task
    let task_name = document.getElementById('task_name');
    let task_description = document.getElementById('task_description');
    let task_tags = document.getElementById('task_tags');
    let task_priority = document.getElementById('task_priority');
    let task_storypoint = document.getElementById('task_story_point');
    let task_type = document.getElementById('task_type');
    let task_assignee = document.getElementById('task_assignee');


    let task = new Stickynote(gen_ID())  // creates task using Stickynote class
    task.description = task_description.value;
    task.name = task_name.value;
    task.tag =task_tags.value;
    task.type = task_type.value;
    task.priority =task_priority.value;
    task.storypoint = task_storypoint.value;
    task.assignee = task_assignee.value;
    // adds the task onto the itemlist which is then used to update local storage
    itemlist.addstickynotes(task)
    updateLocalStorage(itemlist)
    window.location = "index.html"  // takes user back to the index page once task has been added

}
function deleteTask(id){
    /*
     this function deletes the task from the product backlog and updates the local storage by deleting the id from the itemlist
     :argument
        id: id is used to get the specific note in which user wants to delete from page as well as local storage
    */
   console.log(id);
    let toConfirm = confirm("Press OK to delete this task.") //to confirm if the user want to delete the locker
    if (toConfirm===true){ //if it's true
       itemlist.deletestickynotes(id);
       updateLocalStorage(itemlist);
       alert("This task has been deleted.");
       window.location="index.html";
    } //if the user do not confirm, do nothing

}

let detail_dialog=document.getElementById("tableDetailID"); // dialog id used as a global since it used in both expand and closeDialog function
function expand(id){
    /* 
    the expand function creates a dialog box which is an expanded version of the task
    the expanded version displays all the information across the screen for that task as well as the description for the task
    :argument
        id: id is used to get specific note in which user wants to expand
     */
    let detail_note = itemlist.getNote(id); 

    let detail_desc=document.getElementById("detail_description");
    let expand_tag = document.getElementById("expand_tag");
    let expand_priority = document.getElementById("expand_priority");
    let expand_sp = document.getElementById("expand_story");
    let expand_name = document.getElementById("expand_name")
    let expand_type = document.getElementById("expand_type");
    let expand_assignee = document.getElementById("expand_assignee");

    expand_name.innerHTML = detail_note.name
    detail_desc.innerHTML= detail_note.description
    expand_tag.innerHTML = detail_note.tag
    expand_priority.innerHTML = detail_note.priority
    expand_sp.innerHTML = detail_note.storypoint
    expand_type.innerHTML = detail_note.type
    expand_assignee.innerHTML = detail_note.assignee

    detail_dialog.showModal(); // creates the dialog popup
}

function closeDialog() {
    /*
    this function closes the dialog when the button is clicked
    */
    detail_dialog.close();
}

let editing_task = document.getElementById("edit_task") // used as a global since used in editTask function and closeEdit function
function editTask(id) {
    /*
    this function is a dialog popup which allows the user to edit the data within a specific note
    :arguments
        id: id is used to get the specific note in which the user wants to edit
    */
    note_to_edit = itemlist.getNote(id); // get note function used to get specific note with id

    let desc_edit = document.getElementById("edit_task_description");
    let name_edit = document.getElementById("edit_task_name");
    let sp_edit = document.getElementById("edit_task_storypoint");
    let tag_edit = document.getElementById("edit_task_tags");
    let edit_priority = document.getElementById("edit_task_priority");
    let edit_type = document.getElementById("edit_task_type");
    let edit_assignee = document.getElementById("edit_assignee");
    // id used if user wants to submit an edited note
    let submit_button = document.getElementById("submit_button"); 
    let form_button="<button id ='submit_button' type='button' class='mdl-button' onclick = 'submitEdit("+id+");'>submit</button>"; // HTML used to pass through submitEdit() function
    
    submit_button.innerHTML = form_button;

    desc_edit.value = note_to_edit.description
    name_edit.value = note_to_edit.name
    sp_edit.value = note_to_edit.storypoint
    edit_assignee.value = note_to_edit.assignee
    tag_edit.value = note_to_edit.tag
    edit_priority.value = note_to_edit.priority
    edit_type.value = note_to_edit.type

    editing_task.showModal();
}
function closeEdit() {
    /*
    this function is used to close the edit dialog if user does not want to edit note
    */
    editing_task.close()
}

function submitEdit(id) {
    /*
    this function submits an edited task to the project backlog as well as updating the local storage with the edited data.
    :input
        id: id used to get specific note to edit
    */

    let note_to_edit = itemlist.getNote(id);

    let submit_desc=document.getElementById("edit_task_description");
    let submit_tag = document.getElementById("edit_task_tags");
    let submit_priority = document.getElementById("edit_task_priority");
    let submit_sp = document.getElementById("edit_task_storypoint");
    let submit_name = document.getElementById("edit_task_name");
    let submit_type = document.getElementById("edit_task_type");
    let submit_assignee = document.getElementById("edit_assignee");
    // note to edit is changed with edited values
    note_to_edit.description = submit_desc.value;
    note_to_edit.tag = submit_tag.value;
    note_to_edit.priority = submit_priority.value;
    note_to_edit.storypoint = submit_sp.value;
    note_to_edit.name = submit_name.value;
    note_to_edit.type = submit_type.value;
    note_to_edit.assignee = submit_assignee.value;

    updateLocalStorage(itemlist); // updates itemlist with edited data
    window.location = "index.html"  // takes user back to the index page once task has been added
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
            filterNotes +=  "<div class='demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col'><table class='mdl-data-table mdl-js-data-table' style='width: 100%;'><thead><tr><th class='mdl-data-table__cell--non-numeric mdl-cell--4-col'>"+data._notes[i].name+"</th><th style='text-align:right; padding-right: 0px;'><button id="+data._notes[i].id+" class='mdl-button mdl-js-button mdl-button--icon' style='Scale: 1;\'><i class='material-icons'>more_vert</i></button><ul class='mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect' for="+data._notes[i].id+"><li class='mdl-menu__item'onclick = 'editTask("+data._notes[i]._id+")'>Edit Task</li><li id="+data._notes[i].id+" class='mdl-menu__item' onclick='deleteTask("+data._notes[i].id+")'>Delete Task</li><li class='mdl-menu__item'>Move to Sprint 1</li><li disabled class='mdl-menu__item'>Disable button</li></ul></th></tr></thead><tbody onClick=''><tr style='width: 100%;'><td style='text-align:left'>Tags:</td><td style='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>"+data._notes[i].tag+"</td></tr><tr style='width: 100%;'><td style='text-align:left'>Type:</td><td style='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>"+data._notes[i].type+"</td></tr><tr style='width: 100%;'><td style='text-align:left'>Priority:</td><td style='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>"+data._notes[i].priority+"</td></tr><tr style='width: 100%;'><td style='text-align:left'>Story Point:</td><td class='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>"+data._notes[i].storypoint+"</td></tr><tr style='width: 100%;'><td style='text-align:left'>Assignee:</td><td style='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>"+data._notes[i].assignee+"</td></tr><tr style='width: 100%';><td style='text-align:Left' onclick='expand("+data._notes[i]._id+")'>Click Here to Expand</td></tr></tbody></table></div>"
       }
    }
    let outputArea = document.getElementById("NoteDisplay");
    outputArea.innerHTML = filterNotes;
}
function TESTING(data){
    let filterNotes = '';
    for(let i = 0; i < data.count; i++) {
        if(data._notes[i].tag=="TESTING") {
            filterNotes +=  "<div class='demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col'><table class='mdl-data-table mdl-js-data-table' style='width: 100%;'><thead><tr><th class='mdl-data-table__cell--non-numeric mdl-cell--4-col'>"+data._notes[i].name+"</th><th style='text-align:right; padding-right: 0px;'><button id="+data._notes[i].id+" class='mdl-button mdl-js-button mdl-button--icon' style='Scale: 1;\'><i class='material-icons'>more_vert</i></button><ul class='mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect' for="+data._notes[i].id+"><li class='mdl-menu__item'onclick = 'editTask("+data._notes[i]._id+")'>Edit Task</li><li id="+data._notes[i].id+" class='mdl-menu__item' onclick='deleteTask("+data._notes[i].id+")'>Delete Task</li><li class='mdl-menu__item'>Move to Sprint 1</li><li disabled class='mdl-menu__item'>Disable button</li></ul></th></tr></thead><tbody onClick=''><tr style='width: 100%;'><td style='text-align:left'>Tags:</td><td style='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>"+data._notes[i].tag+"</td></tr><tr style='width: 100%;'><td style='text-align:left'>Type:</td><td style='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>"+data._notes[i].type+"</td></tr><tr style='width: 100%;'><td style='text-align:left'>Priority:</td><td style='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>"+data._notes[i].priority+"</td></tr><tr style='width: 100%;'><td style='text-align:left'>Story Point:</td><td class='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>"+data._notes[i].storypoint+"</td></tr><tr style='width: 100%;'><td style='text-align:left'>Assignee:</td><td style='text-align:right; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;'>"+data._notes[i].assignee+"</td></tr><tr style='width: 100%';><td style='text-align:Left' onclick='expand("+data._notes[i]._id+")'>Click Here to Expand</td></tr></tbody></table></div>"
        }
    }
    let outputArea = document.getElementById("NoteDisplay");
    outputArea.innerHTML = filterNotes;
}

