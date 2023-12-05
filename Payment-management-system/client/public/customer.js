const viewCustomerDivnew = document.getElementById('viewCustomersnew');
const viewCustomersDiv = document.getElementById('viewCustomers');
const viewSpecificCustomerDiv = document.getElementById('viewSpecificCustomer');
const deleteCustomerDiv = document.getElementById('deleteCustomer');
const createCustomerDiv = document.getElementById('createCustomer');
const updateCustomerDiv = document.getElementById('updateCustomer');
const updateCustomernewdiv = document.getElementById('updateCustomernew')
const updatebtn1 = document.getElementById('updateCustomerBtn')
const viewSpecificCustomerDivnew = document.getElementById('viewSpecificCustomernew');


//All Customers view
function viewCustomers() {
    fetch('/allow/api/customers')
        .then(response => response.json())
        .then(data => {
            viewCustomerDivnew.innerHTML = '<button id="backViewCustomers" onclick="custbacking()">back</button>';
            data.forEach(customer => {
                const CustomerCard = document.createElement('div');
                CustomerCard.classList.add('card');
                CustomerCard.innerHTML = `
                    <h3>Customer ID: ${customer.customer_id}</h3>
                    <p>Customer Name: ${customer.customer_name}</p>
                    <p>Address: ${customer.customer_address}</p>
                    <p>Phone number: ${customer.customer_phone}</p>
                    <hr>
                `;
                viewCustomerDivnew.appendChild(CustomerCard);
            });
        })
        .catch(error => {
            console.error('Error fetching Customers:', error);
        });
}

// View Specific Customer
function viewSpecificCustomer() {
    const CustomerId = document.getElementById('viewCustomerId').value;
    if (!CustomerId) {
        alert('Please enter a Customer ID');
        custbacking1();
        return;
    }

    fetch(`/allow/api/customers/${CustomerId}`)
        .then(response => response.json())
        .then(data => {
            viewSpecificCustomerDivnew.innerHTML = '<button id="backSpecificCustomer" onclick="custbacking1()" >back</button>';

            if (data.customers && data.customers.length > 0) {
                const customer = data.customers[0];
                const customerCard = document.createElement('div');
                customerCard.classList.add('card');
                customerCard.innerHTML = `
                    <h3>Customer ID: ${customer.customer_id}</h3>
                    <p>Customer Name: ${customer.customer_name}</p>
                    <p>Address: ${customer.customer_address}</p>
                    <p>Phone number: ${customer.customer_phone}</p>
                    <hr>
                `;
                viewSpecificCustomerDivnew.appendChild(customerCard);
            } else {
                alert('No Customer found for the provided Customer ID.');
            }
        })
        .catch(error => {
            console.error('Error fetching specific Customer:', error);
        });
}


// Delete Customer
function deleteCustomer() {
    const CustomerId = document.getElementById('deleteCustomerId').value;
    if (!CustomerId) {
        alert('Please enter a Customer ID');
        return;
    }

    if (confirm('Are you sure you want to delete this Customer?')) {
        fetch(`/allow/api/customers/${CustomerId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
            })
            .catch(error => {
                console.error('Error deleting Customer:', error);
            });
    }
}


//create a new customer 
function createCustomer() {

    const customer_id = document.getElementById('createCustomerIdnew').value;
    const customer_name = document.getElementById('createName').value;
    const customer_address = document.getElementById('createAddress').value;
    const customer_phone = document.getElementById('createPhone').value;

    const CustomerData = {
        customer_id,
        customer_name,
        customer_address,
        customer_phone,
    };
    fetch(`/allow/api/customers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(CustomerData),
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            // Clear input fields after creating the customer
            document.getElementById('CustomercreateForm').reset();
        })
        .catch(error => {
            console.error('Error creating Customer:', error);
        });
}

