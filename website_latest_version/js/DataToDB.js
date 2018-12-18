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

    function DataToDB(InputData) {
        $.ajax({
            method: 'POST',

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
        console.log('Success')
    }

    // Register click handler for #request button
    $(function onDocReady() {
        // rectify
        console.log('Start');
        $('#profileInputForm').submit(handleDataToDB);
    });


    function handleDataToDB(event) {
        console.log('Start input preparation');
        var email = $('#emailInput').val();
        var firstname = $('#firstNameInput').val();
        var lastname = $('#lastNameInput').val();
        var gender = $('#genderInput').val();
        var address = $('#addressInput').val();
        var inputData = JSON.stringify({email:email,
            firstname:firstname,
            lastname:lastname,
            gender:gender,
            address:address
        });
        console.log('Start input DB');
        event.preventDefault();
        DataToDB(inputData);
        console.log('End input DB');
    }

}(jQuery));
