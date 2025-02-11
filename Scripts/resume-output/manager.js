// Remove the imports since we're using CDN scripts
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";
// import { saveAs } from "file-saver";
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
// Initialize after DOM load
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
    var _a;
    if (!window.html2canvas || !((_a = window.jspdf) === null || _a === void 0 ? void 0 : _a.jsPDF) || !window.saveAs) {
        throw new Error("Required libraries not loaded");
    }
    new DownloadManager();
    new ShareManager();
    new EditManager();
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
        modal.innerHTML = "\n      <div class=\"modal-overlay download-overlay\" style=\"display: none;\">\n        <div class=\"modal-content download-content\">\n          <div class=\"modal-header\">\n            <h3 class=\"modal-title\">Download Resume</h3>\n            <button class=\"modal-close\">&times;</button>\n          </div>\n          <div id=\"download-preview\"></div>\n          <div class=\"download-controls\">\n            <select id=\"format\">\n              <option value=\"pdf\">PDF</option>\n              <option value=\"png\">PNG</option>\n              <option value=\"jpeg\">JPEG</option>\n              <option value=\"jpg\">JPG</option>\n            </select>\n            <button id=\"confirm-download\">Download</button>\n          </div>\n        </div>\n      </div>\n    ";
        document.body.appendChild(modal);
        return modal;
    };
    DownloadManager.prototype.setupDownloadListeners = function () {
        var _this = this;
        var downloadBtn = document.getElementById("download-btn");
        if (downloadBtn) {
            downloadBtn.addEventListener("click", function () {
                _this.showModal();
            });
        }
        var confirmBtn = this.modal.querySelector("#confirm-download");
        if (confirmBtn) {
            confirmBtn.addEventListener("click", function () {
                var _a;
                var format = ((_a = _this.modal.querySelector("#format")) === null || _a === void 0 ? void 0 : _a.value) ||
                    "pdf";
                _this.downloadResume(format);
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
    DownloadManager.prototype.downloadResume = function (format) {
        return __awaiter(this, void 0, void 0, function () {
            var element, clone, wrapper, canvas, jsPDF, pdf, imgData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        element = document.querySelector(".resume-section:not(.hidden)");
                        if (!element) {
                            throw new Error("Resume container not found");
                        }
                        clone = element.cloneNode(true);
                        clone.style.cssText = "\n        width: 210mm;\n        min-height: 297mm;\n        padding: 20mm;\n        margin: 20px;\n        background: white;\n        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);\n        border-radius: 8px;\n      ";
                        wrapper = document.createElement("div");
                        wrapper.style.cssText = "\n        position: fixed;\n        top: -9999px;\n        left: -9999px;\n        background: white;\n        padding: 20px;\n        border-radius: 10px;\n        box-shadow: 0 0 30px rgba(0, 0, 0, 0.15);\n      ";
                        wrapper.appendChild(clone);
                        document.body.appendChild(wrapper);
                        return [4 /*yield*/, window.html2canvas(wrapper, {
                                scale: 2,
                                useCORS: true,
                                allowTaint: true,
                                backgroundColor: "#ffffff",
                            })];
                    case 1:
                        canvas = _a.sent();
                        wrapper.remove();
                        if (format === "pdf") {
                            jsPDF = window.jspdf.jsPDF;
                            pdf = new jsPDF({
                                orientation: "portrait",
                                unit: "mm",
                                format: "a4",
                            });
                            imgData = canvas.toDataURL("image/jpeg", 1.0);
                            pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
                            pdf.save("resume.pdf");
                        }
                        else {
                            canvas.toBlob(function (blob) {
                                if (blob) {
                                    window.saveAs(blob, "resume.".concat(format));
                                }
                            }, "image/".concat(format), 1.0);
                        }
                        this.closeModal();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Download failed:", error_1);
                        alert("Download failed. Please try again.");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return DownloadManager;
}());
// 2. Share Manager
var ShareManager = /** @class */ (function () {
    function ShareManager() {
        var modalElement = this.createShareModal();
        if (!modalElement) {
            throw new Error("Failed to create share modal");
        }
        this.modal = modalElement;
        this.setupShareListeners();
    }
    ShareManager.prototype.createShareModal = function () {
        var modal = document.createElement("div");
        modal.innerHTML = "\n      <div class=\"modal-overlay share-overlay\" style=\"display: none;\">\n        <div class=\"modal-content share-content\">\n          <div class=\"modal-header\">\n            <h3 class=\"modal-title\">Share Resume</h3>\n            <button class=\"modal-close\">&times;</button>\n          </div>\n          <input type=\"text\" id=\"share-link\" readonly>\n          <button id=\"copy-link\">Copy Link</button>\n          <div class=\"share-buttons\">\n            <button class=\"share whatsapp\">WhatsApp</button>\n            <button class=\"share linkedin\">LinkedIn</button>\n            <button class=\"share twitter\">Twitter</button>\n          </div>\n        </div>\n      </div>\n    ";
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
            shareLink.value = window.location.href;
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
        this.loadSavedContent();
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
        document.body.classList.toggle("edit-mode", this.isEditing);
        var editBtn = document.getElementById("edit-btn");
        if (editBtn) {
            editBtn.textContent = this.isEditing ? "Save" : "Edit";
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
    EditManager.prototype.loadSavedContent = function () {
        var savedData = localStorage.getItem("resumeData");
        if (savedData) {
            var data = JSON.parse(savedData);
            this.populateContent(data);
        }
    };
    EditManager.prototype.populateContent = function (data) {
        if (data.profile) {
            var _a = data.profile, name_1 = _a.name, email = _a.email, contact = _a.contact, address = _a.address, profileText = _a.profileText;
            if (name_1)
                document.querySelector(".profile-name").textContent = name_1;
            if (email)
                document.querySelector(".em-span").textContent = email;
            if (contact)
                document.querySelector(".con-span").textContent = contact;
            if (address)
                document.querySelector(".Add-span").textContent = address;
            if (profileText)
                document.querySelector(".profile-description").textContent =
                    profileText;
        }
        if (data.education) {
            document.querySelector(".education-content").textContent =
                data.education;
        }
        if (data.experience) {
            document.querySelector(".experience-content").textContent =
                data.experience;
        }
    };
    return EditManager;
}());
