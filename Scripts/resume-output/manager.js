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
    new Dashboard();
}
var DownloadManager = /** @class */ (function () {
    function DownloadManager() {
        var modalElement = this.createDownloadModal();
        if (!modalElement) {
            throw new Error("Failed to create download modal");
        }
        this.modal = modalElement;
        this.setupDownloadListeners();
    }
    // Create the download modal
    DownloadManager.prototype.createDownloadModal = function () {
        var modal = document.createElement("div");
        modal.className = "download-modal";
        modal.innerHTML = "\n      <div class=\"modal-overlay download-overlay\" style=\"display: none;\">\n        <div class=\"modal-content download-content\">\n          <div class=\"modal-header\">\n            <h3 class=\"modal-title\">Download Resume</h3>\n            <button class=\"modal-close\">&times;</button>\n          </div>\n          <div class=\"download-preview\" id=\"download-preview\"></div>\n          <div class=\"download-controls\">\n            <div id=\"format-container\">\n            <h5 id=\"format-heading\">Select Format</h5>\n            <select id=\"format\" class=\"format-select\">\n              <option value=\"png\">PNG Image</option>\n              <option value=\"pdf\">PDF Document</option>\n            </select>\n            </div>\n            <button id=\"confirm-download\" class=\"download-btn\">Download Resume</button>\n          </div>\n        </div>\n      </div>\n    ";
        document.body.appendChild(modal);
        return modal;
    };
    // Setup listeners for modal actions
    DownloadManager.prototype.setupDownloadListeners = function () {
        var _this = this;
        var downloadBtn = document.getElementById("download-btn");
        if (downloadBtn) {
            downloadBtn.addEventListener("click", function () {
                _this.showModal();
                _this.generatePreview();
            });
        }
        var confirmBtn = this.modal.querySelector("#confirm-download");
        if (confirmBtn) {
            confirmBtn.addEventListener("click", function () {
                var _a;
                var format = ((_a = _this.modal.querySelector("#format")) === null || _a === void 0 ? void 0 : _a.value) ||
                    "pdf";
                if (format === "pdf") {
                    _this.generateHighQualityPdf();
                }
                else if (format === "png") {
                    _this.generatePng();
                }
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
    // Open modal
    DownloadManager.prototype.showModal = function () {
        var overlay = this.modal.querySelector(".modal-overlay");
        if (overlay) {
            overlay.style.display = "flex";
        }
    };
    // Close modal
    DownloadManager.prototype.closeModal = function () {
        var overlay = this.modal.querySelector(".modal-overlay");
        if (overlay) {
            overlay.style.display = "none";
        }
    };
    DownloadManager.prototype.generateHighQualityPdf = function () {
        return __awaiter(this, void 0, void 0, function () {
            var themeNumber, htmlElement, downloadBtn, clone, wrapper, doc_1, options, err_1, downloadBtn_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        themeNumber = ((_a = new URLSearchParams(window.location.search).get("theme")) === null || _a === void 0 ? void 0 : _a.slice(-1)) ||
                            "1";
                        htmlElement = document.getElementById("resume".concat(themeNumber, "-output"));
                        if (!htmlElement)
                            return [2 /*return*/];
                        downloadBtn = this.modal.querySelector("#confirm-download");
                        if (downloadBtn) {
                            downloadBtn.textContent = "Preparing download...";
                            downloadBtn.setAttribute("disabled", "true");
                        }
                        clone = htmlElement.cloneNode(true);
                        clone.style.width = "450px"; // Match PDF paper width
                        clone.style.border = "1px solid #4361ee";
                        clone.style.transform = "none"; // Remove any transforms
                        clone.style.boxShadow = "none"; // Remove shadows that cause artifacts
                        clone.style.cssText = "\n    @import url(\"//fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap\");\n    font-family: \"Kanit\" !important;\n    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,\n      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px,\n      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px !important;\n\n    ";
                        wrapper = document.createElement("div");
                        wrapper.style.cssText = "\n            position: fixed;\n            top: -9999px;\n            left: -9999px;\n            background: white;\n            width: 210mm;\n            min-height: 297mm;\n          ";
                        wrapper.appendChild(clone);
                        document.body.appendChild(wrapper);
                        clone.querySelectorAll("*").forEach(function (el) {
                            el.style.cssText += window.getComputedStyle(el).cssText;
                        });
                        return [4 /*yield*/, new Promise(function (resolve) { return requestAnimationFrame(resolve); })];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 6, 7, 8]);
                        // 1. WAIT FOR FONTS FIRST
                        return [4 /*yield*/, document.fonts.ready];
                    case 3:
                        // 1. WAIT FOR FONTS FIRST
                        _b.sent();
                        doc_1 = new window.jspdf.jsPDF({
                            orientation: "p",
                            unit: "pt",
                            format: "a4",
                            hotfixes: ["px_scaling"],
                            compress: true, // Fix pixel scaling
                        });
                        options = {
                            margin: [72, 72, 72, 72],
                            html2canvas: {
                                allowTaint: true,
                                useCORS: true,
                                scale: 1,
                                dpi: 300,
                                async: true,
                                letterRendering: false, // Disable for cleaner text
                                logging: true,
                                onclone: function (clonedDoc) {
                                    // Fix font inheritance without modifying ready property
                                    clonedDoc.body.style.fontFamily = getComputedStyle(document.body).fontFamily;
                                    clonedDoc.body.style.cssText += document.body.style.cssText;
                                },
                            },
                            callback: function (pdf) {
                                pdf.save("Professional_Resume-".concat(new Date().toISOString().split("T")[0], ".pdf"));
                                document.body.removeChild(clone);
                            },
                        };
                        // 3. ADD DELAY FOR RENDERING
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                    case 4:
                        // 3. ADD DELAY FOR RENDERING
                        _b.sent();
                        return [4 /*yield*/, doc_1.html(clone, options)];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 6:
                        err_1 = _b.sent();
                        console.error("PDF Generation Error:", err_1);
                        document.body.removeChild(clone);
                        return [3 /*break*/, 8];
                    case 7:
                        downloadBtn_1 = this.modal.querySelector("#confirm-download");
                        if (downloadBtn_1) {
                            downloadBtn_1.textContent = "Download Resume";
                            downloadBtn_1.removeAttribute("disabled");
                        }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // Generate PNG from resume content (using html2canvas)
    DownloadManager.prototype.generatePng = function () {
        var _a;
        // Ensure html2canvas is loaded before use
        if (!window.html2canvas) {
            console.error("html2canvas is not loaded.");
            return;
        }
        var html2canvas = window.html2canvas;
        var themeNumber = ((_a = new URLSearchParams(window.location.search).get("theme")) === null || _a === void 0 ? void 0 : _a.slice(-1)) ||
            "1";
        var htmlElement = document.getElementById("resume".concat(themeNumber, "-output"));
        if (htmlElement) {
            html2canvas(htmlElement).then(function (canvas) {
                var imgData = canvas.toDataURL("image/png");
                var link = document.createElement("a");
                link.href = imgData;
                link.download = "Resume.png";
                link.click(); // Trigger download
            });
        }
        else {
            console.error("Target HTML element not found for PNG");
        }
    };
    DownloadManager.prototype.generatePreview = function () {
        return __awaiter(this, void 0, void 0, function () {
            var previewContainer, themeNumber, element, targetHeight, targetWidth, clone, canvas, previewImg, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        previewContainer = this.modal.querySelector("#download-preview");
                        themeNumber = ((_a = new URLSearchParams(window.location.search).get("theme")) === null || _a === void 0 ? void 0 : _a.slice(-1)) ||
                            "1";
                        element = document.querySelector("#resume".concat(themeNumber, "-output"));
                        if (!previewContainer || !element)
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        previewContainer.innerHTML =
                            '<div class="preview-loading">Generating preview...</div>';
                        targetHeight = 250;
                        targetWidth = 220;
                        clone = element.cloneNode(true);
                        clone.style.cssText = "\n        position: absolute;\n        left: -9999px;\n        width: 450px;\n        height: 520px;\n        opacity: 0.999;  \n      ";
                        document.body.appendChild(clone);
                        return [4 /*yield*/, window.html2canvas(clone, {
                                scale: 10,
                                windowWidth: 220,
                                windowHeight: 250,
                                useCORS: true,
                                logging: true,
                                backgroundColor: "#ffffff",
                            })];
                    case 2:
                        canvas = _b.sent();
                        previewImg = new Image();
                        previewImg.src = canvas.toDataURL("image/svg");
                        previewImg.style.cssText = "\n        width: ".concat(targetWidth, "px;\n        height: ").concat(targetHeight, "px;\n        image-rendering: crisp-edges;\n        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,\n      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px,\n      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px !important;\n      ");
                        // 7. Cleanup and display
                        document.body.removeChild(clone);
                        previewContainer.innerHTML = "";
                        previewContainer.appendChild(previewImg);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.error("Preview failed:", error_1);
                        previewContainer.innerHTML =
                            '<div class="preview-error">Preview generation failed</div>';
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
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
        // Grab the user name from the heading element with class 'profile-name'
        var profileNameElement = document.querySelector(".profile-name");
        console.log("Extracting user name...");
        if (profileNameElement) {
            var user = (_a = profileNameElement.textContent) === null || _a === void 0 ? void 0 : _a.trim(); // Get the name from the heading and trim it
            console.log("Extracted name:", user); // Log the extracted name
            if (user) {
                // Store the user name in localStorage
                localStorage.setItem("profileName", user);
                // Return the extracted user name
                return user;
            }
        }
        // Return a default name if no name is available
        console.warn("No profile name found, using default 'Unnamed User'.");
        return "Unnamed User";
    };
    ShareManager.prototype.getStoredUserName = function () {
        var storedName = localStorage.getItem("profileName");
        console.log("Retrieved stored name:", storedName); // Log to check if it's retrieved correctly
        return storedName || "Unnamed User"; // Return stored name or default
    };
    ShareManager.prototype.createShareModal = function () {
        var modal = document.createElement("div");
        modal.innerHTML = "\n      <div class=\"modal-overlay share-overlay\" style=\"display: none;\">\n        <div class=\"modal-content share-content\">\n          <div class=\"modal-header\">\n            <h3 class=\"modal-title\">Share Resume</h3>\n            <button class=\"modal-close\">&times;</button>\n          </div>\n          <div id=\"share-link-container\">\n            <input type=\"text\" id=\"share-link\" readonly>\n            <button id=\"copy-link\">Copy Link</button>\n          </div>\n          <h4 id=\"share-heading\">Share With Others :</h4>\n          <div class=\"share-buttons\">\n            <button class=\"share whatsapp\"><img src=\"assets/whatsapp_3670025.png\" alt=\"whatsapp\"></img></button>\n            <button class=\"share linkedin\"><img src=\"assets/social_10110406.png\" alt=\"linkedin\"></img></button>\n            <button class=\"share twitter\"><img src=\"assets/social-network_15714543.png\" alt=\"twitter\"></img></button>\n          </div>\n        </div>\n      </div>\n    ";
        document.body.appendChild(modal);
        console.log("Modal has been created and appended");
        return modal;
    };
    ShareManager.prototype.setupShareListeners = function () {
        var _this = this;
        var shareBtn = document.getElementById("share-btn");
        if (shareBtn) {
            shareBtn.addEventListener("click", function () {
                _this.showModal();
                console.log("Share button clicked");
            });
        }
        else {
            console.error("Share button not found");
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
            shareLink.value = this.generateUniqueResumeLink();
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
            console.log("Modal shown");
        }
        else {
            console.error("Modal overlay not found");
        }
    };
    ShareManager.prototype.closeModal = function () {
        var overlay = this.modal.querySelector(".modal-overlay");
        if (overlay) {
            overlay.style.display = "none";
        }
    };
    ShareManager.prototype.generateUniqueResumeLink = function () {
        var userName = this.getStoredUserName();
        var userId = this.getUserId(); // Assuming you have a method to get a unique user ID
        var timestamp = new Date().getTime(); // Timestamp to make the URL unique over time
        // Combine the userName, userId, and timestamp to create a truly unique link
        var uniqueId = "".concat(userId, "-").concat(timestamp);
        // Get the base URL
        var baseUrl = window.location.href.split("?")[0]; // Remove any existing query parameters
        // URL-encode the user information to make it URL-safe
        var encodedUserName = encodeURIComponent(userName);
        var encodedUniqueId = encodeURIComponent(uniqueId);
        // Generate the unique resume link
        var uniqueResumeLink = "".concat(baseUrl, "?user=").concat(encodedUserName, "&id=").concat(encodedUniqueId);
        console.log("Generated unique resume link:", uniqueResumeLink);
        return uniqueResumeLink;
    };
    // Example method to get the user ID (you can modify this logic based on your app)
    ShareManager.prototype.getUserId = function () {
        // This could come from user authentication data, session, or a generated user ID
        var storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            return storedUserId;
        }
        else {
            // If no user ID exists, generate one for the session (can be improved for production)
            var generatedId = Math.random().toString(36).substr(2, 9); // Random alphanumeric ID
            localStorage.setItem("userId", generatedId);
            return generatedId;
        }
    };
    ShareManager.prototype.shareOnPlatform = function (event) {
        var target = event.target;
        var platform = target.classList[1];
        if (!platform || !this.isValidPlatform(platform)) {
            console.error("Invalid sharing platform");
            return;
        }
        var text = encodeURIComponent("Check out my resume!");
        var url = encodeURIComponent(window.location.href);
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
var EditManager = /** @class */ (function () {
    function EditManager() {
        this.isEditing = false;
        this.editableElements = [
            ".profile-name", // Profile name
            ".profile-description", // Profile description
            ".em-span", // Email
            ".con-span", // Contact
            ".Add-span", // Address
            ".languages-list li", // Languages list items
            ".education-content", // Education content
            ".experience-content", // Experience content
            ".skills-list li", // Skills list items
        ];
        this.setupEditListeners();
    }
    EditManager.prototype.toggleNavbarFooterVisibility = function () {
        var navbar = document.getElementById("heading-nav-bar");
        var footer = document.getElementById("footer");
        if (navbar) {
            navbar.style.display = this.isEditing ? "none" : "flex";
        }
        if (footer) {
            footer.style.display = this.isEditing ? "none" : "flex";
        }
    };
    EditManager.prototype.setupEditListeners = function () {
        var _this = this;
        var _a;
        // Listen for the "edit" button click to toggle edit mode
        (_a = document.getElementById("edit-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
            _this.toggleEditMode();
        });
        // Wait until DOM is fully loaded to ensure elements exist
        document.addEventListener("DOMContentLoaded", function () {
            _this.initializeEditableElements();
        });
    };
    EditManager.prototype.initializeEditableElements = function () {
        var _this = this;
        // Loop through the editable elements and add click listeners for editing
        this.editableElements.forEach(function (selector) {
            document.querySelectorAll(selector).forEach(function (el) {
                var htmlElement = el;
                htmlElement.addEventListener("click", function () {
                    return _this.toggleContentEditable(htmlElement);
                });
            });
        });
    };
    EditManager.prototype.toggleEditMode = function () {
        var _this = this;
        this.isEditing = !this.isEditing;
        // Enable or disable contenteditable based on whether we are in edit mode
        document
            .querySelectorAll(this.editableElements.join(","))
            .forEach(function (el) {
            var htmlElement = el;
            if (_this.isEditing) {
                htmlElement.setAttribute("contenteditable", "true");
                htmlElement.classList.add("editable");
            }
            else {
                htmlElement.removeAttribute("contenteditable");
                htmlElement.classList.remove("editable");
                _this.saveChanges(); // Save changes when editing is turned off
            }
        });
        this.updateEditButton();
        this.toggleNavbarFooterVisibility();
    };
    EditManager.prototype.toggleContentEditable = function (element) {
        // Toggle the contenteditable attribute for the clicked element
        if (element.isContentEditable) {
            element.removeAttribute("contenteditable");
            element.classList.remove("editable");
            this.saveChanges(); // Save changes when editing is turned off
        }
        else {
            element.setAttribute("contenteditable", "true");
            element.classList.add("editable");
        }
    };
    EditManager.prototype.updateEditButton = function () {
        var editBtn = document.getElementById("edit-btn");
        if (!editBtn)
            return;
        if (this.isEditing) {
            editBtn.textContent = "Save"; // Change button text to "Save" when in edit mode
        }
        else {
            editBtn.innerHTML =
                "<img src='assets/pencil_12281340.png' alt='edit-btn'>"; // Reset button content when not editing
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
        // Save the updated resume data in localStorage
        localStorage.setItem("resumeData", JSON.stringify(data));
    };
    EditManager.prototype.loadProfile = function () {
        var _a, _b, _c, _d, _e, _f, _g;
        var storedData = localStorage.getItem("resumeData");
        if (storedData) {
            var data = JSON.parse(storedData);
            // Load data into the respective elements
            document.querySelector(".profile-name").textContent =
                ((_a = data.profile) === null || _a === void 0 ? void 0 : _a.name) || "";
            document.querySelector(".em-span").textContent =
                ((_b = data.profile) === null || _b === void 0 ? void 0 : _b.email) || "";
            document.querySelector(".con-span").textContent =
                ((_c = data.profile) === null || _c === void 0 ? void 0 : _c.contact) || "";
            document.querySelector(".Add-span").textContent =
                ((_d = data.profile) === null || _d === void 0 ? void 0 : _d.address) || "";
            document.querySelector(".profile-description").textContent =
                ((_e = data.profile) === null || _e === void 0 ? void 0 : _e.profileText) || "";
            document.querySelector(".education-content").textContent =
                data.education || "";
            document.querySelector(".experience-content").textContent =
                data.experience || "";
            var skillsList_1 = document.querySelector(".skills-list");
            if (skillsList_1) {
                (_f = data.skills) === null || _f === void 0 ? void 0 : _f.forEach(function (skill) {
                    var li = document.createElement("li");
                    li.textContent = skill;
                    skillsList_1.appendChild(li);
                });
            }
            var languagesList_1 = document.querySelector(".languages-list");
            if (languagesList_1) {
                (_g = data.languages) === null || _g === void 0 ? void 0 : _g.forEach(function (language) {
                    var li = document.createElement("li");
                    li.textContent = language;
                    languagesList_1.appendChild(li);
                });
            }
        }
    };
    return EditManager;
}());
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
        modal.innerHTML = "\n    <div class=\"modal-overlay contact-overlay\" style=\"display: none;\">\n        <div class=\"modal-content contact-content\">\n          <div class=\"contact-header\">\n            <h3 class=\"contact-title\">Contact Us</h3>\n            <button class=\"modal-close\">&times;</button>\n          </div>\n          <div class=\"contact-form\">\n            <form id=\"contact-form\">\n              <div class=\"comment-head\">\n              <h4 class=\"comment-heading\">Comment US</h4>\n              </div>\n              <div class=\"name-email\">\n              <input type=\"text\" id=\"contact-name\" placeholder=\"Name\">\n              <input type=\"email\" id=\"contact-email\" placeholder=\"Email\">\n              </div>\n              <textarea id=\"contact-message\" placeholder=\"Message\" tabindex=\"0\"></textarea>\n              <button type=\"button\" class=\"comment-button\">Send</button>\n            </form>\n            <div id=\"social-links\">\n            <h4 class=\"follow-heading\">Follow ON Your Favorite Social Media Platforms :</h4>\n            <div class=\"contact-buttons\">\n            <button class=\"follow whatsapp\"><a href=\"https://www.instagram.com/aman.nazim07/\"><img src=\"assets/instagram_1400813.png\" alt=\"insta\"></a></img></button>\n            <button class=\"follow whatsapp\"><a href=\"https://www.facebook.com/amannazim98\"><img src=\"assets/facebook_408796.png\" alt=\"facebook\"></a></img></button>\n            <button class=\"follow linkedin\"><a href=\"https://www.linkedin.com/in/aman-nazim-b9a0a0305\"><img src=\"assets/linkedin_255287.png\" alt=\"linkedin\"></a></img></button>\n            </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    ";
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
var Dashboard = /** @class */ (function () {
    function Dashboard() {
        this.dashboard = this.createDashboardSection();
        this.initializeProfile(); // Initialize profile on dashboard creation
        this.setupDashboardListeners();
    }
    Dashboard.prototype.createDashboardSection = function () {
        var dashboard = document.createElement("div");
        dashboard.id = "dashboard-section";
        dashboard.innerHTML = "\n    <div id=\"dashboard-overlay\">\n    <div id=\"dashboard-header\">\n      <h1 id=\"dash-heading\">Dashboard</h1>\n      <button id=\"close-dashboard\">&times;</button>\n    </div>\n      <div id=\"profile-inp-div\">\n        <h2 id=\"dash-profile\">Profile :</h2>\n      </div>\n      <div id=\"center-div\">\n        <div id=\"dash-pic\"><img src=\"\" alt=\"profile-pic\" id=\"dash-pic-img\"></div>\n        <input type=\"file\" id=\"profile-pic-inp\">\n        <h1 id=\"dash-name\"></h1>\n      </div>\n    </div>\n    ";
        document.body.appendChild(dashboard);
        return dashboard;
    };
    Dashboard.prototype.setupDashboardListeners = function () {
        var _this = this;
        var dashboardBtn = document.querySelector(".nav-dash");
        if (dashboardBtn) {
            dashboardBtn.addEventListener("click", function () {
                _this.toggleDashboard(); // Toggle the dashboard visibility when clicked
                _this.closeDashboard();
            });
        }
    };
    Dashboard.prototype.toggleDashboard = function () {
        this.dashboard.classList.add("show-dashboard");
    };
    Dashboard.prototype.closeDashboard = function () {
        var _this = this;
        var closeBtn = this.dashboard.querySelector("#close-dashboard");
        if (closeBtn) {
            closeBtn.addEventListener("click", function () {
                _this.dashboard.classList.remove("show-dashboard");
            });
        }
    };
    // Function to initialize profile from localStorage (called on page load)
    Dashboard.prototype.initializeProfile = function () {
        var storedName = localStorage.getItem("profileName");
        var storedPic = localStorage.getItem("profilePic");
        if (storedName) {
            // Update profile if name exists in localStorage
            this.updateProfile(storedName, storedPic || "");
        }
    };
    // Function to update profile name and profile picture from localStorage
    Dashboard.prototype.updateProfile = function (name, image) {
        var profileNameElement = document.querySelector("#dash-name");
        var profilePicElement = document.getElementById("dash-pic");
        var profilePicInp = document.getElementById("profile-pic-inp");
        var profilePicimg = document.getElementById("dash-pic-img");
        if (profileNameElement) {
            profileNameElement.textContent = name; // Update the name
        }
        // Clear any existing content in the profile picture container
        profilePicElement.innerHTML = "";
        if (!profilePicimg) {
            profilePicimg = document.createElement("img");
            profilePicimg.id = "dash-pic-img";
        }
        if (profilePicElement && image) {
            profilePicimg.src = image;
            profilePicimg.alt = "Profile Picture";
            profilePicimg.style.width = "100px";
            profilePicimg.style.height = "100px";
            profilePicimg.style.borderRadius = "50%";
            profilePicimg.style.objectFit = "cover";
            profilePicimg.style.opacity = "100%";
            profilePicElement.appendChild(profilePicimg);
            // Append the new image
        }
        if (profilePicInp) {
            profilePicInp.addEventListener("change", function (e) {
                var _a;
                var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
                if (file) {
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        var _a;
                        var dataUrl = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
                        // Update the image element with the newly selected file
                        profilePicimg.src = dataUrl;
                        // Optionally, update localStorage for persistence
                        localStorage.setItem("profilePic", dataUrl);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    };
    return Dashboard;
}());
var buttons = document.querySelectorAll(".hide-buttons");
buttons.forEach(function (button) {
    button.addEventListener("click", function (e) {
        // Force DOM reflow to reset animation
        void button.offsetWidth;
        // Add temporary active class
        button.classList.add("shining");
        // Remove class after animation
        setTimeout(function () {
            button.classList.remove("shining");
        }, 600000);
    });
});
// function setupLabelLineFocus(): void {
//   // Select all input containers
//   const inputContainers = document.querySelectorAll(
//     ".input-container"
//   ) as NodeListOf<HTMLElement>;
//   inputContainers.forEach((container) => {
//     // Find the input element within the container
//     const input = container.querySelector(
//       ".input-style"
//     ) as HTMLInputElement | null;
//     if (!input) return; // Skip containers without inputs
//     // Add click handler to container
//     container.addEventListener("click", (event: MouseEvent) => {
//       // Only focus if clicking directly on the container (not its children)
//       if (event.target === container) {
//         input.focus();
//         container.classList.add("input-container--focused");
//       }
//     });
//   });
// }
// // Initialize the functionality
// setupLabelLineFocus();
