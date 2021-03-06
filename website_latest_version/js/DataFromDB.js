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

    function DataFromDB(InputData) {
        $.ajax({
            method: 'GET',

            // need rectify
            url: _config.api.invokeUrl + '/ride?string=' + InputData,

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
        $('#getProfile').submit(handleDataFromDB);
    });


    function handleDataFromDB(event) {
        console.log('Start send email to get value');
        var email = $('#emailInputGet').val();
        var inputData = email;
        console.log(inputData);
        event.preventDefault();
        DataFromDB(inputData);
        console.log('End send email to get value');
    }

}(jQuery));