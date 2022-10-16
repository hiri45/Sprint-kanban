
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
    if(mem_name ==""){
        alert("Please enter a member name")
    }
    else{
        validemail(mem_address)

        let new_member = new Member(gen_ID());
        new_member._name = mem_name;
        new_member._email = mem_address;

        if (memberlist.count < 1) {
            memberlist.addMember(new_member)
            updateLocalStorage(memberlist)
            window.location = "MemberManagement.html"

        }
        else {
            memberlist = getMemberLocalStorage()
            memberlist._members.push(new_member)
            updateLocalStorage(memberlist)
            window.location = "MemberManagement.html"
        }
    }

}


function delete_member(member_id){
    let toConfirm = confirm("Press OK to delete this member.") //to confirm if the user want to delete the locker
    if (toConfirm===true){ //if it's true
        detete_member_action(member_id);
       alert("This member has been deleted.");
       window.location="MemberManagement.html";
    } //if the user do not confirm, do nothing
}
function detete_member_action(member_id) {
    for (let i = 0; i < memberlist.count; i++) {
        if (memberlist._members[i]._id == member_id) {
            memberlist.removeitems(member_id);
            updateLocalStorage(memberlist);
            window.location.reload();
        }
    }
}
function check_start_date(_date) {
    let start_dates1 = _date.split('/');
    let start_day1 = start_dates1[0];
    let start_month1 = start_dates1[1];
    let start_year1 = start_dates1[2];
    if (start_year1 >= start_year) {
        if (start_year1 == start_year) {
            if (start_month1 >= start_month) {
                if (start_month1 == start_month) {

                    if (start_day1 >= start_day) {
                        return true;
                    }
                } else {
                    return true;
                }
            }
        } else {
            return true;
        }
    }
    return false;
}
function check_end_date(_date) {
    let start_dates1 = _date.split('/');
    let start_day1 = start_dates1[0];
    let start_month1 = start_dates1[1];
    let start_year1 = start_dates1[2];
    if (start_year1 <= end_year) {
        if (start_year1 == end_year) {
            if (start_month1 <= end_month) {
                if (start_month1 == end_month) {
                    if (start_day1 <= end_day) {
                        return true;
                    }
                } else {
                    return true;
                }
            }
        } else {
            return true;
        }
    }
    return false;
}
function validemail(input) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.match(validRegex)) {
        return true
    }
    else {
        alert("Invalid email address!");

        document.form1.text1.focus();

        return false;
    }

}
function update_hr(member) {
    let arra = member._loginhrs;
    for (let i = 0; i < arra.length; i++) {
        for (let a = 0; a < arra.length; a++) {
            if (arra[i]._date == arra[a]._date) {
                arra[i]._hour += arra[a]._hour
                arra.splice(a, 1);
            }
        }

        total_date++;
    }
}
function total_date(member) {
    let total_date = 0;
    let arra = member._loginhrs;
    for (let i = 0; i < arra.length; i++) {
        if (check_end_date(arra[i]._date) && check_start_date(arra[i]._date)) {
            total_date++;
        }
    }
    return total_date;
}
function total_hour(member) {
    let total_hour = 0;
    let arra = member._loginhrs;
    for (let i = 0; i < arra.length; i++) {
        if (check_end_date(arra[i]._date) && check_start_date(arra[i]._date)) {
            total_hour += arra[i]._hour;
        }
    }
    return total_hour;
}
function display_member(memberList2) {
    listmem = "";
    for (let i = 0; i < memberList2.count; i++) {
        let member = memberList2._members[i];
        listmem += '<tr>';
        listmem += '<td class="mdl-data-table__cell--non-numeric">' + member._name + '</td>';
        listmem += '<td class="mdl-data-table__cell--non-numeric">'+ member._email + '</td>';
        listmem += '<td>'
        listmem +='<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onclick="+delete_member('+member._id+')">Delete</button>'
        listmem += '</td>';
        listmem += '</tr>';
    }
    let outputArea = document.getElementById("member_table");
    outputArea.innerHTML = listmem;
}
display_member(memberlist);
