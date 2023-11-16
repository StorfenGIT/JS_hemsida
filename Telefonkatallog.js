const addBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const resetBtn = document.getElementById("reset-btn");
const recordContainer = document.querySelector(".record-container");
const deleteBtn = document.getElementById("delete-btn");
const editBtn = document.getElementById("edit-btn");


const name = document.getElementById("name");
const number = document.getElementById("contact-num");

let ContactArray = [];

function Contact(id, name, number) {
    this.name = name;
    this.number = number;
}

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("contacts") == null) {
        ContactArray = [];
    } else {
        ContactArray = JSON.parse(localStorage.getItem("contacts"));
        lastID(ContactArray);
    }
    displayRecord();
});

function displayRecord() {
    ContactArray.forEach(function (singleContact) {
        addToList(singleContact);
    });
}

function lastID(ContactArray) {
    if (ContactArray.length > 0) {
        id = ContactArray[ContactArray.length - 1].id;
    } else {
        id = 0;
    }
}

function addToList(item) {
    const newRecordDiv = document.createElement("div");
    newRecordDiv.classList.add("record-item");
    newRecordDiv.innerHTML = `
        <div class="record-el">
            <span id="labelling">Namn: </span>
            <span id="name-content">${item.name}</span>
        </div>

        <div class="record-el">
            <span id="labelling">Telefonnummer: </span>
            <span id="contact-num-content">${item.number}</span>
        </div>

        <button type="button" id="edit-btn">
        <span>
            <i class="fas fa-edit"></i>
        </span> Ändra
    </button>

        <button type="button" id="delete-btn">
            <span>
                <i class="fas fa-trash"></i>
            </span> Radera kontakt
        </button>
        `;
    recordContainer.appendChild(newRecordDiv);
}

recordContainer.addEventListener("click", function (event) {
    const target = event.target;

    if (event.target.id === "delete-btn") {
        
        let recordItem = event.target.parentElement;
        recordContainer.removeChild(recordItem);
        let tempContactList = ContactArray.filter(function (record) {
            return (record.id !== parseInt(recordItem.firstElementChild.lastElementChild.textContent));
            
        })
        let audio = new Audio("halloween-impact-05-93808.mp3");
        document.body.appendChild(audio);
        audio.play();
    } else if (target.id === "edit-btn") {
        
        let recordItem = target.parentElement;

        
        name.value = recordItem.querySelector("#name-content").textContent;
        number.value = recordItem.querySelector("#contact-num-content").textContent;

        
        recordContainer.removeChild(recordItem);
        let audio = new Audio("magic-mallet-6262.mp3");
        document.body.appendChild(audio);
        audio.play();
    }
    
        });
   
addBtn.addEventListener("click", function () {
    if (checkInputFields([name, number])) {
        setMessage("success", "Grattis, du har en ny kontakt!");
        id++;
        const contact = new Contact(id, name.value, number.value);
        ContactArray.push(contact);
        let audio = new Audio("tada-fanfare-a-6313.mp3");
        document.body.appendChild(audio);
        audio.play();
        
        addToList(contact);
        clearInputFields();
    } else {
        setMessage("error", "Buuuuuu, inget fält får vara tomt!");
        let audio = new Audio("no-luck-too-bad-disappointing-sound-effect-112943.mp3");
    document.body.appendChild(audio);
    audio.play();
    }
});
     
resetBtn.addEventListener('click', function () {
    
    let contactElements = document.querySelectorAll(".record-item");
    contactElements.forEach(element => {
        element.remove();
    });
    
    let audio = new Audio("wahwahwahwaaaahahahahahaha-94669.mp3");
    document.body.appendChild(audio);
    audio.play();
    alert("Det finns ingen återvändo....");
});

function setMessage(status, message) {
    let messageBox = document.querySelector(".message");
    if (status == "error") {
        messageBox.innerHTML = `${message}`;
        messageBox.classList.add("error");
        removeMessage(status, messageBox);
    }
    if (status == "success") {
        messageBox.innerHTML = `${message}`;
        messageBox.classList.add("success");
        removeMessage(status, messageBox);
    }
}

cancelBtn.addEventListener("click", function () {
    clearInputFields();
    let audio = new Audio("negative_beeps-6008.mp3");
    document.body.appendChild(audio);
    audio.play();
    
});

function clearInputFields() {
    name.value = "";
    number.value = "";
}

function removeMessage(status, messageBox) {
    setTimeout(function () {
        messageBox.classList.remove(`${status}`);
    }, 4000);
}

function checkInputFields(inputArr) {
    for (let i = 0; i < inputArr.length; i++) {
        if (inputArr[i].value === "") {
            return false;
        }
    }
    return true;
}


