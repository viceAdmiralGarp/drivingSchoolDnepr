
var windowWidth = window.innerWidth;
document.getElementById('register-' + getScreenSize(windowWidth)).addEventListener('submit', function(e) {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic dXNlcjo4YTJhODdkNC00ZTM0LTRlMjUtYmJiMi03YWJmNjk3MjAxMmU=");
    myHeaders.append("Content-Type", "application/json");
 
    var fullName = document.getElementById('name_' + getScreenSize(windowWidth)).value;
    var phoneNumber = document.getElementById('phone_' + getScreenSize(windowWidth)).value;
    var email = document.getElementById('email_' + getScreenSize(windowWidth)).value;

    var data = {
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email
    };

    fetch('https://secure-fortress-93208-8703d6dae399.herokuapp.com/register', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data)
    })
    .then(response => {
        var existingAlert = document.querySelector(".alert");
      
        if (existingAlert) {
          existingAlert.remove(); // Remove any existing alert
        }
        
        var successAlert = document.createElement("div");
      successAlert.id = "successAlert";
      successAlert.textContent = "Регистрация произошла успешно, ожидайте нашего звонка!";
      document.body.appendChild(successAlert);

        
        setTimeout(function() {
          successAlert.remove(); // Remove the alert after 3 seconds
        }, 6000);
  
    })
    .catch(error => {
        // Handle any errors here
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var elements = document.getElementsByTagName("INPUT");
    for (var i = 0; i < elements.length; i++) {
        elements[i].oninvalid = function(e) {
            e.target.setCustomValidity("");
            if (e.target.validity.valueMissing) {
                e.target.setCustomValidity("Это поле не может быть пустым");
            }
            if (e.target.validity.typeMismatch) {
                e.target.setCustomValidity("Пожалуйста, введите корректный email");
            }
        };
        elements[i].oninput = function(e) {
            e.target.setCustomValidity("");
        };
    }
})

function getScreenSize(windowWidth) {
    if (windowWidth <= 576)
      return '576'
    else if (windowWidth <= 768)
      return '768'
    else if (windowWidth > 769)
      return '992'
  }
  
