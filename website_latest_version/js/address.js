var WildRydes = window.WildRydes || {};
WildRydes.map = WildRydes.map || {};

(function rideScopeWrapper($) {

    var authToken;
    WildRydes.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            window.location.href = '/signin.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/signin.html';
    });

    function Address(InputData) {
        $.ajax({
            method: 'GET',

            // need rectify
            url: 'https://vc685eiaf9.execute-api.us-west-2.amazonaws.com/prod' + '/street?string=' + "560W 43rd St, New York, NY, 10036",

            headers: {
                Authorization: authToken
            },
            crossDomain:true,
            data: InputData,
            contentType : 'application/json',
            success: completeRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error Saving: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when Saving profile:\n' + jqXHR.responseText);
            }
        });
    }

    function completeRequest(result) {
        console.log('Response received from API: ', result);
        console.log('Data received from API: ', result.body.Item.body);

        for(var prop in result.body.Item.body){
            document.write(result.body.Item.body[prop]+" <br>");
        }
    }

    // Register click handler for #request button
    $(function onDocReady() {
        console.log('Start');
        $('#addressForm').submit(handleDataFromDB);
    });


    function handleDataFromDB(event) {
        console.log('Start send address to get value');
        var address = $('#addressInputGet').val();
        var city = $('#cityInputGet').val();
        var state = $('#stateInputGet').val();
        var zip = $('#zipInputGet').val();
        var inputData = address;
        console.log(inputData);
        event.preventDefault();
        Address("test");
        console.log('End send address to get value');
    }

}(jQuery));