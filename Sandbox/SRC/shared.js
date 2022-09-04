

const NOTE_INDEX_KEY = "selectedStickyNoteIndex"
const NOTE_DATA_KEY = "stickyNoteData"
class Stickynote{

    constructor(){
        this._id = gen_ID()
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
        this._stickynotes = []
    }

    get stickynotes() {
        return this._stickynotes;
    }

    get count() {
        return this._stickynotes.length;
    }

    addstickynotes(name) {
        this._stickynotes.push(new Stickynote(name));
        let len = this.count
        this._stickynotes._id(len + 1)


    }
}

function gen_ID(){
    let gen_id = math.random() * 1000
    return gen_id
}


