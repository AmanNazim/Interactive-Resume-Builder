"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
// Function to show the profile input popup
function showProfilePopup() {
    const popup = document.getElementById("profile-popup");
    if (popup) {
        popup.style.display = "block"; // Show the popup
    }
}
// Handle saving profile data (name and profile picture)
(_a = document.getElementById("saveProfileBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    const nameInput = document.getElementById("nameInput");
    const profilePicInput = document.getElementById("profilePicInput");
    const profileName = nameInput.value.trim();
    const profilePic = profilePicInput.files ? profilePicInput.files[0] : null;
    if (profileName) {
        // Save the name to localStorage
        localStorage.setItem("profileName", profileName);
        if (profilePic) {
            // Save the profile picture to localStorage (as a base64 string)
            const reader = new FileReader();
            reader.onloadend = () => {
                localStorage.setItem("profilePic", reader.result);
                // Update profile name and profile picture on the page
                updateProfile(profileName, reader.result);
                // Close the popup
                closeProfilePopup();
            };
            reader.readAsDataURL(profilePic); // Read the image as a base64 string
        }
        else {
            // If no picture is uploaded, just update the profile name
            updateProfile(profileName, "");
            // Close the popup
            closeProfilePopup();
        }
    }
    else {
        alert("Please enter your name.");
    }
});
// Function to update profile name and profile picture from localStorage
function updateProfile(name, image) {
    // Get resume template elements
    const resumeOutputs = document.querySelectorAll(".resume-section main");
    const resumeProfilePics = [
        document.getElementById("resume1-profile-pic"),
        document.getElementById("resume2-profile-pic"),
        document.getElementById("resume3-profile-pic"),
    ];
    if (resumeOutputs) {
        resumeOutputs.forEach((resume) => {
            const profileDiv = resume.querySelector("#profile-div h1");
            if (profileDiv)
                profileDiv.textContent = name;
        }); // Update the name
    }
    if (resumeProfilePics && image) {
        resumeProfilePics.forEach((pic) => {
            pic.src = image; // Update the profile picture
        });
    }
}
// Function to initialize profile from localStorage (called on page load)
function initializeProfile() {
    const storedName = localStorage.getItem("profileName");
    const storedPic = localStorage.getItem("profilePic");
    if (storedName) {
        // Update profile if name exists in localStorage
        updateProfile(storedName, storedPic || "");
    }
    else {
        // If no name in localStorage, show the profile input popup
        showProfilePopup();
    }
}
// Function to close the profile input popup
function closeProfilePopup() {
    const popup = document.getElementById("profile-popup");
    if (popup) {
        popup.style.display = "none"; // Close the popup
    }
}
// Initialize the profile on page load
document.addEventListener("DOMContentLoaded", () => {
    initializeProfile();
});
//managing inputs lists dynamically using a class to define fucnctionality one time and use one
//functionailty for both languages and skills input.
class ListsManager {
    //important constructor need to apply functionality
    constructor(inputList, inputsClass, addButton, maxAdds) {
        //assining private variables to constructor parameter to work with private variables
        this.inputList = inputList;
        this.inputsClass = inputsClass;
        this.inputAddButton = addButton;
        this.maxAdds = maxAdds;
        this.buttonContainer = document.createElement("div");
        //initializing functionality
        this.initialize();
    }
    initialize() {
        // Wrap button in container.
        this.buttonContainer.appendChild(this.inputAddButton);
        //add container to list
        this.inputList.appendChild(this.buttonContainer);
        //function neccessary to initialize
        //initializing update button visibility function.
        this.updateButtonVisibility();
        //initializing managing event listeners function.
        this.setupEventListeners();
        //initializing add enter event listener function.
        this.addEnterHandlersToExisting();
    }
    //function to set event listener to add input by clicking on input button and remove through backspace.
    setupEventListeners() {
        this.inputAddButton.addEventListener("click", (e) => {
            e.preventDefault();
            //calling add new input function.
            this.addNewInput();
        });
        //removing inputs using handleBackspace function.
        this.inputList.addEventListener("keydown", (e) => this.handleBackspace(e));
    }
    //function of adding new inputs which is used by setupEventListeners function to add inputs dynamically using event listener
    addNewInput() {
        //storing inputs in a variable using get inputs function.
        const currentInputs = this.getInputs();
        //conditioning using maxadds number to stop.
        if (currentInputs.length >= this.maxAdds)
            return;
        //creating new list item if max adds not reached one at a time.
        const newListItem = document.createElement("li");
        //making inputs tag in each new li and adding class dynamically using private inputsClass variable.
        newListItem.innerHTML = `<input type="text" class="${this.inputsClass}">`;
        // Insert before the button container using insert before method
        this.inputList.insertBefore(newListItem, this.buttonContainer);
        //storing new input in a variable
        const newInput = newListItem.querySelector("input");
        //focusing on new input by using variable in which new input is stored
        newInput.focus();
        //initializing addEnterHandler to add inputs using enter button and which is defined in this function.
        this.addEnterHandler(newInput);
        //updating button visibility and also hide it when max input reached using this function
        this.updateButtonVisibility();
    }
    //handling backspace events for removing inputs using this function
    handleBackspace(event) {
        //if keyboard key is not equal to backspace then return back
        if (event.key !== "Backspace")
            return;
        //storing active input in a variable.
        const targetInput = event.target;
        //if active input variable have value or if parent element then return back.
        if (targetInput.value || !targetInput.parentElement)
            return;
        const inputs = this.getInputs();
        if (inputs.length <= 1)
            return;
        // Store current li using targeted input parent element.
        const currentListItem = targetInput.parentElement;
        //store previous li using current stored li's previous sibling element.
        const prevListItem = currentListItem.previousElementSibling;
        //removing current li using remove method.
        currentListItem.remove();
        // Focusing on previous input using previous li stored variable by storing it in new variable.
        if (prevListItem) {
            const prevInput = prevListItem.querySelector("input");
            prevInput === null || prevInput === void 0 ? void 0 : prevInput.focus();
        }
        //updating button visibility and also hide it when max input reached using this function
        this.updateButtonVisibility();
    }
    //function to set addEnterHandler to active or existing input.
    addEnterHandlersToExisting() {
        //using for each loop to apply event listeners to each input using getInputs for getting all inputs.
        this.getInputs().forEach((input) => {
            // applying functionality to each input.
            this.addEnterHandler(input);
        });
    }
    //function to add inputs by pressing enter using enter event listener.
    addEnterHandler(input) {
        //applying event listener to input parameter which will be dynamically defined in different functions.
        input.addEventListener("keydown", (e) => {
            //conditioning for enter key.
            if (e.key === "Enter") {
                e.preventDefault();
                //add new input if enter key press.
                this.addNewInput();
            }
        });
    }
    //function for getting all inputs.
    getInputs() {
        //storing input in inputList using class of all inputs which will be added dynamically.
        return this.inputList.querySelectorAll(`.${this.inputsClass}`);
    }
    //function to update button visibility.
    updateButtonVisibility() {
        //setting visiblity function to dynamic button by using style and display property.
        this.inputAddButton.style.display =
            //checking if this.getInputs lenght is greater than or equal to max adds if yes than diplay none
            //if not then display flex.
            this.getInputs().length >= this.maxAdds ? "none" : "flex";
    }
}
// Initialization function for both languages and skills inputs inside event listener after detecting dom content.
document.addEventListener("DOMContentLoaded", () => {
    // Skills
    new ListsManager(
    //Defining input list dynamically by using id.
    document.querySelector("#skills-input-list"), 
    // defining inputs dynamically by using inputs class.
    "skill-inputs", 
    //defining input button dynamically by using it's id.
    document.querySelector("#add-skill-inputs-button"), 
    //defining max adds dynamically.
    5);
    // Languages
    new ListsManager(
    //Defining input list dynamically by using id.
    document.querySelector("#languages-input-list"), 
    // defining inputs dynamically by using inputs class.
    "person-lang-input", 
    //defining input button dynamically by using it's id.
    document.querySelector("#add-languages-inputs-button"), 
    //defining max adds dynamically.
    4);
});
//for themes Selection
//accessing resume templates using dom by id and storing in variables.
const resumeOutput = document.getElementById("resume-output");
const resume2Output = document.getElementById("resume2-output");
const resume3Output = document.getElementById("resume3-output");
//accessing themes div using dom by id and storing in variables.
const theme1 = document.getElementById("theme1");
const theme2 = document.getElementById("theme2");
const theme3 = document.getElementById("theme3");
// Function to switch resume templates using switch case by matching and using themes that were access using dom.
const switchTheme = (theme) => {
    //appling hidden class to hide all templates.
    resumeOutput.classList.add("hidden");
    resume2Output.classList.add("hidden");
    resume3Output.classList.add("hidden");
    //using switch case to remove hidden class from template of which theme is seleted to make it visible.
    switch (theme) {
        //checking if theme1 then remove hidden from it's resume ouput to make visible.
        case "theme1":
            resumeOutput.classList.remove("hidden");
            break;
        //checking if theme2 then remove hidden from it's resume ouput to make visible.
        case "theme2":
            resume2Output.classList.remove("hidden");
            break;
        //checking if theme3 then remove hidden from it's resume ouput to make visible.
        case "theme3":
            resume3Output.classList.remove("hidden");
            break;
        //and defaultly remove hidden from first resume template to actually make it visible by default
        default:
            resumeOutput.classList.remove("hidden");
    }
};
// Event listeners for themes for checking which theme is selected and then initializing switch theme function for switching theme which is selected.
theme1.addEventListener("click", () => switchTheme("theme1"));
theme2.addEventListener("click", () => switchTheme("theme2"));
theme3.addEventListener("click", () => switchTheme("theme3"));
// Default settings
resumeOutput.classList.remove("hidden");
resume2Output.classList.add("hidden");
// Function to handle profile picture upload and update resume templates
function handleProfilePictureUpload() {
    //accessing profile picture input using dom by it's id.
    const profilePictureInput = document.getElementById("profile-picture-input");
    //accessing all templates img tags by there id.
    // Array of profile picture elements in the resume templates
    const resumeProfilePics = [
        document.getElementById("resume1-profile-pic"),
        document.getElementById("resume2-profile-pic"),
        document.getElementById("resume3-profile-pic"),
    ];
    // Add event listener for file input change
    profilePictureInput.addEventListener("change", (event) => {
        var _a;
        const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0]; // Get the uploaded file
        if (file) {
            const reader = new FileReader(); // Create a FileReader instance
            // When the file is read, update the profile picture in all resume templates
            reader.onload = (e) => {
                var _a;
                const imageUrl = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result; // Get the image URL in string format in a variable.
                // Update the profile picture in all resume templates by using forEach method.
                resumeProfilePics.forEach((img) => {
                    // applying target variable to a img source to update it.
                    if (img)
                        img.src = imageUrl;
                });
            };
            reader.readAsDataURL(file); // Read the file as a data URL.
        }
    });
}
// Initialize the functionality of profile picture upload.
window.onload = () => {
    handleProfilePictureUpload();
};
// Function to update resume templates dynamically
function updateResumeTemplates() {
    // Get form inputs through dom by there id.
    const profileText = document.getElementById("profile-text");
    const personName = document.getElementById("person-name");
    const personEmail = document.getElementById("person-email");
    const personContact = document.getElementById("person-contact");
    const personAddress = document.getElementById("person-address");
    const personEducation = document.getElementById("person-education");
    const personWorkExperience = document.getElementById("person-work-experience");
    const profilePictureInput = document.getElementById("profile-picture-input");
    // Get resume template elements
    const resumeOutputs = document.querySelectorAll(".resume-section main");
    // Update profile text
    profileText.addEventListener("input", () => {
        resumeOutputs.forEach((resume) => {
            const profileDiv = resume.querySelector("#profile-div h5");
            if (profileDiv)
                profileDiv.textContent = profileText.value;
        });
    });
    // Update personal information
    personName.addEventListener("input", () => {
        resumeOutputs.forEach((resume) => {
            const nameHeading = resume.querySelector("#profile-div h1");
            if (nameHeading)
                nameHeading.textContent = personName.value;
        });
    });
    personEmail.addEventListener("input", () => {
        resumeOutputs.forEach((resume) => {
            const emailSpan = resume.querySelector(".em-span");
            if (emailSpan)
                emailSpan.textContent = personEmail.value;
        });
    });
    personContact.addEventListener("input", () => {
        resumeOutputs.forEach((resume) => {
            const contactSpan = resume.querySelector(".con-span");
            if (contactSpan)
                contactSpan.textContent = personContact.value;
        });
    });
    personAddress.addEventListener("input", () => {
        resumeOutputs.forEach((resume) => {
            const addressSpan = resume.querySelector(".Add-span");
            if (addressSpan)
                addressSpan.textContent = personAddress.value;
        });
    });
    // Update education
    personEducation.addEventListener("input", () => {
        resumeOutputs.forEach((resume) => {
            const educationDiv = resume.querySelector("#Edu-div p");
            if (educationDiv) {
                // Preserve exact whitespace and line breaks
                const formattedText = personEducation.value
                    .replace(/\n{3,}/g, "\n\n") // Replace 3+ line breaks with 2
                    .replace(/\r\n|\r|\n/g, "<br>") // Convert all line break types to <br>
                    .split(" ")
                    .map((word) => word.trim())
                    .filter((word) => word.length > 0)
                    .join("&nbsp;");
                educationDiv.style.width = "100%";
                educationDiv.style.display = "block";
                educationDiv.style.whiteSpace = "normal";
                educationDiv.style.wordBreak = "keep-all";
                educationDiv.style.overflowWrap = "break-word";
                educationDiv.style.textAlign = "left";
                educationDiv.innerHTML = formattedText;
            }
        });
    });
    // Update experience
    personWorkExperience.addEventListener("input", () => {
        resumeOutputs.forEach((resume) => {
            const experienceDiv = resume.querySelector("#exp-div p");
            if (experienceDiv) {
                // Preserve exact whitespace and line breaks
                const formattedText = personWorkExperience.value
                    .replace(/\n{3,}/g, "\n\n") // Replace 3+ line breaks with 2
                    .replace(/\r\n|\r|\n/g, "<br>") // Convert all line break types to <br>
                    .split(" ")
                    .map((word) => word.trim())
                    .filter((word) => word.length > 0)
                    .join("&nbsp;");
                experienceDiv.style.width = "100%";
                experienceDiv.style.display = "block";
                experienceDiv.style.whiteSpace = "normal";
                experienceDiv.style.wordBreak = "keep-all";
                experienceDiv.style.overflowWrap = "break-word";
                experienceDiv.style.textAlign = "left";
                experienceDiv.innerHTML = formattedText;
            }
        });
    });
}
// Language Handler with Column Logic
document.addEventListener("input", (e) => {
    const target = e.target;
    if (target.classList.contains("person-lang-input")) {
        const allLangInputs = document.querySelectorAll(".person-lang-input");
        const index = Array.prototype.slice.call(allLangInputs).indexOf(target);
        document.querySelectorAll(".resume-section main").forEach((resume) => {
            const langContainer = resume.querySelector(".per-inf-div ol");
            if (!langContainer)
                return;
            // Column handling logic
            const columnIndex = Math.floor(index / 2);
            const liIndex = index % 2;
            let column = langContainer.querySelectorAll("div")[columnIndex];
            if (!column) {
                column = document.createElement("div");
                langContainer.appendChild(column);
            }
            const items = column.querySelectorAll("li");
            if (items[liIndex]) {
                items[liIndex].textContent = target.value;
            }
            else {
                const newLi = document.createElement("li");
                newLi.textContent = target.value;
                column.appendChild(newLi);
            }
        });
    }
});
// Original Skill Handler (No Column Logic)
document.addEventListener("input", (e) => {
    const target = e.target;
    if (target.classList.contains("skill-inputs")) {
        const allSkillInputs = document.querySelectorAll(".skill-inputs");
        const index = Array.prototype.slice.call(allSkillInputs).indexOf(target);
        document.querySelectorAll(".resume-section main").forEach((resume) => {
            const skillList = resume.querySelector(".resume-template-section ul");
            if (!skillList)
                return;
            const items = skillList.querySelectorAll("li");
            if (items[index]) {
                items[index].textContent = target.value;
            }
            else {
                const newLi = document.createElement("li");
                newLi.textContent = target.value;
                skillList.appendChild(newLi);
            }
        });
    }
});
// Initialize the functionality
window.onload = () => {
    updateResumeTemplates();
};
const SELECTORS = {
    buttons: ".hide-buttons",
    formSection: (type) => `[data-section="${type}"]`,
    resumeSection: (type) => `[data-resume-section="${type}"]`,
    educationDiv: "#Edu-div", // Updated selector for education section
};
class SectionToggler {
    constructor() {
        this.initializeButtons();
    }
    initializeButtons() {
        const buttons = Array.prototype.slice.call(document.querySelectorAll(SELECTORS.buttons));
        buttons.forEach((button) => {
            button.addEventListener("click", (e) => this.handleToggle(e));
        });
    }
    handleToggle(event) {
        const button = event.target;
        const sectionType = button.dataset.section;
        if (!this.isValidSection(sectionType)) {
            console.error("Invalid section type");
            return;
        }
        const formSection = document.querySelector(SELECTORS.formSection(sectionType));
        const resumeSections = Array.prototype.slice.call(document.querySelectorAll(SELECTORS.resumeSection(sectionType)));
        const sections = [formSection, ...resumeSections].filter(Boolean);
        sections.forEach((section) => {
            section.classList.toggle("hidden");
        });
        this.updateButtonText(button, sectionType);
        // New height adjustment functionality
        if (sectionType === "experience") {
            this.adjustEducationHeight();
        }
    }
    adjustEducationHeight() {
        const educationDiv = document.querySelector(SELECTORS.educationDiv);
        if (educationDiv) {
            const experienceHidden = document.querySelectorAll(`${SELECTORS.resumeSection("experience")}.hidden`).length > 0;
            educationDiv.style.maxHeight = experienceHidden ? "66.6%" : "";
        }
    }
    updateButtonText(button, sectionType) {
        var _a;
        const isHidden = ((_a = button.textContent) === null || _a === void 0 ? void 0 : _a.indexOf("Show")) === 0;
        const action = isHidden ? "Hide" : "Show";
        button.textContent = `${action} ${this.capitalize(sectionType)}`;
    }
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    isValidSection(value) {
        return (["experience", "skills"].indexOf(value) !== -1);
    }
}
// Initialize when ready
document.addEventListener("DOMContentLoaded", () => {
    new SectionToggler();
});
// Add dynamic input fields
document.addEventListener("DOMContentLoaded", () => {
    // Skills and languages input handlers
    document.querySelectorAll(".inputs-Button").forEach((button) => {
        button.addEventListener("click", () => {
            const isSkillButton = button.id === "add-skill-inputs-button";
            const listId = isSkillButton
                ? "#skills-input-list"
                : "#languages-input-list";
            const inputClass = isSkillButton ? "skill-inputs" : "person-lang-input";
            const newInput = document.createElement("li");
            newInput.innerHTML = `<input type="text" class="${inputClass}">`;
            const list = document.querySelector(listId);
            list === null || list === void 0 ? void 0 : list.insertBefore(newInput, button);
        });
    });
});
// Handle theme selection
document.querySelectorAll(".themes").forEach((theme) => {
    theme.addEventListener("click", () => {
        document
            .querySelectorAll(".themes")
            .forEach((t) => t.classList.remove("selected"));
        theme.classList.add("selected");
    });
});
// Generate Resume handler
(_b = document
    .querySelector(".generate-resume")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // Validate theme selection
    const selectedTheme = (_a = document.querySelector(".themes.selected")) === null || _a === void 0 ? void 0 : _a.id;
    if (!selectedTheme) {
        showError("Please select a theme first!");
        return;
    }
    // Validate required fields
    const requiredFields = [
        { id: "person-name", name: "Name" },
        { id: "person-email", name: "Email" },
        { id: "person-contact", name: "Contact" },
        { id: "person-address", name: "Address" },
    ];
    const emptyField = requiredFields.find((field) => {
        const element = document.getElementById(field.id);
        return !element.value.trim();
    });
    if (emptyField) {
        showError(`Please fill in the ${emptyField.name} field`);
        (_b = document.getElementById(emptyField.id)) === null || _b === void 0 ? void 0 : _b.focus();
        return;
    }
    // Collect form data
    const resumeData = {
        theme: selectedTheme,
        profile: {
            name: document.getElementById("person-name").value.trim(),
            email: document.getElementById("person-email").value.trim(),
            contact: document.getElementById("person-contact").value.trim(),
            address: document.getElementById("person-address").value.trim(),
            profileText: document.getElementById("profile-text").value.trim(),
            profileImage: undefined,
        },
        education: document.getElementById("person-education").value.trim(),
        experience: document.getElementById("person-work-experience").value.trim(),
        skills: Array.from(document.querySelectorAll(".skill-inputs"))
            .map((input) => input.value.trim())
            .filter(Boolean),
        languages: Array.from(document.querySelectorAll(".person-lang-input"))
            .map((input) => input.value.trim())
            .filter(Boolean),
    };
    // Handle profile image
    const imageInput = document.getElementById("profile-picture-input");
    const imageFile = (_c = imageInput.files) === null || _c === void 0 ? void 0 : _c[0];
    if (imageFile) {
        try {
            const imageUrl = yield readFileAsDataURL(imageFile);
            resumeData.profile.profileImage = imageUrl;
        }
        catch (error) {
            showError("Failed to process profile image. Please try again.");
            return;
        }
    }
    // Save data and redirect with theme parameter
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    window.location.href = `resume-output.html?theme=${selectedTheme}`;
}));
// Helper functions
function showError(message) {
    var _a;
    const existingError = document.querySelector(".error-message");
    if (existingError)
        existingError.remove();
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.style.cssText = `
    color: #dc3545;
    padding: 0.5rem;
    margin: 0.5rem 0;
    border: 1px solid #f8d7da;
    border-radius: 4px;
    background: #f8d7da;
  `;
    errorElement.textContent = message;
    const generateBtn = document.querySelector(".generate-resume");
    (_a = generateBtn === null || generateBtn === void 0 ? void 0 : generateBtn.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(errorElement, generateBtn);
}
function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => { var _a; return resolve((_a = e.target) === null || _a === void 0 ? void 0 : _a.result); };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}
//# sourceMappingURL=main.js.map