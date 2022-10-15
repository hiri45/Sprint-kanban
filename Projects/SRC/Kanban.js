let sprintlist = JSON.parse(localStorage.getItem("sprintsDATA"));
let sprint_index  =localStorage.getItem("sprint_index");
let sprint_backlog_item = sprintlist._sprints[sprint_index];

if(sprint_backlog_item._notstarted===[]){
    sprint_backlog_item._notstarted=sprint_backlog_item._items
}

function display_start_items(){
    /*
    this function takes all the tasks within a sprint and displays the tasks in the "start" section within the kanban.
    the tasks are presented with their: name,tag and priority
    */
    let start_notes = ""
    updateSprintStorage(sprintlist)
    for(let i = 0;i<sprint_backlog_item._notstarted.length;i++){
        start_notes +="  <div class=\"mdl-grid demo-content\"></div><div style=\"border: 1px solid; width: 100%; background-color:azure; height: max-content; margin-bottom: 7px; display: flex;\">\<div style=\"text-align: left; width:40%; margin:auto; margin-left: 5px;\"><b>"+ sprint_backlog_item._notstarted[i]._name+"</b></div><div style=\"text-align: left; width:25%; margin:auto\"><b>Tags:"+sprint_backlog_item._notstarted[i]._tag+"</b></div><div style=\"text-align: left; width:25%; margin:auto\"><b>Priority: "+sprint_backlog_item._notstarted[i]._priority+"</b></div><div style=\"text-align: left; width:10%; margin:auto\"><button class=\"mdl-button mdl-js-button mdl-button--icon\" id="+sprint_backlog_item._notstarted[i]._id+"><i class=\"material-icons\">more_vert</i></button><ul class=\"mdl-menu mdl-js-menu\" for="+sprint_backlog_item._notstarted[i]._id+"><li class=\"mdl-menu__item\" onclick='move_inpro("+ sprint_backlog_item._notstarted[i]._id+")'>Move to In Progress</li><li class=\"mdl-menu__item\" onclick='editTask("+ sprint_backlog_item._notstarted[i]._id+")'>Edit</li><li class=\"mdl-menu__item\">Delete</li></ul></div></div>"


    }
    let outputArea = document.getElementById("Sprint1_start_display");
    outputArea.innerHTML = start_notes;

}

function display_inpro_items(){
    /*
    this function takes selected tasks within a sprint and displays the tasks in the "in progress" section within the kanban.
    the tasks are presented with their: name,tag and priority
    */
    let inprogress_notes = ""
    for(let i = 0;i<sprint_backlog_item._inprogress.length;i++){
        inprogress_notes +="  <div class=\"mdl-grid demo-content\"></div><div style=\"border: 1px solid; width: 100%; background-color:azure; height: max-content; margin-bottom: 7px; display: flex;\">\<div style=\"text-align: left; width:40%; margin:auto; margin-left: 5px;\"><b>"+ sprint_backlog_item._inprogress[i]._name+"</b></div><div style=\"text-align: left; width:25%; margin:auto\"><b>Tags:"+sprint_backlog_item._inprogress[i]._tag+"</b></div><div style=\"text-align: left; width:25%; margin:auto\"><b>Priority: "+sprint_backlog_item._inprogress[i]._priority+"</b></div><div style=\"text-align: left; width:10%; margin:auto\"><button class=\"mdl-button mdl-js-button mdl-button--icon\" id="+sprint_backlog_item._inprogress[i]._id+"><i class=\"material-icons\">more_vert</i></button><ul class=\"mdl-menu mdl-js-menu\" for="+sprint_backlog_item._inprogress[i]._id+"><li class=\"mdl-menu__item\" onclick='move_finish("+ sprint_backlog_item._inprogress[i]._id+")'>Move to Finish</li><li class=\"mdl-menu__item\"onclick='editTask("+ sprint_backlog_item._inprogress[i]._id+")'>Edit</li><li class=\"mdl-menu__item\">Delete</li></ul></div></div>"

    }
    let outputArea = document.getElementById("Sprint1_in_progress_display");
    outputArea.innerHTML = inprogress_notes;


}
function display_finish_items(){
    /*
    this function takes selected tasks within a sprint and displays the tasks in the "finished" section within the kanban.
    the tasks are presented with their: name,tag and priority
    */
    let done_notes = ""
    for(let i = 0;i<sprint_backlog_item._done.length;i++){
        done_notes +="  <div class=\"mdl-grid demo-content\"></div><div style=\"border: 1px solid; width: 100%; background-color:azure; height: max-content; margin-bottom: 7px; display: flex;\">\<div style=\"text-align: left; width:40%; margin:auto; margin-left: 5px;\"><b>"+ sprint_backlog_item._done[i]._name+"</b></div><div style=\"text-align: left; width:25%; margin:auto\"><b>Tags:"+sprint_backlog_item._done[i]._tag+"</b></div><div style=\"text-align: left; width:25%; margin:auto\"><b>Priority: "+sprint_backlog_item._done[i]._priority+"</b></div><div style=\"text-align: left; width:10%; margin:auto\"><button class=\"mdl-button mdl-js-button mdl-button--icon\" id="+sprint_backlog_item._done[i]._id+"><i class=\"material-icons\">more_vert</i></button><ul class=\"mdl-menu mdl-js-menu\" for="+sprint_backlog_item._done[i]._id+"><li class=\"mdl-menu__item\"  onclick='move_back("+ sprint_backlog_item._done[i]._id+")'>Move back to In Progress</li><li class=\"mdl-menu__item\"onclick='editTask("+ sprint_backlog_item._done[i]._id+")'>Edit</li><li class=\"mdl-menu__item\">Delete</li></ul></div></div>"

    }
    let outputArea = document.getElementById("Sprint_finish");
    outputArea.innerHTML = done_notes;

}
display_start_items()
display_finish_items()
display_inpro_items()

