const MEMBER_DATA_KEY = "memberDATA"
const MEMBER_index_key = "member_index"
let start_date="20/11/2022";
let end_date="22/11/2023";
let start_dates=start_date.split('/');
let start_day=parseInt(start_dates[0]);
let start_month=parseInt(start_dates[1]);
let start_year=parseInt(start_dates[2]);
let end_dates=end_date.split('/');
let end_day=parseInt(end_dates[0]);
let end_month=parseInt(end_dates[1]);
let end_year=parseInt(end_dates[2]);

function updateLocalStorage(data) {
    localStorage.setItem(MEMBER_DATA_KEY, JSON.stringify(data));
}
function getMemberLocalStorage() {
    let retrieve = JSON.parse(localStorage.getItem(MEMBER_DATA_KEY));
    return retrieve;
}

let memberlist=getMemberLocalStorage();

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
        if (start_year1 == window.start_year) {
            if (start_month1 >= window.start_month) {
                if (start_month1 == window.start_month) {

                    if (start_day1 >= window.start_day) {
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
    if (start_year1 <= window.end_year) {
        if (start_year1 == window.end_year) {
            if (start_month1 <= window.end_month) {
                if (start_month1 == window.end_month) {
                    if (start_day1 <= window.end_day) {
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
            total_hour += parseInt(arra[i]._hour);
        }
    }
    return total_hour;
}
function display_member(memberList2) {
    var barColors = ["red", "green","blue","orange","brown"];
    let listmem = "";
    let mem_name = []
    let mem_hours=[]
    let tot_hours = []
    for (let i = 0; i < memberList2._members.length; i++) {
        let member = memberList2._members[i];
        mem_name.push(member._name)
        mem_hours.push(total_hour(member) / total_date(member))
        tot_hours.push(total_hour(member))
        listmem += '<tr>';
        listmem += '<td class="mdl-data-table__cell--non-numeric">' + member._name + '</td>';
        listmem += '<td>' + total_hour(member) + '</td>';
        listmem += '<td>' + total_hour(member) / total_date(member) + '</td>';
        listmem += '<td>' + total_date(member) + '</td>';
        listmem += '<td>'
        listmem +='<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onclick="+delete_member('+member._id+')">Delete</button>'
        listmem += '</td>';
        listmem += '</tr>';

    }
    let outputArea = document.getElementById("team_dashboard");
    outputArea.innerHTML = listmem;

    new Chart("analyticsChart", {
        type: "bar",
        data: {
            labels: mem_name,// xValBurn, xValAcc,
            datasets:[{
                label: 'Average Hours Per Day Worked',
                fill: true,
                pointRadius: 1,
                backgroundColor:barColors,
                data: mem_hours
            },
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        ticks: {
                            beginAtZero: true
                        },
                        display: true,
                        labelString: 'Hours'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Memeber"
                    }
                }]
            },
            legend: {
                display: true,
                position: 'right',
                labels: {
                    fontColor: "rgba(0, 0, 250, 0.6)",
                }
            },
            title: {
                display: true,
                text: 'Average Hours Per Day Worked By Members',
                position: 'top',
                align: 'left',
                fontColor: 'rgb(255, 99, 132)'
            }
        }
    })
    new Chart("analyticsChart2", {
        type: "bar",
        data: {
            labels: mem_name,// xValBurn, xValAcc,
            datasets:[{
                label: 'Total Hours Worked',
                fill: true,
                pointRadius: 1,
                backgroundColor:barColors,
                data: tot_hours
            },
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        ticks: {
                            beginAtZero: true
                        },
                        display: true,
                        labelString: 'Hours'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Memeber"
                    }
                }]
            },
            legend: {
                display: true,
                position: 'right',
                labels: {
                    fontColor: "rgba(0, 0, 250, 0.6)",
                }
            },
            title: {
                display: true,
                text: 'Total Hours Worked',
                position: 'top',
                align: 'left',
                fontColor: 'rgb(255, 99, 132)'
            }
        }
    })
}
function apply_filter(){
    let outputArea = document.getElementById("start date").value;
    let start_dates1=outputArea.split('-');
    window.start_day=parseInt(start_dates1[2]);
    window.start_month=parseInt(start_dates1[1]);
    window.start_year=parseInt(start_dates1[0]);
    let outputArea2 = document.getElementById("end date").value;
    let end_dates1=outputArea2.split('-');
    window.end_day=parseInt(end_dates1[2]);
    window.end_month=parseInt(end_dates1[1]);
    window.end_year=parseInt(end_dates1[0]);
    display_member(memberlist);


}
display_member(memberlist);

