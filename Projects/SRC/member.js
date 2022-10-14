
const MEMBER_DATA_KEY = "memberDATA"
const MEMBER_index_key = "member_index"
class Member {

    constructor(id) {
        this._id = id;
        this._name = "";
        this._email = "";
        this._loginhrs = [];
        this._logindays = []
       
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }

    get email() {
        return this._email;
    }
    get loginhrs() {
        return this._loginhrs;
    }


    fromData(data) {
        this._id = data._id;
        this._name = data._name;
        this._email = data._email;

    }

}
class MemberList {
    constructor() {
        this._members = []
    }
    get count() {
        return this._members.length
    }

    addMember(member) {
        this._members.push(member)
    }
    getMember(id) {
        for (let i = 0; i < this._members.length; i++) {
            if (id == this._members.id) {
                return this._members[i]
            }
        }

    }
    fromData(data) {
        let theData = data._members;
        this._members = [];
        for (let i = 0; i < theData.length; i++) {
            let member = new Member();
            member.fromData(theData[i]);
            this._members.push(member);
        }

    }
    removeitems(id) {
        for (let i = 0; i < this._members.length; i++) {
            if (this._members[i]._id == id) {
                this._members.splice(i, 1);
            }
        }
    }
}
function updateLocalStorage(data) {
    localStorage.setItem(MEMBER_DATA_KEY, JSON.stringify(data));
}
function getMemberLocalStorage() {
    let retrieve = JSON.parse(localStorage.getItem(MEMBER_DATA_KEY));
    return retrieve;
}
function gen_ID() {
    let gen_id = Math.random() * 1000
    return gen_id
}
let memberlist = new MemberList();

function checkMEMBERLocalStorage() {
    if (getMemberLocalStorage() == null) {
        return false
    }
    else {
        return true
    }

}
let to_new_check = checkMEMBERLocalStorage();

if (to_new_check === true) {
    let theData = getMemberLocalStorage();
    memberlist.fromData(theData);
}
function create_member() {
    let mem_name = document.getElementById("create_name").value;
    let mem_address = document.getElementById("create_email").value;

    validemail(mem_address)

    let new_member = new Member(gen_ID());
    new_member._name = mem_name;
    new_member._email = mem_address;

    if (memberlist.count<1){
        memberlist.addMember(new_member)
        updateLocalStorage(memberlist)
        window.location = "MemberManagement.html"

    }
    else{
        memberlist = getMemberLocalStorage()
        memberlist._members.push(new_member)
        updateLocalStorage(memberlist)
        window.location = "MemberManagement.html"
    }
}

function detete_meber(member_id) {
    for (let i = 0; i < memberlist.count; i++) {
        if (memberlist._members[i]._id == member_id) {
            memberlist.removeitems(member_id);
            updateLocalStorage(memberlist);
            window.location.reload();
        }
    }
}

function validemail(input){
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(input.match(validRegex)){
        return true
    }
    else{
        alert("Invalid email address!");

        document.form1.text1.focus();

        return false;
    }

}
function display_member(memberList2) {
    listmem="";
    for (let i = 0; i < memberList2.count; i++){
        let member=memberList2._members[i]
        listmem+='<tr>';
        listmem+='<td class="mdl-data-table__cell--non-numeric">'+member._name+'</td>';
        listmem+='<td></td>';
        listmem+='<td></td>';
        listmem+='<td></td>';
        listmem+='<td style="text-align:center ">'+member._email+'</td>';
        listmem+='<td><th style="text-align:right; padding-right: 0px;"><button id="'+member._id+'" onclick=""';
        listmem+='class="mdl-button mdl-js-button mdl-button--icon" style="Scale: 1;">';
        listmem+='<i class="material-icons">more_vert</i>';
        listmem+='</button>';
        listmem+='<ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for='+member._id+'>';
        listmem+='<li class="mdl-menu__item" onclick="detete_meber('+member._id+')">Delete Member</li>';
        listmem+='</ul>';
        listmem+='</th>';
        listmem+='</td>';
        listmem+='</tr>';
    }
    let outputArea = document.getElementById("member_table");
    outputArea.innerHTML = listmem;
}
display_member(memberlist);