/*
NOTE: tasks can only be moved from one section one by one, i.e. a task cannot be moved straight to "finished" from "start"
      once a task has been moved from start to "in progress" it cannot be moved back into start, since once a task has started logically it shouldn't moved back to "start"
      a task can only move back from "finished" to "in progress", otherwise it moves forward from one section to the other
*/
function move_inpro(id){
    /*
    this function is used to move item a task into the "in progess" section within the kanban.
    it takes the id of the task, deletes it from the "start" section and pushes it into the "in progress" section whilst updating the storage
    */
    for(let i = 0;i<sprint_backlog_item._notstarted.length;i++){
        if(sprint_backlog_item._notstarted[i]._id==id){
            sprint_backlog_item._inprogress.push(sprint_backlog_item._notstarted[i])
            sprint_backlog_item._notstarted.splice(i,1)
            updateSprintStorage(sprintlist)
            window.location = "SprintAsginActive.html"

        }
    }


}
function move_finish(id){
    /*
    this function is used to move item a task into the "finished" section within the kanban.
    it takes the id of the task, deletes it from the "in progress" section and pushes it into the "finished" section whilst updating the storage
    */
    for(let i = 0;i<sprint_backlog_item._inprogress.length;i++){
        if(sprint_backlog_item._inprogress[i]._id==id){
            sprint_backlog_item._done.push(sprint_backlog_item._inprogress[i])
            sprint_backlog_item._inprogress.splice(i,1)
            updateSprintStorage(sprintlist)
            window.location = "SprintAsginActive.html"

        }
    }



}
function move_back(id) {
    /*
    this function is used to move item a task back into the "in progress" section within the kanban.
    it takes the id of the task, deletes it from the "finished" section and pushes it into the "in progress" section whilst updating the storage
    */
    for (let i = 0; i < sprint_backlog_item._done.length; i++) {
        if (sprint_backlog_item._done[i]._id == id) {
            sprint_backlog_item._inprogress.push(sprint_backlog_item._done[i])
            sprint_backlog_item._done.splice(i, 1)
            updateSprintStorage(sprintlist)
            window.location = "SprintAsginActive.html"

        }
    }
}


function updateSprintStorage(data){
    /*
    this function is used to update local storage
    */
    localStorage.setItem("sprintsDATA", JSON.stringify(data));
}
function end_sprint(){
    sprint_backlog_item._status = "Completed";
    let date = new Date();
    let day = date.getDate()
    let mon = date.getMonth()+1;
    let year = date.getFullYear();
    let end_date = day.toString()+"/"+mon.toString()+"/"+year.toString();
    sprint_backlog_item._enddate= end_date;
    updateSprintStorage(sprintlist);
    window.location = "SprintManagement.html";
}


