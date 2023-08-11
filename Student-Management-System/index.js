function back() {
    const backButton = document.createElement('button');
    backButton.textContent = 'Go Back to Home';

    backButton.addEventListener('click', () => {
        window.location.href = '/index.html';
    });
    document.body.appendChild(backButton);
}

function addStudent() {
    const regno = prompt("Enter your registration number:");
    const name = prompt("Enter your name:");

    const data = `${regno}\t${name}\t00\t00\t`;

    // file upload logic or API call to save the data

    console.log("Student added successfully!");
}

function findStudent() {
    const regno = prompt("Enter your registration number:");

    //  file read logic or API call to fetch the data

    // Example data
    const data = `2023001\tJohn Doe\t90\t85\t`;

    const lines = data.split('\n');
    let found = false;
    let table = ` <table><tr><th>Registration Number</th><th>Name</th><th>CSE1001 mark</th><th>CSE1002 mark</th></tr>`;

    for (let i = 0; i < lines.length; i++) {
        const parts = lines[i].split('\t');

        if (parts[0] === regno) {
            table += ` <tr><td>${parts[0]}</td><td>${parts[1]}</td><td>${parts[2]}</td><td>${parts[3]}</td></tr>`;
            found = true;
            break;
        }
    }

    table += '</table>';

    if (!found) {
        table = "No such registration number found!";
    }

    back();
}

function facultyLogin() {
    const facultyID = prompt("Enter your faculty ID:");

    // Implement the logic to validate the faculty login credentials
    if (facultyID === "12345") {
        console.log("Faculty login successful!");
        // Add the functionality specific to faculty login
        // Example: Display faculty-specific menu options
        const menu = ` <p>Welcome,
                Faculty !</p><ol><li>View Students</li><li>Grade Students</li></ol>`;
        document.getElementById('output').innerHTML = menu;
    }

    else {
        console.log("Invalid faculty ID!");
    }

    back();
}

function proctorLogin() {
    const proctorID = prompt("Enter your proctor ID:");

    // Implement the logic to validate the proctor login credentials

    if (proctorID === "ABCDE") {
        console.log("Proctor login successful!");
        // Add the functionality specific to proctor login
        // Example: Display proctor-specific menu options
        const menu = ` <p>Welcome,
                Proctor !</p><ol><li>View Students</li><li>Update Attendance</li></ol>`;
        document.getElementById('output').innerHTML = menu;
    }

    else {
        console.log("Invalid proctor ID!");
    }

    back();
}

function adminView() {
    // Replace with your file read logic or APIcall to fetch the student records

    // Example data
    const data = `2023001\tJohn Doe\t90\t85\tABCDE 2023002\tJane Smith\t75\t80\tFGHIJ 2023003\tDavid Johnson\t85\t90\tKLMNO`;

    const lines = data.split('\n');
    let table = ` <table><tr><th>Registration Number</th><th>Name</th><th>CSE1001 mark</th><th>CSE1002 mark</th><th>Proctor ID</th></tr>`;

    lines.forEach((line) => {
        const parts = line.split('\t');
        table += ` <tr> <td>${parts[0]}</td> <td>${parts[1]}</td> <td>${parts[2]}</td> <td>${parts[3]}</td> <td>${parts[4]}</td> </tr> `;
    });

    table += '</table>';

    document.getElementById('output').innerHTML = table;
    back();
}

function exit() {
    console.log("Exiting...");
    // Add any cleanup or exit logic here
}

function displayMenu() {
    const menu = ` <p>Available operations: </p> <ol> <li><button onclick="addStudent()" >Add New Students</button></li> <li><button onclick="findStudent()" >Student Login</button></li> <li><button onclick="facultyLogin()" >Faculty Login</button></li> <li><button onclick="proctorLogin()" >Proctor Login</button></li> <li><button onclick="adminView()" >Admin View</button></li> <li><button onclick="exit()" >Exit</button></li> </ol> `;

    document.getElementById('output').innerHTML = menu;
}

displayMenu();
