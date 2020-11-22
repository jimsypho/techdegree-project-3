const nameField = document.querySelector('#name');
const jobRoleSelect = document.querySelector('#title');
const jobRole = document.querySelectorAll('#title option');
const otherJobRole = document.querySelector('#other-title');
const shirtDesign = document.querySelector('#design');
const shirtDesignOption = document.querySelectorAll('#design option');
const shirtColor = document.querySelector('#color');
const shirtColorOption = document.querySelectorAll('#color option');
const noThemeSelected = document.createElement('option');
const activitiesCheckboxes = document.querySelectorAll('.activities input');
const activityCostContainer = document.createElement('div');
let totalActivityCost = 0;
const payment = document.querySelector('#payment');
const paymentOption = document.querySelectorAll('#payment option');

// On page load put the name field in focus
nameField.focus();

// Hide the job role text field with JS in case JS is disabled
otherJobRole.style.display = 'none';

// Show the text field if other select option is selected
jobRoleSelect.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherJobRole.style.display = 'block';
    } else {
        otherJobRole.style.display = 'none';
    }
})

const colorLabel = document.querySelector('label[for="color"]');
colorLabel.textContent = 'Color: (Please Select A T-shirt Design)';

shirtDesign[0].setAttribute('value', 'select theme');
for (let i = 0; i < shirtColorOption.length; i++ ) {
    shirtColorOption[i].hidden = true;
    shirtColor.style.display = 'none';
}

shirtDesign.addEventListener('change', (e) => {
    shirtDesign[0].hidden = 'true';
    colorLabel.textContent = 'Color:';
    
        if (e.target.value === 'js puns') {
            //shirtColorOption[0].textContent = 'Cornflower Blue (JS Puns shirt only)';
            shirtColor.style.display = 'block';
            shirtColorOption[0].hidden = false;
            shirtColorOption[1].hidden = false;
            shirtColorOption[2].hidden = false;
            shirtColorOption[0].selected = true;

            for (let i = 3; i < shirtColorOption.length; i++) {
            shirtColorOption[i].hidden = true;
            }
        } else if (e.target.value === 'heart js') {  
            shirtColor.style.display = 'block'; 
            shirtColorOption[0].hidden = true;
            shirtColorOption[1].hidden = true;
            shirtColorOption[2].hidden = true;
            shirtColorOption[3].hidden = false;
            shirtColorOption[4].hidden = false;
            shirtColorOption[5].hidden = false;
            shirtColorOption[3].selected = true;
        } 
});

// Activities Section

const activities = document.querySelector('.activities');
const activitiesLabel = document.querySelectorAll('.activities label');
activities.appendChild(activityCostContainer);
activities.addEventListener('change', (e) => {
    const clickedActivity = e.target;
    const checkedDayTime = e.target.getAttribute('data-day-and-time');
    let activityCost = e.target.getAttribute('data-cost');
    for (let i = 0; i < activitiesCheckboxes.length; i++) {
        let activitiesDayTime = activitiesCheckboxes[i].getAttribute('data-day-and-time');
        if (activitiesDayTime === checkedDayTime && clickedActivity !== activitiesCheckboxes[i]) {
            if (clickedActivity.checked){
                activitiesCheckboxes[i].disabled = true;
                activitiesLabel[i].style.color = 'gray';
            } else {
                activitiesCheckboxes[i].disabled = false;
                activitiesLabel[i].style.color = 'black';
            }
        }
    }
    if (clickedActivity.checked) {
        totalActivityCost = totalActivityCost + parseInt(activityCost);
    } else {
        totalActivityCost = totalActivityCost - parseInt(activityCost);
    }
    activityCostContainer.textContent = `Total: $${totalActivityCost}`;
})

// Payment Info Section

const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
paypal.style.display = 'none';
bitcoin.style.display = 'none';
payment.value = 'credit card';
paymentOption[0].hidden = true;

payment.addEventListener('change', (e) => {
    paymentOption[0].hidden = true;
    if (e.target.value === 'credit card') {
        creditCard.style.display = 'block';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    } else if (e.target.value === 'paypal') {
        paypal.style.display = 'block';
        creditCard.style.display = 'none';
        bitcoin.style.display = 'none';
    } else if (e.target.value === 'bitcoin') {
        bitcoin.style.display = 'block';
        paypal.style.display = 'none';
        creditCard.style.display = 'none';
    }
})

