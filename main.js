//VIEWS
let accountsView = document.querySelector("#accounts-view");
let addAccountsView = document.querySelector("#add-accounts-view");
let editDeleteView = document.querySelector("#edit-delete-view");
let editAccountView = document.querySelector("#edit-account-view");

let allViews = [accountsView, addAccountsView, editDeleteView, editAccountView];

let accountsTbody = accountsView.querySelector("tbody");
let editDeleteTbody = editDeleteView.querySelector("tbody");

//INPUTS

let idInput = addAccountsView.querySelector('input[name = "id"]');
let fullNameInput = addAccountsView.querySelector('input[name = "fullName"]');
let emailInput = addAccountsView.querySelector('input[name = "email"]');
let phoneInput = addAccountsView.querySelector('input[name = "phone"]');
let cityInput = addAccountsView.querySelector('input[name = "city"]');

let eidInput = editAccountView.querySelector('input[name = "id"]');
let efullNameInput = editAccountView.querySelector('input[name = "fullName"]');
let eemailInput = editAccountView.querySelector('input[name = "email"]');
let ephoneInput = editAccountView.querySelector('input[name = "phone"]');
let ecityInput = editAccountView.querySelector('input[name = "city"]');

//BTNS

let saveBtn = document.querySelector("#saveBtn");
let editBtn = document.querySelector("#editBtn");

//LINKS

let links = document.querySelectorAll(".links");

//LISTENERS

links.forEach((link) => link.addEventListener("click", displayView));
saveBtn.addEventListener("click", saveNewAccount);
editBtn.addEventListener("click", editAccount);

// FUNCTIONS

function editAccount() {
  let newValues = {
    id: eidInput.value,
    fullName: efullNameInput.value,
    email: eemailInput.value,
    phone: ephoneInput.value,
    city: ecityInput.value,
  };

  let index = database.findIndex(
    (e) => e.id === editBtn.getAttribute("data-id")
  );
  database[index] = newValues;
  createTable();
  displayView("accounts-view");
}

function displayView(e) {
  let view = e;
  if (e.type === "click") {
    e.preventDefault();
    view = this.getAttribute("href");
  }

  allViews.forEach((x) => (x.style.display = "none"));
  links.forEach((link) => link.classList.remove("active"));
  try {
    document.querySelector(`a[href="${view}"]`).classList.add("active");
  } catch {
    document
      .querySelector(`a[href="edit-delete-view"]`)
      .classList.add("active");
  }
  document.querySelector(`#${view}`).style.display = "block";

  if (view === "edit-delete-view") {
    createTable(editDeleteTbody);
  }
}

function saveNewAccount() {
  let userData = {
    id: idInput.value,
    fullName: fullNameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    city: cityInput.value,
  };

  database.push(userData);
  createTable();
  clearInputs(idInput, fullNameInput, phoneInput, emailInput, cityInput);
  displayView("accounts-view");
}

function clearInputs() {
  for (let i = 0; i < arguments.length; i++) {
    arguments[i].value = "";
  }
}

createTable();

function createTable(body) {
  let addon = ``;
  if (body) {
    addon = `
    <td>
      <button class = "btn btn-sm btn-warning editBtn" data-id ="{{id}}">Edit</button>
      <button class = "btn btn-sm btn-danger deleteBtn" data-id ="{{id}}">Delete</button>
    </td>
    `.trim();
  }
  let text = ``;
  database.forEach((user, index) => {
    text += `
          <tr>
            <td>${user.id}</td>
            <td>${user.fullName}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.city}</td>
            ${
              addon
                ? addon.replace("{{id}}", user.id).replace("{{id}}", user.id)
                : ""
            }
        </tr>
       `.trim();
  });
  addon ? (editDeleteTbody.innerHTML = text) : (accountsTbody.innerHTML = text);
  if (addon) {
    let allDeleteBtns = document.querySelectorAll(".deleteBtn");
    let allEditBtns = document.querySelectorAll(".editBtn");

    allDeleteBtns.forEach((btn, index) => {
      btn.addEventListener("click", deleteAccount);
      allEditBtns[index].addEventListener("click", showEditForm);
    });
  }
}

function showEditForm() {
  let id = this.getAttribute("data-id");
  editBtn.setAttribute("data-id", id);
  let currentUser = database.find((e) => e.id === id);
  eidInput.value = currentUser.id;
  efullNameInput.value = currentUser.fullName;
  eemailInput.value = currentUser.email;
  ephoneInput.value = currentUser.phone;
  ecityInput.value = currentUser.city;

  displayView("edit-account-view");
}

function deleteAccount() {
  let id = this.getAttribute("data-id");
  database = database.filter((el) => el.id != id);
  createTable();
  displayView("accounts-view");
}
