let itemlist = JSON.parse(localStorage.getItem("stickyNoteData"));
let sprintlist = JSON.parse(localStorage.getItem("sprintsDATA"));
let sprint_index  =localStorage.getItem("sprint_index");
let sprint_backlog_item = sprintlist._sprints[sprint_index];
document.getElementById("sprint_title").innerHTML=sprint_backlog_item._name
function display_PBlog(){
    let product_Blog = ""
    for(let i = 0; i<itemlist._notes.length;i++){
        if(itemlist._notes[i]._toSprint==false){
            product_Blog+="<div style=\"border: 1px solid; width: 100%; background-color:azure; height: max-content; margin-bottom: 7px; display: flex;\"><div style=\"text-align: left; width:40%; margin:auto; margin-left: 5px;\"><b>"+ itemlist._notes[i]._name+"</b></div><div style=\"text-align: left; width:25%; margin:auto\"><b>Tags: "+ itemlist._notes[i]._tag +"</b></div><div style=\"text-align: left; width:25%; margin:auto\"><b>Priority: "+ itemlist._notes[i]._priority +"</b></div><div style=\"text-align: left; width:10%; margin:auto\"><button id="+ itemlist._notes[i]._id+" class=\"mdl-button mdl-js-button mdl-button--icon\"><i class=\"material-icons\">more_vert</i></button><ul class=\"mdl-menu mdl-js-menu\" for="+ itemlist._notes[i]._id+"><li class=\"mdl-menu__item\" onclick='addtosprint("+ itemlist._notes[i]._id +")'>Move to Sprint Backlog</li></ul></div></div>"

        }

    }
    display_SBlog();
    let outputArea = document.getElementById("productbacklog");
    outputArea.innerHTML = product_Blog;

}
function display_SBlog(){
    let sprint_Blog =  ""
    for(let i = 0; i<sprint_backlog_item._items.length;i++){
        sprint_Blog+="<div style=\"border: 1px solid; width: 100%; background-color:azure; height: max-content; margin-bottom: 7px; display: flex;\"><div style=\"text-align: left; width:40%; margin:auto; margin-left: 5px;\"><b>"+sprint_backlog_item._items[i]._name+"</b></div><div style=\"text-align: left; width:25%; margin:auto\"><b>Tags: "+ sprint_backlog_item._items[i]._tag +"</b></div><div style=\"text-align: left; width:25%; margin:auto\"><b>Priority: "+ sprint_backlog_item._items[i]._priority +"</b></div><div style=\"text-align: left; width:10%; margin:auto\"><button id="+sprint_backlog_item._items[i]._id+" class=\"mdl-button mdl-js-button mdl-button--icon\"><i class=\"material-icons\">more_vert</i></button><ul class=\"mdl-menu mdl-js-menu\" for="+sprint_backlog_item._items[i]._id+"><li class=\"mdl-menu__item\" onclick='movetoPB("+ sprint_backlog_item._items[i]._id +")'>Move to Project Backlog</li></ul></div></div>"

    }
    let outputArea = document.getElementById("Sprintbacklogid");
    outputArea.innerHTML = sprint_Blog;

}
function addtosprint(id){
    for(let i = 0 ;i<itemlist._notes.length;i++){
        if(itemlist._notes[i]._id == id){
            itemlist._notes[i]._toSprint = true
            sprint_backlog_item._items.push(itemlist._notes[i])
            updateNOTEStorage(itemlist)
            updateSprintStorage(sprintlist)
            window.location = "SprintAsgin.html"
        }
    }


}
function movetoPB(id){
    for(let i = 0 ;i<sprint_backlog_item._items.length;i++){
        if(sprint_backlog_item._items[i]._id == id){
            for(let i = 0 ;i<itemlist._notes.length;i++){
                if(itemlist._notes[i]._id == id){
                    itemlist._notes[i]._toSprint = false
                    updateNOTEStorage(itemlist)
                }
            }
            sprint_backlog_item._items.splice(i,1)

            updateSprintStorage(sprintlist)
            window.location = "SprintAsgin.html"
        }
    }


}

function updateNOTEStorage(data){
    localStorage.setItem("stickyNoteData", JSON.stringify(data));
}
function updateSprintStorage(data){
    localStorage.setItem("sprintsDATA", JSON.stringify(data));
}

display_PBlog();

function set_active(){
    let toConfirm = confirm("Press OK to start sprint.") //to confirm if the user want to delete the locker
    if (toConfirm===true){ //if it's true
        sprint_backlog_item._status = "Active"
        let date = new Date();
        let day = date.getDate();
        let mon = date.getMonth()+1;
        let year = date.getFullYear();
        let start_date = day.toString()+"/"+mon.toString()+"/"+year.toString();
        sprint_backlog_item._startdate= start_date;
        sprint_backlog_item._notstarted = sprint_backlog_item._items
        updateSprintStorage(sprintlist)
        window.location = "SprintAsginActive.html"
    } //if the user do not confirm, do nothing
}
function go_back_index(){
    updateSprintStorage(sprintlist)
    updateNOTEStorage(itemlist)
    window.location =  "index.html"
}
function go_back_mangement() {
    updateSprintStorage(sprintlist)
    updateNOTEStorage(itemlist)
    window.location = "SprintManagement.html"
}




