//BL for AddressBook

function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId+= 1;
  return this.currentId;
}


AddressBook.prototype.findContact = function(id){
  for (var i = 0; i < this.contacts.length; i ++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

//BL for ADDRESS
function Address(personal, work) {
  this.personal = personal,
  this.work = work;

}


//BL for Contacts
Contact.prototype.addEmail = function(email) {

}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}


function Contact(firstName, lastName, phoneNum, email, address) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNum = phoneNum;
  this.email    = email;
  this.address  = address;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
var addressBook = new AddressBook();

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmail = $("input#new-email").val();
    var inputtedPersonalAddress = $("input#new-personal-address").val();
    var inputtedWorkAddress = $("input#new-work-address").val();

    if(!inputtedPersonalAddress) {
      $(".personal-address").remove();
    }
    if(!inputtedWorkAddress) {
      $(".work-address").remove();
    }

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email").val("");
    $("input#new-personal-address").val("");
    $("input#new-work-address").val("");

    var newAddress = new Address(inputtedPersonalAddress, inputtedWorkAddress);

    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, newAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
    console.log(addressBook.contacts);
  })
})

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + " " + contact.email + " " + contact.address.personal + " " + contact.address.work  + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNum);
  $(".email").html(contact.email);
  $(".personal-address p").html(contact.address.personal);
  $(".work-address").html(contact.address.work);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">DELETE</button>")
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  })
  $("#buttons").on("click", ".deleteButton", function(){
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  })
};
