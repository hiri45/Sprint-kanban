let sprintlist = JSON.parse(localStorage.getItem("sprintsDATA"));
let sprint_index  =localStorage.getItem("sprint_index");
let sprint_backlog_item = sprintlist._sprints[sprint_index];

function display_start_items(){
    let start_notes = ""
    for(let i = 0;i<sprint_backlog_item._items.length;i++){
        start_notes +="  <div class=\"mdl-grid demo-content\"></div><div style=\"border: 1px solid; width: 100%; background-color:azure; height: max-content; margin-bottom: 7px; display: flex;\">\<div style=\"text-align: left; width:40%; margin:auto; margin-left: 5px;\"><b>"+ sprint_backlog_item._items[i]._name+"</b></div><div style=\"text-align: left; width:25%; margin:auto\"><b>Tags:"+sprint_backlog_item._items[i]._tag+"</b></div><div style=\"text-align: left; width:25%; margin:auto\"><b>Priority: "+sprint_backlog_item._items[i]._priority+"</b></div><div style=\"text-align: left; width:10%; margin:auto\"><button class=\"mdl-button mdl-js-button mdl-button--icon\" id="+sprint_backlog_item._items[i]._id+"><i class=\"material-icons\">more_vert</i></button><ul class=\"mdl-menu mdl-js-menu\" for="+sprint_backlog_item._items[i]._id+"><li class=\"mdl-menu__item\" onclick='move_inpro("+ sprint_backlog_item._items[i]._id+")'>Move to In Progress</li><li class=\"mdl-menu__item\">Edit</li><li class=\"mdl-menu__item\">Delete</li></ul></div></div>"


    }
    let outputArea = document.getElementById("Sprint1_start_display");
    outputArea.innerHTML = start_notes;

}

function display_inpro_items(){
    let inprogress_notes = ""
    for(let i = 0;i<sprint_backlog_item._inprogress.length;i++){
        inprogress_notes +="  <div class=\"mdl-grid demo-content\"></div><div style=\"border: 1px solid; width: 100%; background-color:azure; height: max-content; margin-bottom: 7px; display: flex;\">\<div style=\"text-align: left; width:40%; margin:auto; margin-left: 5px;\"><b>"+ sprint_backlog_item._inprogress[i]._name+"</b></div><div style=\"text-align: left; width:25%; margin:auto\"><b>Tags:"+sprint_backlog_item._inprogress[i]._tag+"</b></div><div style=\"text-align: left; width:25%; margin:auto\"><b>Priority: "+sprint_backlog_item._inprogress[i]._priority+"</b></div><div style=\"text-align: left; width:10%; margin:auto\"><button class=\"mdl-button mdl-js-button mdl-button--icon\" id="+sprint_backlog_item._inprogress[i]._id+"><i class=\"material-icons\">more_vert</i></button><ul class=\"mdl-menu mdl-js-menu\" for="+sprint_backlog_item._inprogress[i]._id+"><li class=\"mdl-menu__item\" onclick='move_finish("+ sprint_backlog_item._inprogress[i]._id+")'>Move to Finish</li><li class=\"mdl-menu__item\">Edit</li><li class=\"mdl-menu__item\">Delete</li></ul></div></div>"

    }
    let outputArea = document.getElementById("Sprint1_in_progress_display");
    outputArea.innerHTML = inprogress_notes;


}
function display_finish_items(){
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
function move_inpro(id){
    for(let i = 0;i<sprint_backlog_item._items.length;i++){
        if(sprint_backlog_item._items[i]._id==id){
            sprint_backlog_item._inprogress.push(sprint_backlog_item._items[i])
            sprint_backlog_item._items.splice(i,1)
            updateSprintStorage(sprintlist)
            window.location = "SprintAsginActive.html"

        }
    }


}
function move_finish(id){
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
    localStorage.setItem("sprintsDATA", JSON.stringify(data));
}
