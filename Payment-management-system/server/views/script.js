// public/js/script.js
document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signup-form');
    const signinForm = document.getElementById('signin-form');
    const errorMessage = document.getElementById('error-message');
    const signinbtn = document.getElementById('signinbtn')
    const signupbtn = document.getElementById('signupbtn')
    signinbtn.addEventListener('click', () => {
        //event.preventDefault();
        window.location.href = '/signin';
    })
    signupbtn.addEventListener('click', (submit) => {
        //submit.preventDefault(); // Prevent form submission
        window.location.href = '/signup'; // Navigate to the desired route
    });
    if (signupForm) {
        signupForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const Fullname = document.getElementById('Fullname').value;
            const Username = document.getElementById('Username').value;
            const Password = document.getElementById('Password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Basic password confirmation
            if (Password !== confirmPassword) {
                errorMessage.textContent = 'Passwords do not match.';
            } else {
                // Send form data to server for signup
                fetch('/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ Fullname, Username, Password }),
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
                            errorMessage.textContent = data.error;
                        } else {
                            // Redirect to a success page or perform other actions
                            window.location.href = '/signin';
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        });
    }

    if (signinForm) {
        signinForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const Username = document.getElementById('Username').value;
            const Password = document.getElementById('Password').value;

            // Send form data to server for signin
            fetch('/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Username, Password }),
            })
                .then(response => {
                    response.json()
                    console.log(response)
                })

                .then(data => {
                    if (data.error) {
                        console.log(data);
                        errorMessage.textContent = data.error;
                        window.location.href = '/signin';
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        });
    }
});
