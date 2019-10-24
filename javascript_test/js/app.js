class Customer {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
}
class Display {
    //Add Customer
    add(customer) {
        let customerList = document.getElementById('customerList');
        let uiString = `<li><div class="card">
        <div class="card-header">${customer.name}</div>
        <div class="card-body">${customer.email}</div>
        <div class="card-footer"></div>
        </div></li><br>`;

        customerList.innerHTML += uiString;
    }
    //Reset Customer data
    clear() {
        let customerForm = document.getElementById('customerForm');
        customerForm.reset();
    }
    //Validate Data
    validate(customer) {
        let nameregex = /^[a-zA-Z\s]+$/;
        let emailregex = /^\S+@\S+\.\S+$/;

        if (customer.name.length < 2 || nameregex.test(customer.name) === false || emailregex.test(customer.email) === false) {
            return false;
        }
        else {
            return true;
        }
    }
    //Show data in customerDetail div
    CustomerDetailData(customer) {
        let customerDetail = document.getElementById('customerDetail');

        let string = `<h2>Customer</h2><br>
                  <p><label><b><i class="fas fa-user"></i> Name: ${localStorage.getItem(name)}</b></label></p>
                  <p><label><b><i class="fas fa-envelope"></i> Email: ${localStorage.getItem(email)}</b></label></p>
                   `
        customerDetail.innerHTML += string;

    }
    //Display Alert Message
    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if (boldText == 'success') {
            boldText = 'Success';
        }
        else {
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                             ${displayMessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                         </div> `;
        setTimeout(function () {
            message.innerHTML = '';
        }, 2000);
    }
}

//Add submit event listener to customerForm
let customerForm = document.getElementById('customerForm');
customerForm.addEventListener('submit', customerFormSubmit);

function customerFormSubmit(e) {
    //Declare Variables
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;

    //Creating object
    let customer = new Customer(name, email);
    let display = new Display();

    if (display.validate(customer)) {
        display.add(customer);
        let a = localStorage.setItem(name, email);
        display.clear();
        display.show('success', 'Customer has been successfully added!');
    }
    else {
        display.show('danger', 'Please add valid content!');
    }

    e.preventDefault();
}
//Add click event listener to customerList
let customerDetail = document.getElementById('customerDetail');
let customerList = document.getElementById('customerList');

customerList.addEventListener('click', runEvent);

function runEvent(f) {
    console.log('Entered in the function');
    //Declare Variables
    let customerDetail = document.getElementById('customerDetail');
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;

    //Creating Object
    let customer = new Customer(name, email);
    let display = new Display();

    display.CustomerDetailData(customer);
    f.preventDefault();
}
//Function for Filter 
function myFunction() {
    // Declare variables
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("customerList");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName("card-header")[0];
        txtValue = a.textContent || card - header.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
//Drag and drop
function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }