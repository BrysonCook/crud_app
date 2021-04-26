// This calls our back-end Java program that sets our session info
function setSessionJava() {

    var url = "api/login_servlet";

    // Grab data from the HTML form
    var sessionKey = "loginId"
    var loginId = $("#loginId").val();

    // Create a JSON request based on that data
    var dataToServer = {loginId : loginId};
    console.log(loginId)

    // Post
    $.post(url, dataToServer, function (dataFromServer) {
        // We are done. Write a message to our console
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        // Clear the form
        $("#loginId").val("");
        document.getElementById("loginContainer").style.visibility="visible";
        getSessionJava();
    });
}

// This gets session info from our back-end servlet.
function getSessionJava() {

    var url = "api/get_login_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        // Update the HTML with our result
        $('#getSessionResult').html(dataFromServer)
    });
}

// This method calls the servlet that invalidates our session
function invalidateSessionButton() {

    var url = "api/invalidate_session_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        document.getElementById("loginContainer").style.visibility="hidden";
        getSessionJava();
    });
}

getSessionJava();

// Hook the functions above to our buttons
button = $('#getLogin');
button.on("click", getSessionJava);

button = $('#setLogin');
button.on("click", setSessionJava);

button = $('#logout');
button.on("click", invalidateSessionButton);