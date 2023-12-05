
const viewPaymentsDivnew = document.getElementById('viewPaymentsnew')
const viewPaymentsDiv = document.getElementById('viewPayments');
const viewSpecificPaymentDiv = document.getElementById('viewSpecificPayment');
const deletePaymentDiv = document.getElementById('deletePayment');
const createPaymentDiv = document.getElementById('createPayment');
const updatePaymentDiv = document.getElementById('updatePayment');
const viewSpecificPaymentDivnew = document.getElementById('viewSpecificPaymentnew');
const updatePaymentnewdiv = document.getElementById('updatePaymentnew')
const updatebtn = document.getElementById('updatePaymentBtn')

// View Payments
function viewPayments() {
    fetch('/allow/api/payments')
        .then(response => response.json())
        .then(data => {
            viewPaymentsDivnew.innerHTML = '<button id="backViewPayments" onclick="backing1()" >back</button>';
            data.forEach(payment => {
                const paymentCard = document.createElement('div');
                paymentCard.classList.add('card');
                paymentCard.innerHTML = `
                    <h3>Payment ID: ${payment.payment_id}</h3>
                    <p>Customer ID: ${payment.customer_id}</p>
                    <p>Amount: ${payment.amount}</p>
                    <p>Payment Date: ${payment.payment_date}</p>
                    <p>payment method : ${payment.payment_method}</p>
                    <p>Status: ${payment.status}</p>
                    <p>invoice Number: ${payment.invoice_number}</p>
                    <p>transaction Id: ${payment.transaction_id}</p>
                    <p>card type : ${payment.card_type}</p>
                    <p>card Number : ${payment.card_number}</p>
                    <hr>
                `;
                viewPaymentsDivnew.appendChild(paymentCard);
            });
        })
        .catch(error => {
            console.error('Error fetching payments:', error);
        });
}

// View Specific Payment
function viewSpecificPayment() {
    const paymentId = document.getElementById('viewPaymentId').value;
    if (!paymentId) {
        alert('Please enter a Payment ID');
        backing2();
        return;
    }
    fetch(`/allow/api/payments/${paymentId}`)
        .then(response => response.json())
        .then(data => {
            viewSpecificPaymentDivnew.innerHTML = '<button id="backSpecificPayments" onclick="backing2()" >back</button>';

            if (data.payments && data.payments.length > 0) {
                const payment = data.payments[0];
                const paymentCard = document.createElement('div');
                paymentCard.classList.add('card');
                paymentCard.innerHTML = `
                    <h3>Payment ID: ${payment.payment_id}</h3>
                    <p>Customer ID: ${payment.customer_id}</p>
                    <p>Amount: ${payment.amount}</p>
                    <p>Payment Date: ${payment.payment_date}</p>
                    <p>payment method : ${payment.payment_method}</p>
                    <p>Status: ${payment.status}</p>
                    <p>invoice Number: ${payment.invoice_number}</p>
                    <p>transaction Id: ${payment.transaction_id}</p>
                    <p>card type : ${payment.card_type}</p>
                    <p>card Number : ${payment.card_number}</p>
                    <hr>
                `;
                viewSpecificPaymentDivnew.appendChild(paymentCard);
            } else {
                alert('No payment found for the provided Payment ID.');
            }
        })
        .catch(error => {
            console.error('Error fetching specific payment:', error);
        });
}


// Delete Payment
function deletePayment() {
    const paymentId = document.getElementById('deletePaymentId').value;
    if (!paymentId) {
        alert('Please enter a Payment ID');
        return;
    }

    if (confirm('Are you sure you want to delete this payment?')) {
        fetch(`/allow/api/payments/${paymentId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
            })
            .catch(error => {
                console.error('Error deleting payment:', error);
            });
    }
}

// Create Payment
function createPayment() {

    const customer_id = document.getElementById('createCustomerId').value;
    const amount = document.getElementById('createAmount').value;
    const payment_date = document.getElementById('createPaymentDate').value;
    const payment_method = document.getElementById('createPaymentMethod').value;
    const status = document.getElementById('createStatus').value;
    const invoice_number = document.getElementById('createInvoiceNumber').value;
    const transaction_id = document.getElementById('createTransactionId').value;
    const card_type = document.getElementById('createCardType').value;
    const card_number = document.getElementById('createCardNumber').value;

    const paymentData = {
        customer_id,
        amount,
        payment_date,
        payment_method,
        status,
        invoice_number,
        transaction_id,
        card_type,
        card_number,
    };
    fetch(`/allow/api/payments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            // Clear input fields after creating the payment
            document.getElementById('createForm').reset();
        })
        .catch(error => {
            console.error('Error creating payment:', error);
        });
}

