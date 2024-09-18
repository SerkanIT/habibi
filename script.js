document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.querySelector(".forName");
  const relationshipInput = document.querySelector(".family");
  const phoneInput = document.querySelector(".smartphone");
  const contactsList = document.querySelector(".contacts");
  const getStartedBtn = document.querySelector(".getStart");
  const alertBox = document.querySelector(".alert");

  function showAlert(message, type = "error") {
    alertBox.textContent = message;
    alertBox.className = `alert ${type}`;
    alertBox.style.display = "block";

    setTimeout(() => {
      alertBox.textContent = "";
      alertBox.className = "alert";
      alertBox.style.display = "none";
    }, 1500);
  }

  function addContact() {
    const name = nameInput.value.trim();
    const relationship = relationshipInput.value.trim();
    const phone = phoneInput.value.trim();

    if (name !== "" && relationship !== "" && phone !== "") {
      const contact = { name, relationship, phone };
      const contacts = loadContacts();
      contacts.push(contact);
      saveContacts(contacts);

      renderContacts();
      nameInput.value = "";
      relationshipInput.value = "";
      phoneInput.value = "";

      showAlert("Contact added successfully", "success");
    } else {
      showAlert("Please fill in all fields.", "error");
    }
  }

  function saveContacts(contacts) {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  function loadContacts() {
    const savedContacts = localStorage.getItem("contacts");
    return savedContacts ? JSON.parse(savedContacts) : [];
  }

  function renderContacts() {
    contactsList.innerHTML = "";
    const contacts = loadContacts();

    contacts.forEach((contact, index) => {
      const newContact = document.createElement("div");
      newContact.classList.add("contactItem");
      newContact.textContent = `${contact.name} - ${contact.relationship}: ${contact.phone}`;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("deleteButton");
      deleteButton.addEventListener("click", function () {
        contacts.splice(index, 1);
        saveContacts(contacts);
        renderContacts();
        showAlert("Contact deleted", "yellow");
      });

      newContact.appendChild(deleteButton);
      contactsList.appendChild(newContact);
    });
  }

  getStartedBtn.addEventListener("click", addContact);

  renderContacts();
});
