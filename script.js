let myDay = [
    {
        id: "0",
        hour: "8",
        time: "08",
        meridiem: "AM",
        reminder: ""
    },
    {
        id: "1",
        hour: "9",
        time: "9",
        meridiem: "AM",
        reminder: ""
    },
    {
        id: "2",
        hour: "10",
        time: "10",
        meridiem: "AM",
        reminder: ""
    },
    {
        id: "3",
        hour: "11",
        time: "11",
        meridiem: "AM",
        reminder: ""
    },
    {
        id: "4",
        hour: "12",
        time: "12",
        meridiem: "PM",
        reminder: ""
    },
    {
        id: "5",
        hour: "1",
        time: "13",
        meridiem: "PM",
        reminder: ""
    },
    {
        id: "6",
        hour: "2",
        time: "14",
        meridiem: "PM",
        reminder: ""
    },
    {
        id: "7",
        hour: "3",
        time: "15",
        meridiem: "PM",
        reminder: ""
    },
    {
        id: "8",
        hour: "4",
        time: "16",
        meridiem: "PM",
        reminder: ""
    },
    {
        id: "9",
        hour: "5",
        time: "17",
        meridiem: "PM",
        reminder: ""
    },
    {
        id: "10",
        hour: "6",
        time: "18",
        meridiem: "PM",
        reminder: ""
    },
    
]

function getHeaderDate() {
    let currentHeaderDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentHeaderDate);
}

// save local storage
function saveReminders() {
    localStorage.setItem("myDay", JSON.stringify(myDay));
}

// set data in localStorage 
function displayReminders() {
    myDay.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}


// set data to see if set
function init() {
    let storedDay = JSON.parse(localStorage.getItem("myDay"));
    if (storedDay) {
        myDay = storedDay;
    }
    saveReminders();
    displayReminders();
}

// function deleteReminders(){
//     let storedDay = JSON.parse(localStorage.deleteReminders("myDay"));
//     if (storedDay) {
//         myDay = storedDay;
//     }
//     deleteReminders();
// }


// loads header date
getHeaderDate();

// creates the visuals for the scheduler body
myDay.forEach(function(thisHour) {
    // creates timeblocks row
    let hourOfDay = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourOfDay);

    // creates time field
    let hourField = $("<div>")
        .text(`${thisHour.hour}${thisHour.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
    });

    // creates schdeduler data
    let hourPlan = $("<div>")
        .attr({
            "class": "col-md-8 description"
        });
    let planData = $("<textarea>");
    hourPlan.append(planData);
    planData.attr("id", thisHour.id);
    if (thisHour.time < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (thisHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (thisHour.time > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }
    // creates save button
    let saveButton = $("<i class='far fa-save fa-lg'></i>")
    let savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlan.append(saveButton);
    hourOfDay.append(hourField, hourPlan, savePlan);


})

// DELETE BUTTON
// var elements = document.getElementsByClassName("btn");
// for (var i = 0; i < elements.length; i++){
// elements[i].addEventListener("click", removeItem);
// }

// function removeItem(){
// this.parentNode.remove();
// } 

// $(".deleteBtn").on("click", function(event) {
//     event.preventDefault();
//     let deleteIndex = $(this).siblings(".description").children(".present").attr("id");
//     myDay[delteIndex].reminder = $(this).siblings(".description").children(".present").val();
//     console.log(delteIndex);
//     deleteReminders();
//     displayReminders();
// })



init();
// save data 
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    let saveIndex = $(this).siblings(".description").children(".future").attr("id");
    myDay[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    saveReminders();
    displayReminders();
})