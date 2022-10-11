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
        start_notes +="  <div class=\"mdl-grid demo-content\"></div><div style=\"border: 1px solid; width: 100%; background-color:azure; height: max-content; margin-bottom: 7px; display: flex;\">\<div style=\"text-align: left; width:40%; margin:auto; margin-left: 5px;\"><b>"+ sprint_backlog_item._notstarted[i]._name+"</b></div><div style=\"text-align: left; width:25%; margin:auto\"><b>Tags:"+sprint_backlog_item._notstarted[i]._tag+"</b></div><div style=\"text-align: left; width:25%; margin:auto\"><b>Priority: "+sprint_backlog_item._notstarted[i]._priority+"</b></div><div style=\"text-align: left; width:10%; margin:auto\"><button class=\"mdl-button mdl-js-button mdl-button--icon\" id="+sprint_backlog_item._notstarted[i]._id+"><i class=\"material-icons\">more_vert</i></button><ul class=\"mdl-menu mdl-js-menu\" for="+sprint_backlog_item._notstarted[i]._id+"><li class=\"mdl-menu__item\" onclick='move_inpro("+ sprint_backlog_item._notstarted[i]._id+")'>Move to In Progress</li><li class=\"mdl-menu__item\">Edit</li><li class=\"mdl-menu__item\">Delete</li></ul></div></div>"


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
        inprogress_notes +="  <div class=\"mdl-grid demo-content\"></div><div style=\"border: 1px solid; width: 100%; background-color:azure; height: max-content; margin-bottom: 7px; display: flex;\">\<div style=\"text-align: left; width:40%; margin:auto; margin-left: 5px;\"><b>"+ sprint_backlog_item._inprogress[i]._name+"</b></div><div style=\"text-align: left; width:25%; margin:auto\"><b>Tags:"+sprint_backlog_item._inprogress[i]._tag+"</b></div><div style=\"text-align: left; width:25%; margin:auto\"><b>Priority: "+sprint_backlog_item._inprogress[i]._priority+"</b></div><div style=\"text-align: left; width:10%; margin:auto\"><button class=\"mdl-button mdl-js-button mdl-button--icon\" id="+sprint_backlog_item._inprogress[i]._id+"><i class=\"material-icons\">more_vert</i></button><ul class=\"mdl-menu mdl-js-menu\" for="+sprint_backlog_item._inprogress[i]._id+"><li class=\"mdl-menu__item\" onclick='move_finish("+ sprint_backlog_item._inprogress[i]._id+")'>Move to Finish</li><li class=\"mdl-menu__item\">Edit</li><li class=\"mdl-menu__item\">Delete</li></ul></div></div>"

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
        done_notes +="  <div class=\"mdl-grid demo-content\"></div><div style=\"border: 1px solid; width: 100%; background-color:azure; height: max-content; margin-bottom: 7px; display: flex;\">\<div style=\"text-align: left; width:40%; margin:auto; margin-left: 5px;\"><b>"+ sprint_backlog_item._done[i]._name+"</b></div><div style=\"text-align: left; width:25%; margin:auto\"><b>Tags:"+sprint_backlog_item._done[i]._tag+"</b></div><div style=\"text-align: left; width:25%; margin:auto\"><b>Priority: "+sprint_backlog_item._done[i]._priority+"</b></div><div style=\"text-align: left; width:10%; margin:auto\"><button class=\"mdl-button mdl-js-button mdl-button--icon\" id="+sprint_backlog_item._done[i]._id+"><i class=\"material-icons\">more_vert</i></button><ul class=\"mdl-menu mdl-js-menu\" for="+sprint_backlog_item._done[i]._id+"><li class=\"mdl-menu__item\"  onclick='move_back("+ sprint_backlog_item._done[i]._id+")'>Move back to In Progress</li><li class=\"mdl-menu__item\">Edit</li><li class=\"mdl-menu__item\">Delete</li></ul></div></div>"

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
