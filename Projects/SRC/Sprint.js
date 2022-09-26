
const SPRINT_DATA_KEY ="sprintsDATA"
class Sprint{


    constructor(id) {
        this._id = id
        this._name = ""
        this._items = []
        this._startdate = new Date()
        this._enddate = new Date()
        this._status = "Not Started"

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

    set startdate(value) {
        this._startdate = value;
    }

    set enddate(value) {
        this._enddate = value;
    }

    set status(value) {
        this._status = value;
    }
    fromData(data){
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
    fromData(data){
        let theData = data._sprints;
        this._sprints = [];
        for(let i = 0; i < theData.length; i++){
            let theSprintlist = new Sprint();
            theSprintlist.fromData(theData[i]);
            this._sprints.push(theSprintlist);
        }

    }
}
function updateLocalStorage(data){
    localStorage.setItem(SPRINT_DATA_KEY, JSON.stringify(data));
}
function getDataLocalStorage(){
    let retrieve = JSON.parse(localStorage.getItem(SPRINT_DATA_KEY));
    return retrieve;
}
let sprintList = new SprintList();

function gen_ID(){
    let gen_id = Math.random() * 1000
    return gen_id
}

let to_new_check = checkIfDataExistsLocalStorage();

if(to_new_check === true){
    let theData = getDataLocalStorage();
    sprintList.fromData(theData);
}

let list = new Stickynote(gen_ID());
list.tag = "UI";
list.name ="ewdcdca"
list.storypoint = 9

let new_sprint = new Sprint(gen_ID());
new_sprint.setitems(list)
sprintList.addsprint(new_sprint)
updateLocalStorage(sprintList)













