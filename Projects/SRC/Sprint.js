
const SPRINT_DATA_KEY = "sprintsDATA"
const Sprint_index_key = "sprint_index"
class Sprint {


    constructor(id) {
        this._id = id;
        this._name = "";
        this._items = [];
        this._inprogress = [];
        this._done = [];
        this._startdate = "";
        this._enddate = "";
        this._status = "Not Started";

    }
    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get items() {
        return this._items;
    }

    get startdate() {
        return this._startdate;
    }

    get enddate() {
        return this._enddate;
    }

    get status() {
        return this._status;
    }
    set name(value) {
        this._name = value;
    }

    setitems(value) {
        this._items.push(value);
    }
    removeitems(id) {
        for (let i = 0; i < this.items.length; i++) {
            if (id == this.items[i]._id) {
                this.items.splice(i, 1)
            }
        }
    }

    set startdate(value) {
        this._startdate = value;
    }

    set enddate(value) {
        this._enddate = value;
    }

    set status(value) {
        this._status = value;
    }
    fromData(data) {
        this._id = data._id;
        this._name = data._name;
        this._status = data._status;
        this._startdate = data._startdate;
        this._enddate = data._enddate;
        this._items = data._items;
    }




}
class SprintList {
    constructor() {
        this._sprints = []
    }

    get count() {
        return this._sprints.length
    }

    addsprint(Sprint) {
        this._sprints.push(Sprint)
    }

    getSprint(id) {
        for (let i = 0; i < this._sprints.length; i++) {
            if (id == this._sprints.id) {
                return this._sprints[i]
            }
        }

    }
    fromData(data) {
        let theData = data._sprints;
        this._sprints = [];
        for (let i = 0; i < theData.length; i++) {
            let theSprintlist = new Sprint();
            theSprintlist.fromData(theData[i]);
            this._sprints.push(theSprintlist);
        }

    }
    removeitems(id) {
        for (let i = 0; i < this._sprints.length; i++) {
            if (this._sprints[i]._id == id) {
                this._sprints.splice(i, 1);
            }
        }
    }
}
function updateLocalStorage(data) {
    localStorage.setItem(SPRINT_DATA_KEY, JSON.stringify(data));
}
function getSprintLocalStorage() {
    let retrieve = JSON.parse(localStorage.getItem(SPRINT_DATA_KEY));
    return retrieve;
}

function gen_ID() {
    let gen_id = Math.random() * 1000
    return gen_id
}
let sprintlist = new SprintList();


function checkSPRINTLocalStorage() {
    if (getSprintLocalStorage() == null) {
        return false
    }
    else {
        return true
    }

}
let to_new_check = checkSPRINTLocalStorage();

if (to_new_check === true) {
    let theData = getSprintLocalStorage();
    sprintlist.fromData(theData);
}