//update customer
function updateCustomer() {
    // Get the customer ID from the input field
    const UpdatecustomerId = document.getElementById('UpdateCustomerId').value;

    // Fetch the customer data for the given customer ID
    fetch(`/allow/api/customers/${UpdatecustomerId}`)
        .then(response => response.json())
        .then(data => {
            // Check if customer data is available
            if (!(data.customers && data.customers.length > 0)) {
                alert('No customer found for the provided Customer ID.');

                return
            }
            else if (data.customers && data.customers.length > 0) {
                const customer = data.customers[0];

                // Set the values of the input fields based on the customer data
                document.getElementById('createCustomerIdnew').value = customer.customer_id;
                document.getElementById('createName').value = customer.customer_name;
                document.getElementById('createAddress').value = customer.customer_address;
                document.getElementById('createPhone').value = customer.customer_phone;


                // Display a message indicating which customer is being updated
                const texting = document.createElement('b');
                texting.setAttribute('id', 'submitTextArea1')
                texting.innerText = `Updating customer for Customer ID: ${UpdatecustomerId}`;
                updateCustomernewdiv.appendChild(texting);

                // Enable the form fields for editing
                const form = document.getElementById('createForm');
                const formInputs = form.getElementsByTagName('input');
                for (const input of formInputs) {
                    input.removeAttribute('readonly');
                }

                // Show a "Save Changes" button
                const saveButton = document.createElement('button');
                saveButton.setAttribute('id', 'submitButton1');
                saveButton.innerText = 'Save Changes';
                saveButton.addEventListener('click', saveUpdatedCustomer);
                updateCustomernewdiv.appendChild(saveButton);

                console.log("Data has been loaded for update");
            }
        })
        .catch(error => {
            console.error('Error fetching customer data:', error);
        });
}

function saveUpdatedCustomer() {
    // console.log("yes")
    const updateCustomernewdiv = document.getElementById('updateCustomernew')

    const UpdatecustomerId = document.getElementById('UpdateCustomerId').value;
    const customer_id = document.getElementById('createCustomerIdnew').value;
    const customer_name = document.getElementById('createName').value;
    const customer_address = document.getElementById('createAddress').value;
    const customer_phone = document.getElementById('createPhone').value;


    const updatedCustomerData = {
        customer_id,
        customer_name,
        customer_address,
        customer_phone,
    };

    fetch(`/allow/api/customers/${UpdatecustomerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCustomerData),
    })
        .then(response => {
            if (!response.ok) {
                alert("error occur try again")
                throw new Error('Network response was not ok');
            }
            else {
                alert('sucees cahnging');
                backing3();
                return response.json();
            }
        })
        .catch(error => {
            console.error('Error updating customer:', error);
            //alert('An error occurred while updating the customer.', error);
        });
}


//Event handlers for Customers
document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('viewCustomersBtn').addEventListener('click', () => {
        clearDivs([viewSpecificCustomerDiv, deleteCustomerDiv, createCustomerDiv, updateCustomerDiv, viewCustomersDiv]);
        viewCustomers();
    });

    document.getElementById('viewSpecificCustomerBtn').addEventListener('click', () => {
        clearDivs([viewCustomersDiv, deleteCustomerDiv, createCustomerDiv, updateCustomerDiv]);
        viewSpecificCustomer();
    });

    document.getElementById('deleteCustomerBtn').addEventListener('click', () => {
        deleteCustomer();
    });

    document.getElementById('createCustomerBtn').addEventListener('click', () => {
        updateCustomernewdiv.style.display = 'block';
        clearDivs([viewCustomersDiv, viewSpecificCustomerDiv, deleteCustomerDiv, updateCustomerDiv]);
        createCustomer();
    });

    document.getElementById('updateCustomerBtn').addEventListener('click', () => {
        updateCustomer();
        updateCustomernewdiv.style.display = 'block';
        clearDivs([viewCustomersDiv, viewSpecificCustomerDiv, deleteCustomerDiv, createCustomerDiv, updatebtn1]);
    });
});

//custbacking functions
function custbacking() {
    backdivs([viewSpecificCustomerDiv, deleteCustomerDiv, createCustomerDiv, updateCustomerDiv, viewCustomersDiv], viewCustomerDivnew);
}

function custbacking1() {
    backdivs([viewSpecificCustomerDiv, deleteCustomerDiv, createCustomerDiv, updateCustomerDiv, viewCustomersDiv], viewSpecificCustomerDivnew);
}

function custbacking2() {
    document.getElementById('CustomercreateForm').reset();
    const submitTextArea = document.getElementById('submitTextArea1');
    const submitButton = document.getElementById('submitButton1');
    if (submitTextArea && submitButton) {
        submitTextArea.parentElement.removeChild(submitTextArea);
        submitButton.parentElement.removeChild(submitButton);
    }
    updateCustomernewdiv.style.display = 'none';
    backdivs([viewSpecificCustomerDiv, deleteCustomerDiv, createCustomerDiv, updateCustomerDiv, viewCustomersDiv, updatebtn]);
}
