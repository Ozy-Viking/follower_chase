///////////////////////////
// STREAMELEMENTS FIELDS //
///////////////////////////

let followerGoalTitle = "Follower Goal";
let followerGoalDifference = 1;
let googleFont = "Open Sans";
let customFont = "tw cen mt std";

/////////////////
// GLOBAL VARS //
/////////////////

let currentFollowerCount = 4087;


////////////////////
// MAIN FUNCTIONS //
////////////////////

function LoadWidget() {
    // Load the font
    LoadFont();

    // Update the follower goal label
    let followerGoalTitleSpan = document.getElementById("followerGoalTitle");
    followerGoalTitleSpan.innerHTML = followerGoalTitle;
}

function UpdateFollowerGoal() {
    // Update the follower goal counts
    let currentFollowerCountSpan = document.getElementById("currentFollowerCount");
    currentFollowerCountSpan.innerHTML = currentFollowerCount;

    let followerGoalCountSpan = document.getElementById("followerGoalCount");
    followerGoalCountSpan.innerHTML = parseInt(currentFollowerCount) + parseInt(followerGoalDifference);
}


LoadWidget()
UpdateFollowerGoal()
//////////////////////
// HELPER FUNCTIONS //
//////////////////////

function LoadFont() {
    document.body.style.fontFamily = IsNullOrWhitespace(customFont) ? googleFont : customFont;
}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    //if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) { seconds = "0" + seconds; }
    //return hours+':'+minutes+':'+seconds;
    return minutes + ':' + seconds;
}
function IsNullOrWhitespace(str) {
    return /^\s*$/.test(str);
}



///////////////////////////
// STREAMELEMENTS EVENTS //
///////////////////////////

window.addEventListener('onWidgetLoad', function (event) {
    console.log('onWidgetLoad', event);
    const fieldData = event.detail.fieldData;
    followerGoalTitle = fieldData.followerGoalTitle;
    followerGoalDifference = fieldData.followerGoalDifference;
    googleFont = fieldData.googleFont;
    customFont = fieldData.customFont;

    let data = event["detail"]["session"]["data"];
    currentFollowerCount = data["follower-total"]["count"];
    console.log(data)
    LoadWidget();
    UpdateFollowerGoal();
});

window.addEventListener('onSessionUpdate', function (event) {
    console.log('onSessionUpdate', event.detail.session);
    const data = event.detail.session;

    currentFollowerCount = data["follower-total"]["count"];
    UpdateFollowerGoal();

    console.log(data);
});