function create_sprint() {
    let sprint_name = document.getElementById("sprint_name");
    let sprint_start_day = document.getElementById("sprint_start_day");
    let sprint_start_month = document.getElementById("sprint_start_month");
    let sprint_start_year = document.getElementById("sprint_start_year");
    let sprint_end_day = document.getElementById("sprint_end_day");
    let sprint_end_month = document.getElementById("sprint_end_month");
    let sprint_end_year = document.getElementById("sprint_end_year");
    let sprint_start_date = sprint_start_day.value.toString() + "/" + sprint_start_month.value.toString() + "/" + sprint_start_year.value.toString()
    let sprint_end_date = sprint_end_day.value.toString() + "/" + sprint_end_month.value.toString() + "/" + sprint_end_year.value.toString()

    let new_sprint = new Sprint(gen_ID());
    new_sprint.name = sprint_name.value;
    new_sprint.status = "Inactive";
    new_sprint.startdate = sprint_start_date;
    new_sprint.enddate = sprint_end_date;

    sprintlist.addsprint(new_sprint)
    updateLocalStorage(sprintlist)
    window.location = "SprintManagement.html"
    sprint_date(sprintlist)

}
function display_SBlog(sprintlist2) {
    for (let i = 0; i < sprintlist2.count; i++) {
        let sprint_backlog_item = sprintlist2._sprints[i];
        let sprint_Blog = ""
        for (let i = 0; i < sprint_backlog_item._items.length; i++) {
            sprint_Blog += "<div style=\"border: 1px solid; width: 98%; background-color:azure; height: 30px; margin-bottom: 7px; display: flex; margin-right:10%;margin-left:1%;\"><div style=\"text-align: left; width:40%; margin:auto; margin-left: 5px;\"><b>" + sprint_backlog_item._items[i]._name + "</b></div><div style=\"text-align: left; width:25%; margin:auto\"><b>Assignee: " + sprint_backlog_item._items[i]._assignee + "</b></div><div style=\"text-align: left; width:25%; margin:auto\"><b>Priority: " + sprint_backlog_item._items[i]._priority + "</b></div><div style=\"text-align: left; width:10%; margin:auto\"></div></div>"
        }
        let outputArea = document.getElementById("backlog_display" + i);
        outputArea.innerHTML = sprint_Blog;
    }
}
function display_sprint(data) {
    let listsprints = ""
    let listsprints2=""
    for (let i = 0; i < data.count; i++) {
        if (data._sprints[i].status =="Active"){
            listsprints += " <div> <div style=\"border: 1px solid; width: 98%; background-color:aquamarine;; height: max-content; margin-bottom: 0px; display: flex; margin-left: 10px;\"><div style=\"text-align: left; width:30%; margin:auto; margin-left: 5px;\"><b>" + data._sprints[i].name + "</b></div><div style=\"text-align: left; width:20%; margin:auto\"><b>Start date: " + data._sprints[i].startdate + "</b></div>\<div style=\"text-align: left; width:20%; margin:auto\"><b>End date:" + data._sprints[i].enddate + "</b></div><div style=\"text-align: left; width:20%; margin:auto\"><b>Status: " + data._sprints[i].status + "</b></div><div style=\"text-align: right; width:10%; margin:auto; margin-right: 30px;\"><button  class=\"mdl-button mdl-js-button mdl-button--icon\" id=" + data._sprints[i].id + "><i class=\"material-icons\">more_vert</i></button><ul class=\"mdl-menu mdl-js-menu\" for=" + data._sprints[i].id + " ><li class=\"mdl-menu__item\" onclick='assigntask(" + i + ")'>Go to task assign</li><li class=\"mdl-menu__item\" onclick='set_active(" + data._sprints[i]._id + ")'>Set Active</li><li class=\"mdl-menu__item\">Edit</li><li class=\"mdl-menu__item\" onclick='detete_sprint(" + data._sprints[i]._id + ")'>Delete</li></ul></div></div>" + "<div  style='border: 1px solid; width: 98%; background-color:white; height: max-content; margin-bottom: 10px; display: block; margin-left: 10px;' id='backlog_display" + i + "'> </div>" + "</div>"
        } else{
            listsprints2 += " <div> <div style=\"border: 1px solid; width: 98%; background-color:aquamarine;; height: max-content; margin-bottom: 0px; display: flex; margin-left: 10px;\"><div style=\"text-align: left; width:30%; margin:auto; margin-left: 5px;\"><b>" + data._sprints[i].name + "</b></div><div style=\"text-align: left; width:20%; margin:auto\"><b>Start date: " + data._sprints[i].startdate + "</b></div>\<div style=\"text-align: left; width:20%; margin:auto\"><b>End date:" + data._sprints[i].enddate + "</b></div><div style=\"text-align: left; width:20%; margin:auto\"><b>Status: " + data._sprints[i].status + "</b></div><div style=\"text-align: right; width:10%; margin:auto; margin-right: 30px;\"><button  class=\"mdl-button mdl-js-button mdl-button--icon\" id=" + data._sprints[i].id + "><i class=\"material-icons\">more_vert</i></button><ul class=\"mdl-menu mdl-js-menu\" for=" + data._sprints[i].id + " ><li class=\"mdl-menu__item\" onclick='assigntask(" + i + ")'>Go to task assign</li><li class=\"mdl-menu__item\" onclick='set_active(" + data._sprints[i]._id + ")'>Set Active</li><li class=\"mdl-menu__item\">Edit</li><li class=\"mdl-menu__item\" onclick='detete_sprint(" + data._sprints[i]._id + ")'>Delete</li></ul></div></div>" + "<div  style='border: 1px solid; width: 98%; background-color:white; height: max-content; margin-bottom: 10px; display: block; margin-left: 10px;' id='backlog_display" + i + "'> </div>" + "</div>"

        }

    }
    let outputArea = document.getElementById("sprint_display");
    outputArea.innerHTML = listsprints;
    let outputArea2 = document.getElementById("sprint_display_not_active");
    outputArea2.innerHTML = listsprints2;


}


display_sprint(sprintlist);
sprint_date(sprintlist);
display_SBlog(sprintlist);


function sprint_date(data) {
    for (let i = 0; i < data.count; i++) {
        date_string = data._sprints[i].startdate.split("/")
        day = date_string[0]
        mon = date_string[1]
        year = date_string[2]
        date = new Date(year + "-" + mon + "-" + day).getTime()
        if ((date - new Date()) <= 0) {
            data._sprints[i].status = "Active"
            updateLocalStorage(data)

        }

    }


}

function assigntask(data) {
    localStorage.setItem(Sprint_index_key, data);
    window.location = "SprintAsgin.html";

}


function set_active(id) {
    for (let i = 0; i < sprintlist.count; i++) {
        if (sprintlist._sprints[i]._id == id) {
            sprintlist._sprints[i]._status = "Active"
            updateLocalStorage(sprintlist)

        }
    }
}

function detete_sprint(sprint_id) {
    for (let i = 0; i < sprintlist.count; i++) {
        if (sprintlist._sprints[i]._id == sprint_id) {
            sprintlist.removeitems(sprint_id)
            updateLocalStorage(sprintlist)
            window.location.reload();
        }
    }
}








