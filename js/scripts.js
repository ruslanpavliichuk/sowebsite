document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
    });

    document.getElementById('datePicker').addEventListener('change', function() {
        var date = this.value;
        generateTimeSlots(date);
    });
});

function generateTimeSlots(date) {
    var slotsContainer = document.getElementById('timeSlots');
    slotsContainer.innerHTML = '';
    var startTime = 17 * 60; 
    var endTime = 20 * 60; 
    var slotDuration = 45; 

    for (var time = startTime; time < endTime; time += slotDuration) {
        var slotButton = document.createElement('div');
        slotButton.className = 'time-slot';
        slotButton.innerText = `${pad(Math.floor(time / 60))}:${pad(time % 60)}`;
        slotButton.onclick = function() {
            selectTimeSlot(this.innerText, date);
        };
        slotsContainer.appendChild(slotButton);
    }
}

function selectTimeSlot(time, date) {
    document.getElementById('stage1').classList.remove('active');
    document.getElementById('stage2').classList.add('active');
    document.getElementById('progressBar').style.width = '33%'; 
    document.getElementById('bookingSummary').innerHTML = `
        <strong>Selected Time:</strong> ${date} ${time}
        <button class="modern-button" onclick="editBooking()">Edit Booking</button>
    `;
}

function launchConfetti() {
    confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6,}
    });

    completeBooking()
}

function submitDetails() {
    document.getElementById("stage2").classList.remove("active");
    document.getElementById("stage3").classList.add("active");
    document.getElementById('progressBar').style.width = '66%';

    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;

    document.getElementById("bookingSummary").innerHTML = `
        <p><strong>Name:</strong> ${name} ${surname}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
    `;

    launchConfetti();
}

function completeBooking() {
    document.getElementById('progressBar').style.width = '100%'; 
}

function goBackToStage1() {
    document.getElementById('name').value = '';
    document.getElementById('surname').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';

    document.getElementById('stage2').classList.remove('active');
    document.getElementById('stage1').classList.add('active');
    document.getElementById('progressBar').style.width = '0%'; // Reset progress bar
}

function editBooking() {
    document.getElementById('stage2').classList.remove('active');
    document.getElementById('stage1').classList.add('active');
}

function pad(n) {
    return n < 10 ? '0' + n : n;
}

document.addEventListener('DOMContentLoaded', function () {
    const formElements = document.querySelectorAll('.modern-input');
    const submitButton = document.querySelector('.modern-button');

    formElements.forEach(element => {
        element.addEventListener('blur', function () {
            validateInput(element);
        });
    });

    submitButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent form submission until validation passes
        let isValid = true;

        formElements.forEach(element => {
            validateInput(element);
            if (element.classList.contains('invalid')) {
                isValid = false;
            }
        });

        if (isValid) {
            submitDetails(); // Proceed to submit if all required fields are valid
        } else {
            console.log('Please correct the errors before submitting.');
        }
    });

    function validateInput(inputElement) {
        const inputId = inputElement.id;
        const value = inputElement.value.trim();
        const errorMessageElement = document.getElementById(`${inputId}-error`);

        // Remove previous error styles
        inputElement.classList.remove('valid', 'invalid');
        errorMessageElement.style.display = 'none';

        if (inputId === 'name' || inputId === 'surname') {
            if (!value) {
                inputElement.classList.add('invalid');
                errorMessageElement.style.display = 'block';
                errorMessageElement.textContent = `${inputId.charAt(0).toUpperCase() + inputId.slice(1)} is required.`;
            } else if (!/^[a-zA-Z]+$/.test(value)) {
                inputElement.classList.add('invalid');
                errorMessageElement.style.display = 'block';
                errorMessageElement.textContent = `${inputId.charAt(0).toUpperCase() + inputId.slice(1)} must contain only letters.`;
            } else {
                inputElement.classList.add('valid');
            }
        }

        if (inputId === 'phone') {
            if (value && !/^\d{10}$/.test(value)) { // Only validate if phone number is entered
                inputElement.classList.add('invalid');
                errorMessageElement.style.display = 'block';
                errorMessageElement.textContent = 'Phone number must be 10 digits.';
            } else {
                inputElement.classList.add('valid');
            }
        }

        if (inputId === 'email') {
            if (!value) {
                inputElement.classList.add('invalid');
                errorMessageElement.style.display = 'block';
                errorMessageElement.textContent = 'Email is required.';
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                inputElement.classList.add('invalid');
                errorMessageElement.style.display = 'block';
                errorMessageElement.textContent = 'Email must be in the format: example@domain.com.';
            } else {
                inputElement.classList.add('valid');
            }
        }
    };

    function submitDetails() {
        // Logic to proceed with the booking
        console.log('Form submitted successfully!');
    }

});