function getStoryPoints(){
    let spTotal = 0
    for(let i = 0; i < sprint_backlog_item._items.length; i++) {
        let sp = sprint_backlog_item._items[i]._storypoint;
        let spInt = parseInt(sp);
        spTotal += spInt;
    }
    spTotal = spTotal * 3;
    return spTotal;
}

function sprintDays(){
    let date_string = sprint_backlog_item._startdate.split("/");
    let day = date_string[0]
    let mon = date_string[1]
    let year = date_string[2]
    let startDate = new Date(year + "-" + mon + "-" + day)
    let endDate_string = sprint_backlog_item._enddate.split("/");
    let end_day = endDate_string[0]
    let end_mon = endDate_string[1]
    let end_year = endDate_string[2]
    let endDate = new Date(end_year + "-" + end_mon + "-" + end_day)

    timeDiff = endDate.getTime() - startDate.getTime();
    days = Math.ceil(timeDiff / (1000*3600*24));
    return days;
}

function genXVal(days){
    let daysArr = [];
    for (let i = 0; i < days+1; i++) {
        daysArr.push(i)
    }
    return daysArr;
}

function genYVal(){
    let increment = getStoryPoints() / sprintDays();
    let spArr = []
    for (i=0; i <= sprintDays(); i++) {
            spArr.push(getStoryPoints() - (i*increment));
    }
    return spArr
}

let xValues = genXVal(sprintDays());
let yValues = genYVal();

class time_log{
    constructor(date, hour,task_id) {
        this._date = date;
        this._hour=hour;
        this._task_id=task_id;
    }

}
function count_time(date,hrs,member_name,task_id){
    let var_date=new time_log(date,hrs,task_id);
    local_list= localStorage.getItem("memberDATA");
    list=JSON.parse(local_list);
    for (let i = 0; i < list._members.length; i++){
        if (list._members[i]._name==member_name){
            list._members[i]._loginhrs.push(var_date);
        }
    }
    localStorage.setItem("memberDATA", JSON.stringify(list));
    window.location.reload();
}

