
var url = "api/name_list_get";

// Start a web call. Specify:
// URL
// Data to pass (nothing in this case)
// Function to call when we are done
$.getJSON(url, null, function(json_result) {
    $('#datatable tbody:last').remove()
        for(let i = 0; i < json_result.length; i++){
            console.log(json_result[i].first);
            $('#datatable tbody:last').append('<tr><td>json_result[i].id</td><td>json_result[i].first</td><td>json_result[i].last</td>' +
                '<td>json_result[i].phone</td><td>json_result[i].birthday</td><td>json_result[i].email</td></tr>')
        }
        console.log("done");
    }
);