// Name Validation Variables And Error Message
const form = document.querySelector('form');
const nameErrorMessage = document.createElement('div');
nameErrorMessage.style.color = 'red';
nameErrorMessage.textContent = '* Valid name is required';
const nameLabel = document.querySelector('label[for="name"]');
const name = nameField.value;

const nameValidation = () => {
    if (nameField.value.length > 0) {
        return true;
    } else {
        nameField.style.borderColor = 'red';
        nameLabel.appendChild(nameErrorMessage);
    }
}

// Email Validation Regex And Error Message
const emailField = document.querySelector('#mail');
const email = emailField.value;
const emailErrorMessage = document.createElement('div');
emailErrorMessage.style.color = 'red';
emailErrorMessage.textContent = '* Valid email is required';
const emailLabel = document.querySelector('label[for="mail"]');
const emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i;

const emailValidation = () => {
    /* Email Validation */
    if (emailRegex.test(emailField.value)) {
        return true;
    } else {
        emailField.style.borderColor = 'red';
        emailLabel.appendChild(emailErrorMessage);
    }
}

// Credit Card Validation Regex And Error Message
const creditCardNumberRegex = /^[0-9]{13,16}$/;
const creditCardField = document.querySelector('#cc-num');
const creditCardNumberErrorMessage = document.createElement('div');
creditCardNumberErrorMessage.textContent = '* Valid credit card number between 13 and 16 digits is required';
creditCardNumberErrorMessage.style.color = 'red';
const creditCardLabel = document.querySelector('label[for="cc-num"]');

const creditCardNumberValidation = () => {
    if (creditCardNumberRegex.test(creditCardField.value) || creditCardField.value !== '') {
        return true;
    } else {
        creditCardField.style.borderColor = 'red';
        creditCardLabel.appendChild(creditCardNumberErrorMessage);
    }
}

// Zipcode Validation Regex And Error Message
const zipCodeRegex = /^[0-9]{5}$/;
const zipCodeField = document.querySelector('#zip');
const zipCodeErrorMessage = document.createElement('div');
zipCodeErrorMessage.textContent = '* Valid zipcode that is 5 digits long is required';
zipCodeErrorMessage.style.color = 'red';
const zipCodeLabel = document.querySelector('label[for="zip"]');

const zipCodeValidation = () => {
    if (zipCodeRegex.test(zipCodeField.value)) {
        return true;
    } else {
        zipCodeField.style.borderColor = 'red';
        zipCodeLabel.appendChild(zipCodeErrorMessage);
    }
}

// CVV Validation Regex And Error Message
const cvvRegex = /^[0-9]{3}$/;
const cvvField = document.querySelector('#cvv');
const cvvErrorMessage = document.createElement('div');
cvvErrorMessage.textContent = '* Valid cvv number that is 3 digits long is required';
cvvErrorMessage.style.color = 'red';
const cvvLabel = document.querySelector('label[for="cvv"]');

const cvvValidation = () => {
    if (cvvRegex.test(cvvField.value)) {
        return true;
    } else {
        cvvField.style.borderColor = 'red';
        cvvLabel.appendChild(cvvErrorMessage);
    }
}

// Activities Registration Validation Error Message
const activitiesErrorMessage = document.createElement('div');
activitiesErrorMessage.textContent = '* Please check at least one activity';
activitiesErrorMessage.style.color = 'red';

const activitiesValidation = () => {
    for (let i = 0; i < activitiesCheckboxes.length; i++) {
        if (activitiesCheckboxes[i].checked === true) {
            return true;
        }
    }
    activities.appendChild(activitiesErrorMessage);
}

form.addEventListener('submit', (e) => {
    /* Name Validation */

    if (!nameValidation()) {
        e.preventDefault();
    }

    /* Email Validation */
    if (!emailValidation()) {
        e.preventDefault();
    }

    /* Credit Card Validation */
    if (payment.value === 'credit card') {
        /* Credit card number validation */

        if (!creditCardNumberValidation()) {
            e.preventDefault();
        }

        if (!zipCodeValidation()) {
            e.preventDefault();
        }

        if (!cvvValidation()) {
            e.preventDefault();
        }
    }

    if (!activitiesValidation()) {
        e.preventDefault();
    }
})
