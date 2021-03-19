
let url = "api/name_list_get";

// Start a web call. Specify:
// URL
// Data to pass (nothing in this case)
// Function to call when we are done
$.getJSON(url, null, function(json_result) {
    $('#datatable tbody tr').remove()
        for(let i = 0; i < json_result.length; i++){
            console.log(json_result[i]);
            $('#datatable tbody').append('<tr><td>'
                +json_result[i].id
                +'</td><td>'
                +htmlSafe(json_result[i].first)
                +'</td><td>'
                +htmlSafe(json_result[i].last)
                +'</td><td>'
                +formatPhoneNumber(htmlSafe(json_result[i].phone))
                +'</td><td>'
                +getDateFromSQL(htmlSafe(json_result[i].birthday)).toLocaleDateString()
                +'</td><td>'
                +htmlSafe(json_result[i].email)
                +'</td></tr>');
        }
        console.log("done");
    }
);

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

    document.getElementById("my-form").reset();
    $('#id').removeClass("is-valid is-invalid")
    $('#firstName').removeClass("is-valid is-invalid")
    $('#lastName').removeClass("is-valid is-invalid")
    $('#email').removeClass("is-valid is-invalid")
    $('#phone').removeClass("is-valid is-invalid")
    $('#birthday').removeClass("is-valid is-invalid")


    // Clear out the values in the form.
    // Otherwise we'll keep values from when we last
    // opened or hit edit.
    // I'm getting it started, you can finish.
    $('#id').val("");
    $('#firstName').val("");
    $('#lastName').val("");
    $('#email').val("");
    $('#phone').val("");
    $('#birthday').val("");

    // Show the hidden dialog
    $('#myModal').modal('show');
}

// There's a button in the form with the ID "addItem"
// Associate the function showDialogAdd with it.
let addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);



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
            },
            contentType: "application/json",
            dataType: 'json' // Could be JSON or whatever too
        });

        location.reload();
        return false;

    }
}

let saveChangesButton = $('#saveChanges');
saveChangesButton.on("click", saveChanges);


