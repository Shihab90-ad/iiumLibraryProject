//******** Register Code ****************
//xxxxxxxx Name Validation xxxxxxxxxxxxxx
function checkUserName() {
  var userName = $("#userName").val();
  var flag = false;
  if (userName === "") {
    flag = true;
  }
  if (flag) {
    $(".btn-error-input-name").show();
  } else {
    $(".btn-error-input-name").hide();
  }
}
//xxxxxxxx Email Validation xxxxxxxxxxxxxx
function checkUserEmail() {
  var userEmail = $("#userEmail").val();
  var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var flag;
  if (userEmail.match(userEmailFormate)) {
    flag = false;
  } else {
    flag = true;
  }
  if (flag) {
    $(".btn-error-input-email").show();
  } else {
    $(".btn-error-input-email").hide();
  }
}
//xxxxxxxx Password Validation xxxxxxxxxxxxxx
function checkUserPassword() {
  var userPassword = $("#userPassword").val();
  var userPasswordFormate = /(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  var flag;
  if (userPassword.match(userPasswordFormate)) {
    flag = false;
  } else {
    flag = true;
  }
  if (flag) {
    $(".btn-error-input-pass").show();
  } else {
    $(".btn-error-input-pass").hide();
  }
}
//xxxxxxxxxxxxxxxxxxxx RePassword Checking xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
function checkUserRePass() {
  var userPassword = $("#userPassword").val();
  var userRePass = $("#userRePass").val();
  var flag = false;
  if (userPassword != userRePass) {
    flag = true;
  }
  if (flag) {
    $(".btn-error-pass").show();
    return true;
  } else {
    $(".btn-error-pass").hide();
    return false;
  }
}
//xxxxxxxxxxxxxxxxxxxx TermBox Checking xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
function checkTermBox() {
  if (!$("input[type=checkbox]").prop("checked")) {
    $(".btn-error-tick").show();
    return true;
  } else {
    $(".btn-error-tick").hide();
    return false;
  }
}
//xxxxxxxxxx Submitting and Creating new user in Firebase xxxxxxxxxxxxxxxxxxxx
function signUp() {
  var userName = $("#userName").val();
  var userEmail = $("#userEmail").val();
  var userPassword = $("#userPassword").val();
  var userQuote = "Click To Edit Qoute";
  var userFullNameFormate = /^([A-Za-z.\s_-])/;
  var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var userPasswordFormate = /(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  var checkUserNameValid = userName.match(userFullNameFormate);
  var checkUserEmailValid = userEmail.match(userEmailFormate);
  var checkUserPasswordValid = userPassword.match(userPasswordFormate);

  if (checkUserNameValid == null) {
    return checkUserName();
  } else if (checkUserEmailValid == null) {
    return checkUserEmail();
  } else if (checkUserPasswordValid == null) {
    return checkUserPassword();
  } else if (checkUserRePass()) {
    return;
  } else if (checkTermBox()) {
    return;
  } else {
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
      var user = firebase.auth().currentUser;
      var uid;
      if (user != null) {
        uid = user.uid;
      }
      var firebaseRef = firebase.database().ref('users/');
      var userData = {
        userName: userName,
        userEmail: userEmail,
        userQuote: userQuote,
      }
      firebaseRef.child(uid).set(userData);
      Swal.fire('Your Account Created', 'Your account was created successfully, you can log in now.', ).then((value) => {
        setTimeout(function() {
          window.location.replace("login.html");
        }, 1000)
      });
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      var errorTitle;

      if (errorCode === 'auth/email-already-in-use') {
        errorTitle = 'Email already in use';
      } else {
        errorTitle = 'Error Found';
      }

      Swal.fire({
        type: 'error',
        icon: 'error',
        title: errorTitle,
        text: errorMessage,
      })
    });
  }
}
//*************** Login Coode *******************
//xxxxxxxxx Sign In Email Validation xxxxxxxxxxxxxxxx
function checkUserSIEmail() {
  var userSIEmail = $("#SIemail").val();
  var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var flag;
  if (userSIEmail.match(userSIEmailFormate)) {
    flag = false;
  } else {
    flag = true;
  }
  if (flag) {
    $(".btn-error-input-email").show();
  } else {
    $(".btn-error-input-email").hide();
  }
}
//xxxxxxxxxx Sign In Password Validation xxxxxxxxxxxxxxxxxxxx
function checkUserSIPass() {
  var userSIPass = $("#SIpassword").val();
  var userSIPasswordFormate = /(?=.*[a-z])(?=.*[A-Z]).{1,}/;
  var flag;
  if (userSIPass.match(userSIPasswordFormate)) {
    flag = false;
  } else {
    flag = true;
  }
  if (flag) {
    $(".btn-error-input-pass").show();
  } else {
    $(".btn-error-input-pass").hide();
  }
}
//xxxxxxxxxx Check account exist in Firebase xxxxxxxxxxxxxxxxxxxx
function signIn() {
  var userSIEmail = $("#SIemail").val();
  var userSIPass = $("#SIpassword").val();
  var userSIPasswordFormate = /(?=.*[a-z])(?=.*[A-Z]).{1,}/;
  var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  var checkUserEmailValid = userSIEmail.match(userSIEmailFormate);
  var checkUserPasswordValid = userSIPass.match(userSIPasswordFormate);

  if (checkUserEmailValid == null) {
    return checkUserSIEmail();
  } else if (checkUserPasswordValid == null) {
    return checkUserSIPass();
  } else {
    firebase.auth().signInWithEmailAndPassword(userSIEmail, userSIPass).then((success) => {
      Swal.fire({
        type: 'successfull',
        icon: 'success',
        title: 'Succesfully signed up',
      }).then((value) => {
        setTimeout(function() {
          window.location.replace("index.html");
        }, 1000)
      });
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      var errorTitle;

      if (errorCode === 'auth/user-disabled') {
        errorTitle = 'User Disabled';
      } else if (errorCode === 'auth/user-not-found') {
        errorTitle = 'User Not Found';
      } else if (errorCode === 'auth/wrong-password') {
        errorTitle = 'Wrong Password';
      } else {
        errorTitle = 'Error Found';
      }

      Swal.fire({
        type: 'error',
        icon: 'error',
        title: errorTitle,
        text: errorMessage,
      })
    });
  }
}
//*************************** Forgot Password Code ***************************************
function resetPass() {
  var userEmail = $("#email").val();

  firebase.auth().sendPasswordResetEmail(userEmail).then((success) => {
    Swal.fire({
      type: 'successfull',
      icon: 'success',
      title: 'Succesfully Reset',
      text: 'Check your email inbox',
    }).then((value) => {
      setTimeout(function() {
        window.location.replace("login.html");
      }, 1000)
    });
  }).catch((error) => {
    // Error occurred. Inspect error.code
    var errorCode = error.code;
    var errorMessage = error.message;
    var errorTitle;

    if (errorCode === "auth/invalid-email") {
      errorTitle = 'Invalid Email';
    } else if (errorCode === "auth/user-not-found") {
      errorTitle = 'User not found';
    } else {
      errorTitle = 'Error Found'
    }

    Swal.fire({
      type: 'error',
      icon: 'error',
      title: errorTitle,
      text: errorMessage,
    })
  });
}
//************************ Sign In User Interface Change ******************************
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    $('.not-signin-ui').hide();
    $('.signin-ui').show();
  } else {
    $('.not-signin-ui').show();
    $('.signin-ui').hide();
  }
});
//************************** SIgn Out ***************************************************
function signOut() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    Swal.fire({
      type: 'successfull',
      icon: 'success',
      title: 'Signed Out',
    }).then((value) => {
      setTimeout(function() {
        window.location.replace("index.html");
      }, 1000)
    });
  }).catch(function(error) {
    // An error happened.
    var errorCode = error.code;
    var errorMessage = error.message;
    var errorTitle = 'Error Found';
    Swal.fire({
      type: 'error',
      icon: 'error',
      title: errorTitle,
      text: errorMessage,
    })
  });
}
