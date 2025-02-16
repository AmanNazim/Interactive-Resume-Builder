var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a, _b;
var _this = this;
// Function to show the profile input popup
function showProfilePopup() {
    var popup = document.getElementById("profile-popup");
    if (popup) {
        popup.style.display = "block"; // Show the popup
    }
}
// Handle saving profile data (name and profile picture)
(_a = document.getElementById("saveProfileBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    var nameInput = document.getElementById("nameInput");
    var profilePicInput = document.getElementById("profilePicInput");
    var profileName = nameInput.value.trim();
    var profilePic = profilePicInput.files ? profilePicInput.files[0] : null;
    if (profileName) {
        // Save the name to localStorage
        localStorage.setItem("profileName", profileName);
        if (profilePic) {
            // Save the profile picture to localStorage (as a base64 string)
            var reader_1 = new FileReader();
            reader_1.onloadend = function () {
                localStorage.setItem("profilePic", reader_1.result);
                // Update profile name and profile picture on the page
                updateProfile(profileName, reader_1.result);
                // Close the popup
                closeProfilePopup();
            };
            reader_1.readAsDataURL(profilePic); // Read the image as a base64 string
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
    var resumeOutputs = document.querySelectorAll(".resume-section main");
    var resumeProfilePics = [
        document.getElementById("resume1-profile-pic"),
        document.getElementById("resume2-profile-pic"),
        document.getElementById("resume3-profile-pic"),
    ];
    if (resumeOutputs) {
        resumeOutputs.forEach(function (resume) {
            var profileDiv = resume.querySelector("#profile-div h1");
            if (profileDiv)
                profileDiv.textContent = name;
        }); // Update the name
    }
    if (resumeProfilePics && image) {
        resumeProfilePics.forEach(function (pic) {
            pic.src = image; // Update the profile picture
        });
    }
}
// Function to initialize profile from localStorage (called on page load)
function initializeProfile() {
    var storedName = localStorage.getItem("profileName");
    var storedPic = localStorage.getItem("profilePic");
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
    var popup = document.getElementById("profile-popup");
    if (popup) {
        popup.style.display = "none"; // Close the popup
    }
}
// Initialize the profile on page load
document.addEventListener("DOMContentLoaded", function () {
    initializeProfile();
});
//managing inputs lists dynamically using a class to define fucnctionality one time and use one
//functionailty for both languages and skills input.
var ListsManager = /** @class */ (function () {
    //important constructor need to apply functionality
    function ListsManager(inputList, inputsClass, addButton, maxAdds) {
        //assining private variables to constructor parameter to work with private variables
        this.inputList = inputList;
        this.inputsClass = inputsClass;
        this.inputAddButton = addButton;
        this.maxAdds = maxAdds;
        this.buttonContainer = document.createElement("div");
        //initializing functionality
        this.initialize();
    }
    ListsManager.prototype.initialize = function () {
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
    };
    //function to set event listener to add input by clicking on input button and remove through backspace.
    ListsManager.prototype.setupEventListeners = function () {
        var _this = this;
        this.inputAddButton.addEventListener("click", function (e) {
            e.preventDefault();
            //calling add new input function.
            _this.addNewInput();
        });
        //removing inputs using handleBackspace function.
        this.inputList.addEventListener("keydown", function (e) { return _this.handleBackspace(e); });
    };
    //function of adding new inputs which is used by setupEventListeners function to add inputs dynamically using event listener
    ListsManager.prototype.addNewInput = function () {
        //storing inputs in a variable using get inputs function.
        var currentInputs = this.getInputs();
        //conditioning using maxadds number to stop.
        if (currentInputs.length >= this.maxAdds)
            return;
        //creating new list item if max adds not reached one at a time.
        var newListItem = document.createElement("li");
        //making inputs tag in each new li and adding class dynamically using private inputsClass variable.
        newListItem.innerHTML = "<input type=\"text\" class=\"".concat(this.inputsClass, "\">");
        // Insert before the button container using insert before method
        this.inputList.insertBefore(newListItem, this.buttonContainer);
        //storing new input in a variable
        var newInput = newListItem.querySelector("input");
        //focusing on new input by using variable in which new input is stored
        newInput.focus();
        //initializing addEnterHandler to add inputs using enter button and which is defined in this function.
        this.addEnterHandler(newInput);
        //updating button visibility and also hide it when max input reached using this function
        this.updateButtonVisibility();
    };
    //handling backspace events for removing inputs using this function
    ListsManager.prototype.handleBackspace = function (event) {
        //if keyboard key is not equal to backspace then return back
        if (event.key !== "Backspace")
            return;
        //storing active input in a variable.
        var targetInput = event.target;
        //if active input variable have value or if parent element then return back.
        if (targetInput.value || !targetInput.parentElement)
            return;
        var inputs = this.getInputs();
        if (inputs.length <= 1)
            return;
        // Store current li using targeted input parent element.
        var currentListItem = targetInput.parentElement;
        //store previous li using current stored li's previous sibling element.
        var prevListItem = currentListItem.previousElementSibling;
        //removing current li using remove method.
        currentListItem.remove();
        // Focusing on previous input using previous li stored variable by storing it in new variable.
        if (prevListItem) {
            var prevInput = prevListItem.querySelector("input");
            prevInput === null || prevInput === void 0 ? void 0 : prevInput.focus();
        }
        //updating button visibility and also hide it when max input reached using this function
        this.updateButtonVisibility();
    };
    //function to set addEnterHandler to active or existing input.
    ListsManager.prototype.addEnterHandlersToExisting = function () {
        var _this = this;
        //using for each loop to apply event listeners to each input using getInputs for getting all inputs.
        this.getInputs().forEach(function (input) {
            // applying functionality to each input.
            _this.addEnterHandler(input);
        });
    };
    //function to add inputs by pressing enter using enter event listener.
    ListsManager.prototype.addEnterHandler = function (input) {
        var _this = this;
        //applying event listener to input parameter which will be dynamically defined in different functions.
        input.addEventListener("keydown", function (e) {
            //conditioning for enter key.
            if (e.key === "Enter") {
                e.preventDefault();
                //add new input if enter key press.
                _this.addNewInput();
            }
        });
    };
    //function for getting all inputs.
    ListsManager.prototype.getInputs = function () {
        //storing input in inputList using class of all inputs which will be added dynamically.
        return this.inputList.querySelectorAll(".".concat(this.inputsClass));
    };
    //function to update button visibility.
    ListsManager.prototype.updateButtonVisibility = function () {
        //setting visiblity function to dynamic button by using style and display property.
        this.inputAddButton.style.display =
            //checking if this.getInputs lenght is greater than or equal to max adds if yes than diplay none
            //if not then display flex.
            this.getInputs().length >= this.maxAdds ? "none" : "flex";
    };
    return ListsManager;
}());
// Initialization function for both languages and skills inputs inside event listener after detecting dom content.
document.addEventListener("DOMContentLoaded", function () {
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
var resumeOutput = document.getElementById("resume-output");
var resume2Output = document.getElementById("resume2-output");
var resume3Output = document.getElementById("resume3-output");
//accessing themes div using dom by id and storing in variables.
var theme1 = document.getElementById("theme1");
var theme2 = document.getElementById("theme2");
var theme3 = document.getElementById("theme3");
// Function to switch resume templates using switch case by matching and using themes that were access using dom.
var switchTheme = function (theme) {
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
theme1.addEventListener("click", function () { return switchTheme("theme1"); });
theme2.addEventListener("click", function () { return switchTheme("theme2"); });
theme3.addEventListener("click", function () { return switchTheme("theme3"); });
// Default settings
resumeOutput.classList.remove("hidden");
resume2Output.classList.add("hidden");
// Function to handle profile picture upload and update resume templates
function handleProfilePictureUpload() {
    //accessing profile picture input using dom by it's id.
    var profilePictureInput = document.getElementById("profile-picture-input");
    //accessing all templates img tags by there id.
    // Array of profile picture elements in the resume templates
    var resumeProfilePics = [
        document.getElementById("resume1-profile-pic"),
        document.getElementById("resume2-profile-pic"),
        document.getElementById("resume3-profile-pic"),
    ];
    // Add event listener for file input change
    profilePictureInput.addEventListener("change", function (event) {
        var _a;
        var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0]; // Get the uploaded file
        if (file) {
            var reader = new FileReader(); // Create a FileReader instance
            // When the file is read, update the profile picture in all resume templates
            reader.onload = function (e) {
                var _a;
                var imageUrl = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result; // Get the image URL in string format in a variable.
                // Update the profile picture in all resume templates by using forEach method.
                resumeProfilePics.forEach(function (img) {
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
window.onload = function () {
    handleProfilePictureUpload();
};
// Function to update resume templates dynamically
function updateResumeTemplates() {
    // Get form inputs through dom by there id.
    var profileText = document.getElementById("profile-text");
    var personName = document.getElementById("person-name");
    var personEmail = document.getElementById("person-email");
    var personContact = document.getElementById("person-contact");
    var personAddress = document.getElementById("person-address");
    var personEducation = document.getElementById("person-education");
    var personWorkExperience = document.getElementById("person-work-experience");
    var profilePictureInput = document.getElementById("profile-picture-input");
    // Get resume template elements
    var resumeOutputs = document.querySelectorAll(".resume-section main");
    // Update profile text
    profileText.addEventListener("input", function () {
        resumeOutputs.forEach(function (resume) {
            var profileDiv = resume.querySelector("#profile-div h5");
            if (profileDiv)
                profileDiv.textContent = profileText.value;
        });
    });
    // Update personal information
    personName.addEventListener("input", function () {
        resumeOutputs.forEach(function (resume) {
            var nameHeading = resume.querySelector("#profile-div h1");
            if (nameHeading)
                nameHeading.textContent = personName.value;
        });
    });
    personEmail.addEventListener("input", function () {
        resumeOutputs.forEach(function (resume) {
            var emailSpan = resume.querySelector(".em-span");
            if (emailSpan)
                emailSpan.textContent = personEmail.value;
        });
    });
    personContact.addEventListener("input", function () {
        resumeOutputs.forEach(function (resume) {
            var contactSpan = resume.querySelector(".con-span");
            if (contactSpan)
                contactSpan.textContent = personContact.value;
        });
    });
    personAddress.addEventListener("input", function () {
        resumeOutputs.forEach(function (resume) {
            var addressSpan = resume.querySelector(".Add-span");
            if (addressSpan)
                addressSpan.textContent = personAddress.value;
        });
    });
    // Update education
    personEducation.addEventListener("input", function () {
        resumeOutputs.forEach(function (resume) {
            var educationDiv = resume.querySelector("#Edu-div p");
            if (educationDiv) {
                // Preserve exact whitespace and line breaks
                var formattedText = personEducation.value
                    .replace(/\n{3,}/g, "\n\n") // Replace 3+ line breaks with 2
                    .replace(/\r\n|\r|\n/g, "<br>") // Convert all line break types to <br>
                    .split(" ")
                    .map(function (word) { return word.trim(); })
                    .filter(function (word) { return word.length > 0; })
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
    personWorkExperience.addEventListener("input", function () {
        resumeOutputs.forEach(function (resume) {
            var experienceDiv = resume.querySelector("#exp-div p");
            if (experienceDiv) {
                // Preserve exact whitespace and line breaks
                var formattedText = personWorkExperience.value
                    .replace(/\n{3,}/g, "\n\n") // Replace 3+ line breaks with 2
                    .replace(/\r\n|\r|\n/g, "<br>") // Convert all line break types to <br>
                    .split(" ")
                    .map(function (word) { return word.trim(); })
                    .filter(function (word) { return word.length > 0; })
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
document.addEventListener("input", function (e) {
    var target = e.target;
    if (target.classList.contains("person-lang-input")) {
        var allLangInputs = document.querySelectorAll(".person-lang-input");
        var index_1 = Array.prototype.slice.call(allLangInputs).indexOf(target);
        document.querySelectorAll(".resume-section main").forEach(function (resume) {
            var langContainer = resume.querySelector(".per-inf-div ol");
            if (!langContainer)
                return;
            // Column handling logic
            var columnIndex = Math.floor(index_1 / 2);
            var liIndex = index_1 % 2;
            var column = langContainer.querySelectorAll("div")[columnIndex];
            if (!column) {
                column = document.createElement("div");
                langContainer.appendChild(column);
            }
            var items = column.querySelectorAll("li");
            if (items[liIndex]) {
                items[liIndex].textContent = target.value;
            }
            else {
                var newLi = document.createElement("li");
                newLi.textContent = target.value;
                column.appendChild(newLi);
            }
        });
    }
});
// Original Skill Handler (No Column Logic)
document.addEventListener("input", function (e) {
    var target = e.target;
    if (target.classList.contains("skill-inputs")) {
        var allSkillInputs = document.querySelectorAll(".skill-inputs");
        var index_2 = Array.prototype.slice.call(allSkillInputs).indexOf(target);
        document.querySelectorAll(".resume-section main").forEach(function (resume) {
            var skillList = resume.querySelector(".resume-template-section ul");
            if (!skillList)
                return;
            var items = skillList.querySelectorAll("li");
            if (items[index_2]) {
                items[index_2].textContent = target.value;
            }
            else {
                var newLi = document.createElement("li");
                newLi.textContent = target.value;
                skillList.appendChild(newLi);
            }
        });
    }
});
// Initialize the functionality
window.onload = function () {
    updateResumeTemplates();
};
var SELECTORS = {
    buttons: ".hide-buttons",
    formSection: function (type) { return "[data-section=\"".concat(type, "\"]"); },
    resumeSection: function (type) { return "[data-resume-section=\"".concat(type, "\"]"); },
    educationDiv: "#Edu-div", // Updated selector for education section
};
var SectionToggler = /** @class */ (function () {
    function SectionToggler() {
        this.initializeButtons();
    }
    SectionToggler.prototype.initializeButtons = function () {
        var _this = this;
        var buttons = Array.prototype.slice.call(document.querySelectorAll(SELECTORS.buttons));
        buttons.forEach(function (button) {
            button.addEventListener("click", function (e) { return _this.handleToggle(e); });
        });
    };
    SectionToggler.prototype.handleToggle = function (event) {
        var button = event.target;
        var sectionType = button.dataset.section;
        if (!this.isValidSection(sectionType)) {
            console.error("Invalid section type");
            return;
        }
        var formSection = document.querySelector(SELECTORS.formSection(sectionType));
        var resumeSections = Array.prototype.slice.call(document.querySelectorAll(SELECTORS.resumeSection(sectionType)));
        var sections = __spreadArray([formSection], resumeSections, true).filter(Boolean);
        sections.forEach(function (section) {
            section.classList.toggle("hidden");
        });
        this.updateButtonText(button, sectionType);
        // New height adjustment functionality
        if (sectionType === "experience") {
            this.adjustEducationHeight();
        }
    };
    SectionToggler.prototype.adjustEducationHeight = function () {
        var educationDiv = document.querySelector(SELECTORS.educationDiv);
        if (educationDiv) {
            var experienceHidden = document.querySelectorAll("".concat(SELECTORS.resumeSection("experience"), ".hidden")).length > 0;
            educationDiv.style.maxHeight = experienceHidden ? "66.6%" : "";
        }
    };
    SectionToggler.prototype.updateButtonText = function (button, sectionType) {
        var _a;
        var isHidden = ((_a = button.textContent) === null || _a === void 0 ? void 0 : _a.indexOf("Show")) === 0;
        var action = isHidden ? "Hide" : "Show";
        button.textContent = "".concat(action, " ").concat(this.capitalize(sectionType));
    };
    SectionToggler.prototype.capitalize = function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    SectionToggler.prototype.isValidSection = function (value) {
        return (["experience", "skills"].indexOf(value) !== -1);
    };
    return SectionToggler;
}());
// Initialize when ready
document.addEventListener("DOMContentLoaded", function () {
    new SectionToggler();
});
// Add dynamic input fields
document.addEventListener("DOMContentLoaded", function () {
    // Skills and languages input handlers
    document.querySelectorAll(".inputs-Button").forEach(function (button) {
        button.addEventListener("click", function () {
            var isSkillButton = button.id === "add-skill-inputs-button";
            var listId = isSkillButton
                ? "#skills-input-list"
                : "#languages-input-list";
            var inputClass = isSkillButton ? "skill-inputs" : "person-lang-input";
            var newInput = document.createElement("li");
            newInput.innerHTML = "<input type=\"text\" class=\"".concat(inputClass, "\">");
            var list = document.querySelector(listId);
            list === null || list === void 0 ? void 0 : list.insertBefore(newInput, button);
        });
    });
});
// Handle theme selection
document.querySelectorAll(".themes").forEach(function (theme) {
    theme.addEventListener("click", function () {
        document
            .querySelectorAll(".themes")
            .forEach(function (t) { return t.classList.remove("selected"); });
        theme.classList.add("selected");
    });
});
// Generate Resume handler
(_b = document
    .getElementById("generate-resume")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
    var selectedTheme, requiredFields, emptyField, resumeData, imageInput, imageFile, imageUrl, error_1;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                selectedTheme = (_a = document.querySelector(".themes.selected")) === null || _a === void 0 ? void 0 : _a.id;
                if (!selectedTheme) {
                    showError("Please select a theme first!");
                    return [2 /*return*/];
                }
                requiredFields = [
                    { id: "person-name", name: "Name" },
                    { id: "person-email", name: "Email" },
                    { id: "person-contact", name: "Contact" },
                    { id: "person-address", name: "Address" },
                ];
                emptyField = requiredFields.find(function (field) {
                    var element = document.getElementById(field.id);
                    return !element.value.trim();
                });
                if (emptyField) {
                    showError("Please fill in the ".concat(emptyField.name, " field"));
                    (_b = document.getElementById(emptyField.id)) === null || _b === void 0 ? void 0 : _b.focus();
                    return [2 /*return*/];
                }
                resumeData = {
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
                        .map(function (input) { return input.value.trim(); })
                        .filter(Boolean),
                    languages: Array.from(document.querySelectorAll(".person-lang-input"))
                        .map(function (input) { return input.value.trim(); })
                        .filter(Boolean),
                };
                imageInput = document.getElementById("profile-picture-input");
                imageFile = (_c = imageInput.files) === null || _c === void 0 ? void 0 : _c[0];
                if (!imageFile) return [3 /*break*/, 4];
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                return [4 /*yield*/, readFileAsDataURL(imageFile)];
            case 2:
                imageUrl = _d.sent();
                resumeData.profile.profileImage = imageUrl;
                return [3 /*break*/, 4];
            case 3:
                error_1 = _d.sent();
                showError("Failed to process profile image. Please try again.");
                return [2 /*return*/];
            case 4:
                // Save data and redirect with theme parameter
                localStorage.setItem("resumeData", JSON.stringify(resumeData));
                window.location.href = "resume-output.html?theme=".concat(selectedTheme);
                return [2 /*return*/];
        }
    });
}); });
// Helper functions
function showError(message) {
    var _a;
    var existingError = document.querySelector(".error-message");
    if (existingError)
        existingError.remove();
    var errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.style.cssText = "\n    color: #dc3545;\n    padding: 0.5rem;\n    margin: 0.5rem 0;\n    border: 1px solid #f8d7da;\n    border-radius: 4px;\n    background: #f8d7da;\n  ";
    errorElement.textContent = message;
    var generateBtn = document.getElementById("generate-resume");
    (_a = generateBtn === null || generateBtn === void 0 ? void 0 : generateBtn.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(errorElement, generateBtn);
}
function readFileAsDataURL(file) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function (e) { var _a; return resolve((_a = e.target) === null || _a === void 0 ? void 0 : _a.result); };
        reader.onerror = function (error) { return reject(error); };
        reader.readAsDataURL(file);
    });
}
