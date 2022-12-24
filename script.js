var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

function register() {
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  full_name = document.getElementById("full_name").value;
  Age = document.getElementById("Age").value;
  Date = document.getElementById("Date").value;
  if (validate_email(email) == false) {
    alert("Email is incorrect");
    return;
  }
  if (validate_password(password) == false) {
    alert("Password is incorrect");
    return;
  }
  if (
    validate_field(full_name) == false 
  ) {
    alert("Enter Name");
    return;
  }
  if (
    validate_field(Age) == false 
  ) {
    alert("Enter Age");
    return;
  }
  if (
    validate_field(Date) == false
  ) {
    alert("Enter Date of birth");
    return;
  }
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      var user = auth.currentUser;
      var database_ref = database.ref();
      var user_data = {
        email: email,
        full_name: full_name,
        Age: Age,
        Date: Date,
        last_login: Date.now(),
      };
      database_ref.child("users/" + user.uid).set(user_data);
      alert("User Created!!");
    })
    .catch(function (error) {
      var error_code = error.code;
      var error_message = error.message;
      alert(error_message);
    });
}
function login() {
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  if (validate_email(email) == false) {
    alert("Email is incorrect");
    return;
  }
  if (validate_password(password) == false) {
    alert("Password is incorrect");
    return;
  }
  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      var user = auth.currentUser;
      var database_ref = database.ref();
      var user_data = {
        last_login: Date.now(),
      };
      database_ref.child("users/" + user.uid).update(user_data);
      alert("User Logged In!!");
    })
    .catch(function (error) {
      var error_code = error.code;
      var error_message = error.message;
      alert(error_message);
    });
}

function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    return true;
  } else {
    return false;
  }
}

function validate_password(password) {
  if (password < 9) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }
  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}
