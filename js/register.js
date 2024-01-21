
var windowWidth = window.innerWidth;
document.getElementById('register-' + getScreenSize(windowWidth)).addEventListener('submit', function (e) {
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
            if (response.status === 200) {
            if (localStorage.getItem('language') === 'en')
                showAlert("Registration was successful, wait for our call!", "successAlert");
            else if (localStorage.getItem('language') === 'ru')
                showAlert("Регистрация произошла успешно, ожидайте нашего звонка!", "successAlert");
            else if (localStorage.getItem('language') === 'ua')
                showAlert("Реєстрація пройшла успішно, очікуйте нашого дзвінка!", "successAlert");
            else
                showAlert("Реєстрація пройшла успішно, очікуйте нашого дзвінка!", "successAlert");
            } else if (response.status === 403) {
            if (localStorage.getItem('language') === 'en')
                showAlert("You have exceeded the number of requests of the site, call us", "dangerAlert");
            else if (localStorage.getItem('language') === 'ru')
                showAlert("Вы привысили количество запросов сайта, позвоните нам", "dangerAlert");
            else if (localStorage.getItem('language') === 'ua')
                showAlert("Ви перевищили кількість запитів сайту, зателефонуйте нам", "dangerAlert");
            else
                showAlert("Ви перевищили кількість запитів сайту, зателефонуйте нам", "dangerAlert");
            }
        })
        .catch(error => {
            // Handle any errors here
        });
});
function showAlert(message, id) {
    var existingAlert = document.querySelector(".alert");

    if (existingAlert) {
        existingAlert.remove(); // Remove any existing alert
    }

    var successAlert = document.createElement("div");
    successAlert.id = id;
    successAlert.textContent = message;
    document.body.appendChild(successAlert);


    setTimeout(function () {
        successAlert.remove(); // Remove the alert after 3 seconds
    }, 6000);
}

document.addEventListener("DOMContentLoaded", function () {
    var elements = document.getElementsByTagName("INPUT");
    for (var i = 0; i < elements.length; i++) {
        elements[i].oninvalid = function (e) {
            e.target.setCustomValidity("");
            if (e.target.validity.valueMissing) {
                if (localStorage.getItem('language') === 'en')
                    e.target.setCustomValidity("This field cannot be empty");
                else if (localStorage.getItem('language') === 'ru')
                    e.target.setCustomValidity("Это поле не может быть пустым");
                else if (localStorage.getItem('language') === 'ua')
                    e.target.setCustomValidity("Це поле не може бути порожнім");
                else
                    e.target.setCustomValidity("Це поле не може бути порожнім");
            }
            if (e.target.validity.patternMismatch) {
                if (localStorage.getItem('language') === 'en')
                    e.target.setCustomValidity("Please enter a valid phone number (+380123445678)");
                else if (localStorage.getItem('language') === 'ru')
                    e.target.setCustomValidity("Пожалуйста, введите корректный номер телефона +380123445678)");
                else if (localStorage.getItem('language') === 'ua')
                    e.target.setCustomValidity("Будь ласка, введіть коректний номер телефону (+380123445678)");
                else
                    e.target.setCustomValidity("Будь ласка, введіть коректний номер телефону (+380123445678)");
            }
            if (e.target.validity.typeMismatch) {
                if (localStorage.getItem('language') === 'en')
                    e.target.setCustomValidity("Please enter a valid email address");
                else if (localStorage.getItem('language') === 'ru')
                    e.target.setCustomValidity("Пожалуйста, введите корректный email");
                else if (localStorage.getItem('language') === 'ua')
                    e.target.setCustomValidity("Будь ласка, введіть коректний email");
                else
                    e.target.setCustomValidity("Будь ласка, введіть коректний email");
            }
        };
        elements[i].oninput = function (e) {
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

