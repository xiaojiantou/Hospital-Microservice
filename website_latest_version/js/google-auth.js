function onSignIn(googleUser){
      console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
      window.location.href = '/option.html';
}


// function onSuccess(googleUser) {
//     console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
//     window.location.href = 'ride.html';
// }
// function onFailure(error) {
//     console.log(error);
// }

// function renderButton() {
//     gapi.signin2.render('my-signin2', {
//         'scope': 'profile email',
//         'width': 240,
//         'height': 50,
//         'longtitle': true,
//         'theme': 'dark',
//         'onsuccess': onSuccess,
//         'onfailure': onFailure
//     });
// }

//   var googleUser = {};
//   var startApp = function() {
//     gapi.load('auth2', function(){
//       // Retrieve the singleton for the GoogleAuth library and set up the client.
//       auth2 = gapi.auth2.init({
//         client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
//         cookiepolicy: 'single_host_origin',
//         // Request scopes in addition to 'profile' and 'email'
//         //scope: 'additional_scope'
//       });
//       attachSignin(document.getElementById('customBtn'));
//     });
//   };

//   function attachSignin(element) {
//     console.log(element.id);
//     auth2.attachClickHandler(element, {},
//         function(googleUser) {
//           document.getElementById('name').innerText = "Signed in: " +
//               googleUser.getBasicProfile().getName();
//         }, function(error) {
//           alert(JSON.stringify(error, undefined, 2));
//         });
//   }