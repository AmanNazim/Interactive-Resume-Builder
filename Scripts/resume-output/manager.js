"use strict";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import { saveAs } from "file-saver";
Object.defineProperty(exports, "__esModule", { value: true });
// import "./Styles/resume-output.css";
// // Initialize after DOM load
document.addEventListener("DOMContentLoaded", function () {
    try {
        initializeManagers();
    }
    catch (error) {
        console.error("Error initializing managers:", error);
    }
});
// Fix the initialization error by moving it inside a function
function initializeManagers() {
    new DownloadManager();
    new ShareManager();
    new EditManager();
    new createContactUSModal();
}
// 1. Download Manager
var DownloadManager = /** @class */ (function () {
    function DownloadManager() {
        var modalElement = this.createDownloadModal();
        if (!modalElement) {
            throw new Error("Failed to create download modal");
        }
        this.modal = modalElement;
        this.setupDownloadListeners();
    }
    DownloadManager.prototype.createDownloadModal = function () {
        var modal = document.createElement("div");
        modal.className = "download-modal";
        modal.innerHTML = "\n      <div class=\"modal-overlay download-overlay\" style=\"display: none;\">\n        <div class=\"modal-content download-content\">\n          <div class=\"modal-header\">\n            <h3 class=\"modal-title\">Download Resume</h3>\n            <button class=\"modal-close\">&times;</button>\n          </div>\n          <div class=\"download-preview\" id=\"download-preview\"></div>\n          <div class=\"download-controls\">\n            <select id=\"format\" class=\"format-select\">\n              <option value=\"pdf\">PDF Document</option>\n              <option value=\"png\">PNG Image</option>\n            </select>\n            <button id=\"confirm-download\" class=\"download-btn\">Download Resume</button>\n          </div>\n        </div>\n      </div>\n    ";
        document.body.appendChild(modal);
        return modal;
    };
    DownloadManager.prototype.setupDownloadListeners = function () {
        var _this = this;
        var downloadBtn = document.getElementById("download-btn");
        if (downloadBtn) {
            downloadBtn.addEventListener("click", function () {
                _this.showModal();
                // this.generatePreview();
            });
        }
        var confirmBtn = this.modal.querySelector("#confirm-download");
        if (confirmBtn) {
            confirmBtn.addEventListener("click", function () {
                var _a;
                var format = ((_a = _this.modal.querySelector("#format")) === null || _a === void 0 ? void 0 : _a.value) ||
                    "pdf";
                // this.downloadFile(window.URL.createObjectURL(new Blob()), "resume.pdf");
                _this.generatePdf();
                // this.downloadResume(format);
            });
        }
        var closeBtn = this.modal.querySelector(".modal-close");
        if (closeBtn) {
            closeBtn.addEventListener("click", function () { return _this.closeModal(); });
        }
        var overlay = this.modal.querySelector(".modal-overlay");
        if (overlay) {
            overlay.addEventListener("click", function (e) {
                if (e.target === overlay)
                    _this.closeModal();
            });
        }
    };
    DownloadManager.prototype.showModal = function () {
        var overlay = this.modal.querySelector(".modal-overlay");
        if (overlay) {
            overlay.style.display = "flex";
        }
    };
    DownloadManager.prototype.closeModal = function () {
        var overlay = this.modal.querySelector(".modal-overlay");
        if (overlay) {
            overlay.style.display = "none";
        }
    };
    DownloadManager.prototype.generatePdf = function () {
        var _a;
        var jsPDF = window.jsPDF;
        // Create a new jsPDF instance
        var jsPdf = new jsPDF("p", "pt", "letter");
        // Retrieve the theme number from URL or default to "1"
        var themeNumber = ((_a = new URLSearchParams(window.location.search).get("theme")) === null || _a === void 0 ? void 0 : _a.slice(-1)) ||
            "1";
        var htmlElement = document.getElementById("resume".concat(themeNumber, "-output"));
        if (htmlElement) {
            var options = {
                margin: [72, 72, 72, 72],
                autoPaging: "text", // Explicitly cast "text" to the correct type
                html2canvas: {
                    allowTaint: true,
                    dpi: 300,
                    letterRendering: true,
                    logging: false,
                    scale: 0.8,
                },
                callback: function (jsPdf) {
                    // Save the PDF once the content is processed
                    jsPdf.save("Test.pdf");
                },
            };
            // Make sure that html2canvas is used and the callback is triggered after rendering
            jsPdf.html(htmlElement, options);
        }
        else {
            console.error("Target HTML element not found");
        }
    };
    return DownloadManager;
}());
var ShareManager = /** @class */ (function () {
    function ShareManager() {
        this.userName = this.extractUserName();
        if (!this.userName) {
            throw new Error("User name is missing. Please ensure the name is added to the profile.");
        }
        var modalElement = this.createShareModal();
        if (!modalElement) {
            throw new Error("Failed to create share modal");
        }
        this.modal = modalElement;
        this.setupShareListeners();
    }
    ShareManager.prototype.extractUserName = function () {
        var _a;
        // Grab the user name from the profile-name element
        var profileNameElement = document.querySelector(".profile-name");
        if (profileNameElement) {
            return ((_a = profileNameElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
        }
        return ""; // Return an empty string if the element is not found
    };
    ShareManager.prototype.createShareModal = function () {
        var modal = document.createElement("div");
        modal.innerHTML = "\n      <div class=\"modal-overlay share-overlay\" style=\"display: none;\">\n        <div class=\"modal-content share-content\">\n          <div class=\"modal-header\">\n            <h3 class=\"modal-title\">Share Resume</h3>\n            <button class=\"modal-close\">&times;</button>\n          </div>\n          <div id=\"share-link-container\">\n            <input type=\"text\" id=\"share-link\" readonly>\n            <button id=\"copy-link\">Copy Link</button>\n          </div>\n          <h4 id=\"share-heading\">Share With Others :</h4>\n          <div class=\"share-buttons\">\n            <button class=\"share whatsapp\"><img src=\"assets/whatsapp_3670025.png\" alt=\"whatsapp\"></img></button>\n            <button class=\"share linkedin\"><img src=\"assets/social_10110406.png\" alt=\"linkedin\"></img></button>\n            <button class=\"share twitter\"><img src=\"assets/twitter_5969020.png\" alt=\"twitter\"></img></button>\n          </div>\n        </div>\n      </div>\n    ";
        document.body.appendChild(modal);
        return modal;
    };
    ShareManager.prototype.setupShareListeners = function () {
        var _this = this;
        var shareBtn = document.getElementById("share-btn");
        if (shareBtn) {
            shareBtn.addEventListener("click", function () {
                _this.showModal();
            });
        }
        var closeBtn = this.modal.querySelector(".modal-close");
        if (closeBtn) {
            closeBtn.addEventListener("click", function () {
                _this.closeModal();
            });
        }
        var overlay = this.modal.querySelector(".modal-overlay");
        if (overlay) {
            overlay.addEventListener("click", function (e) {
                if (e.target === overlay) {
                    _this.closeModal();
                }
            });
        }
        var shareButtons = this.modal.querySelectorAll(".share");
        shareButtons.forEach(function (btn) {
            btn.addEventListener("click", function (e) { return _this.shareOnPlatform(e); });
        });
        var copyBtn = this.modal.querySelector("#copy-link");
        var shareLink = this.modal.querySelector("#share-link");
        if (copyBtn && shareLink) {
            // Use the unique link with the user's name
            shareLink.value = this.generateResumeLink();
            copyBtn.addEventListener("click", function () {
                shareLink.select();
                document.execCommand("copy");
            });
        }
    };
    ShareManager.prototype.showModal = function () {
        var overlay = this.modal.querySelector(".modal-overlay");
        if (overlay) {
            overlay.style.display = "flex";
        }
    };
    ShareManager.prototype.closeModal = function () {
        var overlay = this.modal.querySelector(".modal-overlay");
        if (overlay) {
            overlay.style.display = "none";
        }
    };
    ShareManager.prototype.generateResumeLink = function () {
        // Generate a unique link for the user's resume based on their name
        var baseUrl = window.location.origin + "/resume"; // Modify with your resume path
        return "".concat(baseUrl, "?name=").concat(encodeURIComponent(this.userName));
    };
    ShareManager.prototype.shareOnPlatform = function (event) {
        var target = event.target;
        var platform = target.classList[1];
        if (!platform || !this.isValidPlatform(platform)) {
            console.error("Invalid sharing platform");
            return;
        }
        var text = encodeURIComponent("Check out my resume!");
        var url = encodeURIComponent(this.generateResumeLink()); // Use the unique resume URL
        var urls = {
            whatsapp: "https://api.whatsapp.com/send?text=".concat(text, "%20").concat(url),
            linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=".concat(url),
            twitter: "https://twitter.com/intent/tweet?text=".concat(text, "&url=").concat(url),
        };
        window.open(urls[platform], "_blank");
    };
    ShareManager.prototype.isValidPlatform = function (platform) {
        return ["whatsapp", "linkedin", "twitter"].includes(platform);
    };
    return ShareManager;
}());
// 3. Edit Manager
var EditManager = /** @class */ (function () {
    function EditManager() {
        this.isEditing = false;
        this.editableElements = [
            ".profile-description",
            ".education-content",
            ".experience-content",
            ".skills-list li",
            ".languages-list li",
            ".em-span",
            ".con-span",
            ".Add-span",
        ];
        this.setupEditListeners();
    }
    EditManager.prototype.setupEditListeners = function () {
        var _this = this;
        var _a;
        (_a = document.getElementById("edit-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
            _this.toggleEditMode();
        });
    };
    EditManager.prototype.toggleEditMode = function () {
        var _this = this;
        this.isEditing = !this.isEditing;
        document.querySelectorAll("h1, h2, h3, h4, h5, h6, label").forEach(function (el) {
            el.classList.add("non-editable");
        });
        this.editableElements.forEach(function (selector) {
            document.querySelectorAll(selector).forEach(function (el) {
                el.setAttribute("contenteditable", _this.isEditing.toString());
                if (_this.isEditing) {
                    el.classList.add("editable");
                }
                else {
                    el.classList.remove("editable");
                    _this.saveChanges();
                }
            });
        });
        this.updateEditButton();
        var resumeOutputContainer = document.getElementById("resume-output-container");
        resumeOutputContainer === null || resumeOutputContainer === void 0 ? void 0 : resumeOutputContainer.classList.toggle("edit-mode", this.isEditing);
        document.body.style.zIndex = this.isEditing ? "-1111" : "0";
    };
    EditManager.prototype.updateEditButton = function () {
        var editBtn = document.getElementById("edit-btn");
        if (!editBtn)
            return;
        if (this.isEditing) {
            editBtn.textContent = "Save";
            Object.assign(editBtn.style, {
                color: "white",
                backgroundColor: "var(--primary-bg-color)",
                border: "1px solid var(--primary-light-color)",
            });
        }
        else {
            editBtn.innerHTML = "<img src='assets/pen_18221918.png' alt='edit-btn'>";
            Object.assign(editBtn.style, {
                transition: "all 1s ease-in-out",
                backgroundColor: "var(--primary-light-color)",
                border: "2px solid var(--primary-bg-color)",
            });
        }
    };
    EditManager.prototype.saveChanges = function () {
        var _a, _b, _c, _d, _e, _f, _g;
        var data = {
            profile: {
                name: ((_a = document.querySelector(".profile-name")) === null || _a === void 0 ? void 0 : _a.textContent) || "",
                email: ((_b = document.querySelector(".em-span")) === null || _b === void 0 ? void 0 : _b.textContent) || "",
                contact: ((_c = document.querySelector(".con-span")) === null || _c === void 0 ? void 0 : _c.textContent) || "",
                address: ((_d = document.querySelector(".Add-span")) === null || _d === void 0 ? void 0 : _d.textContent) || "",
                profileText: ((_e = document.querySelector(".profile-description")) === null || _e === void 0 ? void 0 : _e.textContent) || "",
            },
            education: ((_f = document.querySelector(".education-content")) === null || _f === void 0 ? void 0 : _f.textContent) || "",
            experience: ((_g = document.querySelector(".experience-content")) === null || _g === void 0 ? void 0 : _g.textContent) || "",
            skills: Array.from(document.querySelectorAll(".skills-list li")).map(function (li) { return li.textContent || ""; }),
            languages: Array.from(document.querySelectorAll(".languages-list li")).map(function (li) { return li.textContent || ""; }),
        };
        localStorage.setItem("resumeData", JSON.stringify(data));
    };
    return EditManager;
}());
function html2pdf(resumeElement, p0) {
    throw new Error("Function not implemented.");
}
var createContactUSModal = /** @class */ (function () {
    function createContactUSModal() {
        this.modal = this.createModal();
        this.setupContactUSModal();
    }
    createContactUSModal.prototype.setupContactUSModal = function () {
        this.setupContactListeners();
    };
    createContactUSModal.prototype.createModal = function () {
        var modal = document.createElement("div");
        modal.innerHTML = "\n    <div class=\"modal-overlay contact-overlay\" style=\"display: none;\">\n        <div class=\"modal-content contact-content\">\n          <div class=\"modal-header\">\n            <h3 class=\"modal-title\">Contact Us</h3>\n            <button class=\"modal-close\">&times;</button>    \n          </div>\n          <div class=\"contact-form\">\n            <form id=\"contact-form\">\n              <input type=\"text\" id=\"name\" placeholder=\"Name\">\n              <input type=\"email\" id=\"email\" placeholder=\"Email\">\n              <textarea id=\"message\" placeholder=\"Message\"></textarea>\n            </form>\n          </div>\n        </div>\n      </div>\n    ";
        document.body.appendChild(modal);
        return modal;
    };
    createContactUSModal.prototype.setupContactListeners = function () {
        var _this = this;
        // Fix: Change from contact-btn to contact-btn class since that's what's in the HTML
        var contactBtn = document.querySelector(".contact-btn");
        if (contactBtn) {
            contactBtn.addEventListener("click", function () {
                _this.showModal();
            });
        }
        var closeBtn = this.modal.querySelector(".modal-close");
        if (closeBtn) {
            closeBtn.addEventListener("click", function () { return _this.closeModal(); });
        }
        // Add click handler for overlay to close when clicking outside
        var overlay = this.modal.querySelector(".modal-overlay");
        if (overlay) {
            overlay.addEventListener("click", function (e) {
                if (e.target === overlay) {
                    _this.closeModal();
                }
            });
        }
    };
    createContactUSModal.prototype.showModal = function () {
        var overlay = this.modal.querySelector(".modal-overlay");
        if (overlay) {
            overlay.style.display = "flex";
        }
    };
    createContactUSModal.prototype.closeModal = function () {
        var overlay = this.modal.querySelector(".modal-overlay");
        if (overlay) {
            overlay.style.display = "none";
        }
    };
    return createContactUSModal;
}());