new Chart("analyticsChart", {
    type: "line",
    data: {
        labels: xValues,
        datasets:[{
            fill: true,
            pointRadius: 1,
            borderColor:"rgba(255,0,0,0.5)",
            data: yValues
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Analytics Chart',
            fontColor: 'rgb(255, 99, 132)'
            }
        }
})
function go_back_index(){
    updateSprintStorage(sprintlist)
    window.location =  "index.html"
}
function go_back_mangement() {
    updateSprintStorage(sprintlist)
    window.location = "SprintManagement.html"
}
var editing_task = document.getElementById("edittask") // used as a global since used in editTask function and closeEdit function
function editTask(id) {
    /*
    this function is a dialog popup which allows the user to edit the data within a specific note
    :arguments
        id: id is used to get the specific note in which the user wants to edit
    */
    let note_to_edit = 0
    for(let i = 0 ;i<sprint_backlog_item._notstarted.length;i++){
        if(id == sprint_backlog_item._notstarted[i]._id ){
            note_to_edit =sprint_backlog_item._notstarted[i]
        }
    }
    for(let i = 0 ;i<sprint_backlog_item._inprogress.length;i++){
        if(id == sprint_backlog_item._inprogress[i]._id ){
            note_to_edit =sprint_backlog_item._inprogress[i]
        }
    }
    for(let i = 0 ;i<sprint_backlog_item._done.length;i++){
        if(id == sprint_backlog_item._done[i]._id ){
            note_to_edit =sprint_backlog_item._done[i]
        }
    }

    // get note function used to get specific note with id

    let desc_edit = document.getElementById("edit_task_description");
    let name_edit = document.getElementById("edit_task_name");
    let sp_edit = document.getElementById("edit_task_storypoint");
    let tag_edit = document.getElementById("edit_task_tags");
    let edit_priority = document.getElementById("edit_task_priority");
    let edit_type = document.getElementById("edit_task_type");
    let edit_assignee = document.getElementById("edit_assignee");
    let edit_hours = document.getElementById("edit_task_hours");
    let total_hours = document.getElementById("output_tot_hrs");

    // id used if user wants to submit an edited note
    let submit_button = document.getElementById("submit_button");

    // HTML used to pass through submitEdit() function
    submit_button.innerHTML = "<button id ='submit_button' type='button' class='mdl-button' onclick = 'submitEdit(" + id + ");'>submit</button>";

    desc_edit.value = note_to_edit._description
    name_edit.value = note_to_edit._name
    sp_edit.value = note_to_edit._storypoint
    edit_assignee ='<option value="'+note_to_edit._name+'">'+note_to_edit._name+'</option>'
    tag_edit.value = note_to_edit._tag
    edit_priority.value = note_to_edit._priority
    edit_type.value = note_to_edit._type
    edit_hours.value = 0;
    total_hours.value = note_to_edit._totalhours

    
    // display assignnee
    let result='';
    let list= JSON.parse(localStorage.getItem("memberDATA"));
    result+='<option value="'+note_to_edit._assignee+'">'+note_to_edit._assignee+'</option>';
    if(list._members.length>0){
        for (let i = 0; i < list._members.length; i++){
            let member=list._members[i];
            result+='<option value="'+member._name+'">'+member._name+'</option>'         
        }
    }
    let outputArea = document.getElementById("edit_assignee");
    outputArea.innerHTML = result;


    editing_task.showModal();


}
function closeEdit() {
    /*
    this function is used to close the edit dialog if user does not want to edit note
    */
    editing_task.close()
}
function count_time(date,hrs,member_name,task_id){
    let var_date=new time_log(date,hrs,task_id);
    local_list= localStorage.getItem("memberDATA");
    list=JSON.parse(local_list);
    for (let i = 0; i < list._members.length; i++){
        if (list._members[i]._name==member_name){
            list._members[i]._loginhrs.push(var_date);
        }
    }
    localStorage.setItem("memberDATA", JSON.stringify(list));
    window.location.reload();
}

function submitEdit(id) {
    let note_to_edit = 0
    for(let i = 0 ;i<sprint_backlog_item._notstarted.length;i++){
        if(id === sprint_backlog_item._notstarted[i]._id ){
             note_to_edit =sprint_backlog_item._notstarted[i]
        }
    }
    for(let i = 0 ;i<sprint_backlog_item._inprogress.length;i++){
        if(id === sprint_backlog_item._inprogress[i]._id ){
             note_to_edit =sprint_backlog_item._inprogress[i]
        }
    }
    for(let i = 0 ;i<sprint_backlog_item._done.length;i++){
        if(id === sprint_backlog_item._done[i]._id ){
             note_to_edit =sprint_backlog_item._done[i]
        }
    }
    /*
    this function submits an edited task to the project backlog as well as updating the local storage with the edited data.
    :input
        id: id used to get specific note to edit
    */


    let submit_desc=document.getElementById("edit_task_description");
    let submit_tag = document.getElementById("edit_task_tags");
    let submit_priority = document.getElementById("edit_task_priority");
    let submit_sp = document.getElementById("edit_task_storypoint");
    let submit_name = document.getElementById("edit_task_name");
    let submit_type = document.getElementById("edit_task_type");
    let submit_assignee = document.getElementById("edit_assignee");
    let submit_hours = document.getElementById("edit_task_hours");
    // note to edit is changed with edited values
    note_to_edit._description = submit_desc.value;
    note_to_edit._tag = submit_tag.value;
    note_to_edit._priority = submit_priority.value;
    note_to_edit._storypoint = submit_sp.value;
    note_to_edit._name = submit_name.value;
    note_to_edit._type = submit_type.value;
    note_to_edit._assignee = submit_assignee.value;
    note_to_edit._totalhours += Number(submit_hours.value);
    // update the member to store working hrs
    let date = document.getElementById("edit_task_date").value;
    let dates= date.split("-");
    let new_date=dates[2]+'/'+dates[1]+'/'+dates[0];
    count_time(new_date,submit_hours.value,submit_assignee.value);

    updateSprintStorage(sprintlist); // updates itemlist with edited data
    window.location = "SprintAsginActive.html"  // takes user back to the index page once task has been added
}
