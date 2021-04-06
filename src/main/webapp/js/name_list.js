
let url = "api/name_list_get";

// Start a web call. Specify:
// URL
// Data to pass (nothing in this case)
// Function to call when we are done

function updateTable() {
    $.getJSON(url, null, function (json_result) {
            $('#datatable tbody tr').remove()
            for (let i = 0; i < json_result.length; i++) {
                console.log(json_result[i]);
                $('#datatable tbody').append('<tr><td>'
                    + json_result[i].id
                    + '</td><td>'
                    + htmlSafe(json_result[i].first)
                    + '</td><td>'
                    + htmlSafe(json_result[i].last)
                    + '</td><td>'
                    + formatPhoneNumber(htmlSafe(json_result[i].phone))
                    + '</td><td>'
                    + getDateFromSQL(htmlSafe(json_result[i].birthday)).toLocaleDateString()
                    + '</td><td>'
                    + htmlSafe(json_result[i].email)
                    + '</td><td>'
                    + "<button type='button' name='edit' class='editButton btn btn-primary' value=" + json_result[i].id +
                    "> edit </button>"
                    + "<button id='mybtn' type='button' name='delete' class='deleteButton btn btn-danger' value=" + json_result[i].id +
                    "> Delete </button>"
                    + '</td></tr>');
            }
            $(".deleteButton").on("click", deleteItem);
            console.log("done");
        }
    );
}

updateTable();


function htmlSafe(data){
    return data.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
}

function formatPhoneNumber(phoneNumberString) {
    let cleaned = phoneNumberString.replace(/\D/g, '');

    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumberString;
}

function getDateFromSQL(sqlDate) {
    let cleaned = sqlDate.replace(/\D/g, '');
    let match = cleaned.match(/^(\d{4})(\d{2})(\d{2})$/);
    let resultDate = new Date(match[1], match[2], match[3]);

    return resultDate;
}

// Called when "Add Item" button is clicked
function showDialogAdd() {

    // Print that we got here
    console.log("Opening add item dialog");

    let id = $('#id');
    let firstName = $('#firstName');
    let lastName = $('#lastName');
    let email = $('#email');
    let phone = $('#phone');
    let birthday = $('#birthday');

    document.getElementById("my-form").reset();
    id.removeClass("is-valid is-invalid")
    firstName.removeClass("is-valid is-invalid")
    lastName.removeClass("is-valid is-invalid")
    email.removeClass("is-valid is-invalid")
    phone.removeClass("is-valid is-invalid")
    birthday.removeClass("is-valid is-invalid")


    // Clear out the values in the form.
    // Otherwise we'll keep values from when we last
    // opened or hit edit.
    // I'm getting it started, you can finish.
    id.val("");
    firstName.val("");
    lastName.val("");
    email.val("");
    phone.val("");
    birthday.val("");

    // Show the hidden dialog
    $('#myModal').modal('show');

}

$('#myModal').on('shown.bs.modal', function (){
    $('#firstName').focus();
});

// There's a button in the form with the ID "addItem"
// Associate the function showDialogAdd with it.
let addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);

function fieldValidate(field, regex) {
    let isValid = true;
    if (regex.test(field)) {
        field.removeClass("is-invalid");
        field.addClass("is-valid");

    } else {
        field.removeClass("is-valid");
        field.addClass("is-invalid");
        isValid = false;
    }
    console.log(regex + " " + field)
    return isValid
}


function saveChanges() {
    let isValid = true;
    console.log("Save changes");
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let phone = $('#phone').val();
    let email = $('#email').val();
    let birthday = $('#birthday').val();

    let reg = /^[A-zÀ-ú\s]+$/;
    let phonereg = /^(\d{3}[-]?){1,2}(\d{4})$/;
    let datereg = /^(\d{4})[-](\d{2})[-](\d{2})$/;
    let emailreg = /^[\w.]+@\w+\.\w+$/;


    if (reg.test(firstName)) {
        $('#firstName').removeClass("is-invalid");
        $('#firstName').addClass("is-valid");

    } else {
        $('#firstName').removeClass("is-valid");
        $('#firstName').addClass("is-invalid");
        isValid = false;
    }

    if (reg.test(lastName)) {
        $('#lastName').removeClass("is-invalid");
        $('#lastName').addClass("is-valid");

    } else {
        $('#lastName').removeClass("is-valid");
        $('#lastName').addClass("is-invalid");
        isValid = false;
    }

    if (phonereg.test(phone)) {
        $('#phone').removeClass("is-invalid");
        $('#phone').addClass("is-valid");

    } else {
        $('#phone').removeClass("is-valid");
        $('#phone').addClass("is-invalid");
        isValid = false;
    }

    if (emailreg.test(email)) {
        $('#email').removeClass("is-invalid");
        $('#email').addClass("is-valid");
    } else {
        $('#email').removeClass("is-valid");
        $('#email').addClass("is-invalid");
        isValid = false;
    }

    if (datereg.test(birthday)){
        $('#birthday').removeClass("is-invalid");
        $('#birthday').addClass("is-valid");

    } else {
        $('#birthday').removeClass("is-valid");
        $('#birthday').addClass("is-invalid");
        isValid = false;
    }

    // Some issue with validating, although it works well in the original form after making a function it breaks.
    // let fName = $('#firstName');
    // let ph = $('#phone');
    // let em = $('#email');
    // let birthd = $('#birthday');
    // let lName = $('#lastName');
    // isValid = fieldValidate(ph, phonereg);
    // isValid = fieldValidate(em, emailreg);
    // isValid = fieldValidate(birthd, datereg);
    // isValid = fieldValidate(fName, reg);
    // isValid = fieldValidate(lName, reg);

    let cleanPhone = phone.replace(/\D/g, '');
    if (isValid) {
        console.log("Valid form");
        let my_data = {first: firstName, last: lastName, email: email, phone: cleanPhone, birthday: birthday};
        console.log(my_data);

        let url = "api/name_list_edit";

        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(my_data),
            success: function(dataFromServer) {
                console.log(dataFromServer);
                updateTable();
                $('#myModal').modal('hide');
            },
            contentType: "application/json",
            dataType: 'text' // Could be JSON or whatever too
        },
        );

        return false;

    }
}

let saveChangesButton = $('#saveChanges');
saveChangesButton.on("click", saveChanges);

$(document).keydown(function(e) {
    console.log(e.keyCode);
    if(e.keyCode == 65 && !$('#myModal').is(':visible')) {
        showDialogAdd();
    }
})

function deleteItem(e) {
    console.log("Delete");
    console.log(e.target.value);
    let url = "api/name_list_delete";
    let my_data = {id: e.target.value}

    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(my_data),
        success: function(dataFromServer) {
            console.log(dataFromServer);
            updateTable();
        },
        contentType: "application/json",
        dataType: 'text'
    },
    );

}