// Update Payment
function updatePayment() {
    const updatePaymentnewdiv = document.getElementById('updatePaymentnew');

    // Get the payment ID from the input field
    const UpdatepaymentId = document.getElementById('UpdatePaymentId').value;

    // Fetch the payment data for the given payment ID
    fetch(`/allow/api/payments/${UpdatepaymentId}`)
        .then(response => response.json())
        .then(data => {
            // Check if payment data is available
            if (!(data.payments && data.payments.length > 0)) {
                alert('No payment found for the provided Payment ID.');
                return
            }
            else if (data.payments && data.payments.length > 0) {
                const payment = data.payments[0];

                // Set the values of the input fields based on the payment data
                document.getElementById('createCustomerId').value = payment.customer_id;
                document.getElementById('createAmount').value = payment.amount;
                document.getElementById('createPaymentDate').value = payment.payment_date;
                document.getElementById('createPaymentMethod').value = payment.payment_method;
                document.getElementById('createStatus').value = payment.status;
                document.getElementById('createInvoiceNumber').value = payment.invoice_number;
                document.getElementById('createTransactionId').value = payment.transaction_id;
                document.getElementById('createCardType').value = payment.card_type;
                document.getElementById('createCardNumber').value = payment.card_number;

                // Display a message indicating which payment is being updated
                const texting = document.createElement('b');
                texting.setAttribute('id', 'submitTextArea')
                texting.innerText = `Updating payment for Payment ID: ${UpdatepaymentId}`;
                updatePaymentnewdiv.appendChild(texting);

                // Enable the form fields for editing
                const form = document.getElementById('createForm');
                const formInputs = form.getElementsByTagName('input');
                for (const input of formInputs) {
                    input.removeAttribute('readonly');
                }

                // Show a "Save Changes" button
                const saveButton = document.createElement('button');
                saveButton.setAttribute('id', 'submitButton')
                saveButton.innerText = 'Save Changes';
                saveButton.addEventListener('click', saveUpdatedPayment);
                updatePaymentnewdiv.appendChild(saveButton);

                console.log("Data has been loaded for update");
            }
        })
        .catch(error => {
            console.error('Error fetching payment data:', error);
        });
}

function saveUpdatedPayment() {
    // console.log("yes")
    const updatePaymentnewdiv = document.getElementById('updatePaymentnew')

    const UpdatepaymentId = document.getElementById('UpdatePaymentId').value;
    const customer_id = document.getElementById('createCustomerId').value;
    const amount = document.getElementById('createAmount').value;
    const payment_date = document.getElementById('createPaymentDate').value;
    const payment_method = document.getElementById('createPaymentMethod').value;
    const status = document.getElementById('createStatus').value;
    const invoice_number = document.getElementById('createInvoiceNumber').value;
    const transaction_id = document.getElementById('createTransactionId').value;
    const card_type = document.getElementById('createCardType').value;
    const card_number = document.getElementById('createCardNumber').value;

    const updatedPaymentData = {
        customer_id,
        amount,
        payment_date,
        payment_method,
        status,
        invoice_number,
        transaction_id,
        card_type,
        card_number,
    };

    fetch(`/allow/api/payments/${UpdatepaymentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPaymentData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            else {
                alert('sucees cahnging');
                backing3();
                return response.json();
            }
        })
        .catch(error => {
            console.error('Error updating payment:', error);
            //alert('An error occurred while updating the payment.', error);
        });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('viewPaymentsBtn').addEventListener('click', () => {
        clearDivs([viewSpecificPaymentDiv, deletePaymentDiv, createPaymentDiv, updatePaymentDiv, viewPaymentsDiv]);
        viewPayments();
    });

    document.getElementById('viewSpecificPaymentBtn').addEventListener('click', () => {
        clearDivs([viewPaymentsDiv, deletePaymentDiv, createPaymentDiv, updatePaymentDiv]);
        viewSpecificPayment();
    });

    document.getElementById('deletePaymentBtn').addEventListener('click', () => {
        deletePayment();
    });

    document.getElementById('createPaymentBtn').addEventListener('click', () => {
        updatePaymentnewdiv.style.display = 'block';
        clearDivs([viewPaymentsDiv, viewSpecificPaymentDiv, deletePaymentDiv, updatePaymentDiv]);
        createPayment();
    });

    document.getElementById('updatePaymentBtn').addEventListener('click', () => {
        updatePayment();
        updatePaymentnewdiv.style.display = 'block';
        clearDivs([viewPaymentsDiv, viewSpecificPaymentDiv, deletePaymentDiv, createPaymentDiv, updatebtn]);

    });
});

function clearDivs(divs) {
    for (const div of divs) {
        div.style.display = 'none';
    }
}

function backdivs(divs, div1) {
    const paymenting = document.getElementById('payments');
    const customering = document.getElementById('customers');
    for (const div of divs) {
        div.style.display = 'block';
    }
    div1.innerHTML = '';
    if (paymenting.style.display == 'block') {
        showPaymentsSection();
    }
    else if (customering.style.display == 'block') {
        showCustomersSection();
    }
}

//viewpayments back button function
function backing1() {
    backdivs([viewSpecificPaymentDiv, deletePaymentDiv, createPaymentDiv, updatePaymentDiv, viewPaymentsDiv], viewPaymentsDivnew);
}

function backing2() {
    backdivs([viewSpecificPaymentDiv, deletePaymentDiv, createPaymentDiv, updatePaymentDiv, viewPaymentsDiv], viewSpecificPaymentDivnew);
}

function backing3() {

    document.getElementById('createForm').reset();
    const submitTextArea = document.getElementById('submitTextArea');
    const submitButton = document.getElementById('submitButton');
    if (submitTextArea && submitButton) {
        submitTextArea.parentElement.removeChild(submitTextArea);
        submitButton.parentElement.removeChild(submitButton);
    }
    updatePaymentnewdiv.style.display = 'none';

    backdivs([viewSpecificPaymentDiv, deletePaymentDiv, createPaymentDiv, updatePaymentDiv, viewPaymentsDiv, updatebtn]);
}

function init() {
    const paymentsLink = document.querySelector('a[href="#payments"]');
    const customersLink = document.querySelector('a[href="#customers"]');

    paymentsLink.addEventListener('click', showPaymentsSection);
    customersLink.addEventListener('click', showCustomersSection);
    showPaymentsSection();
}

function showPaymentsSection() {
    document.getElementById('payments').style.display = 'block';
    document.getElementById('customers').style.display = 'none';
}
function showCustomersSection() {

    document.getElementById('payments').style.display = 'none';
    document.getElementById('customers').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', init);