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
// // Initialize after DOM load
document.addEventListener("DOMContentLoaded", () => {
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
class DownloadManager {
    constructor() {
        const modalElement = this.createDownloadModal();
        if (!modalElement) {
            throw new Error("Failed to create download modal");
        }
        this.modal = modalElement;
        this.setupDownloadListeners();
    }
    // Create the download modal
    createDownloadModal() {
        const modal = document.createElement("div");
        modal.className = "download-modal";
        modal.innerHTML = `
      <div class="modal-overlay download-overlay" style="display: none;">
        <div class="modal-content download-content">
          <div class="modal-header">
            <h3 class="modal-title">Download Resume</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div class="download-preview" id="download-preview"></div>
          <div class="download-controls">
            <div id="format-container">
            <h5 id="format-heading">Select Format</h5>
            <select id="format" class="format-select">
              <option value="png">PNG Image</option>
              <option value="pdf">PDF Document</option>
            </select>
            </div>
            <button id="confirm-download" class="download-btn">Download Resume</button>
          </div>
        </div>
      </div>
    `;
        document.body.appendChild(modal);
        return modal;
    }
    // Setup listeners for modal actions
    setupDownloadListeners() {
        const downloadBtn = document.getElementById("download-btn");
        if (downloadBtn) {
            downloadBtn.addEventListener("click", () => {
                this.showModal();
                this.generatePreview();
            });
        }
        const confirmBtn = this.modal.querySelector("#confirm-download");
        if (confirmBtn) {
            confirmBtn.addEventListener("click", () => {
                var _a;
                const format = ((_a = this.modal.querySelector("#format")) === null || _a === void 0 ? void 0 : _a.value) ||
                    "pdf";
                if (format === "pdf") {
                    this.generateHighQualityPdf();
                }
                else if (format === "png") {
                    this.generatePng();
                }
            });
        }
        const closeBtn = this.modal.querySelector(".modal-close");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => this.closeModal());
        }
        const overlay = this.modal.querySelector(".modal-overlay");
        if (overlay) {
            overlay.addEventListener("click", (e) => {
                if (e.target === overlay)
                    this.closeModal();
            });
        }
    }
    // Open modal
    showModal() {
        const overlay = this.modal.querySelector(".modal-overlay");
        if (overlay) {
            overlay.style.display = "flex";
        }
    }
    // Close modal
    closeModal() {
        const overlay = this.modal.querySelector(".modal-overlay");
        if (overlay) {
            overlay.style.display = "none";
        }
    }
    generateHighQualityPdf() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const themeNumber = ((_a = new URLSearchParams(window.location.search).get("theme")) === null || _a === void 0 ? void 0 : _a.slice(-1)) ||
                "1";
            const htmlElement = document.getElementById(`resume${themeNumber}-output`);
            if (!htmlElement)
                return;
            // Show loading state
            const downloadBtn = this.modal.querySelector("#confirm-download");
            if (downloadBtn) {
                downloadBtn.textContent = "Preparing download...";
                downloadBtn.setAttribute("disabled", "true");
            }
            // Create deep clone with styles
            const clone = htmlElement.cloneNode(true);
            clone.style.width = "450px"; // Match PDF paper width
            clone.style.border = "1px solid #4361ee";
            clone.style.transform = "none"; // Remove any transforms
            clone.style.boxShadow = "none"; // Remove shadows that cause artifacts
            clone.style.cssText = `
    @import url("//fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
    font-family: "Kanit" !important;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px !important;

    `;
            // Create a wrapper with white background
            const wrapper = document.createElement("div");
            wrapper.style.cssText = `
            position: fixed;
            top: -9999px;
            left: -9999px;
            background: white;
            width: 210mm;
            min-height: 297mm;
          `;
            wrapper.appendChild(clone);
            document.body.appendChild(wrapper);
            clone.querySelectorAll("*").forEach((el) => {
                el.style.cssText += window.getComputedStyle(el).cssText;
            });
            yield new Promise((resolve) => requestAnimationFrame(resolve));
            try {
                // 1. WAIT FOR FONTS FIRST
                yield document.fonts.ready;
                // 2. SET UP PDF OPTIONS
                // Change the PDF initialization
                const doc = new window.jspdf.jsPDF({
                    orientation: "p",
                    unit: "pt",
                    format: "a4",
                    hotfixes: ["px_scaling"],
                    compress: true, // Fix pixel scaling
                });
                const options = {
                    margin: [72, 72, 72, 72],
                    html2canvas: {
                        allowTaint: true,
                        useCORS: true,
                        scale: 1,
                        dpi: 300,
                        async: true,
                        letterRendering: false, // Disable for cleaner text
                        logging: true,
                        onclone: (clonedDoc) => {
                            // Fix font inheritance without modifying ready property
                            clonedDoc.body.style.fontFamily = getComputedStyle(document.body).fontFamily;
                            clonedDoc.body.style.cssText += document.body.style.cssText;
                        },
                    },
                    callback: (pdf) => {
                        pdf.save(`Professional_Resume-${new Date().toISOString().split("T")[0]}.pdf`);
                        document.body.removeChild(clone);
                    },
                };
                // 3. ADD DELAY FOR RENDERING
                yield new Promise((resolve) => setTimeout(resolve, 1000));
                yield doc.html(clone, options);
            }
            catch (err) {
                console.error("PDF Generation Error:", err);
                document.body.removeChild(clone);
            }
            finally {
                let downloadBtn = this.modal.querySelector("#confirm-download");
                if (downloadBtn) {
                    downloadBtn.textContent = "Download Resume";
                    downloadBtn.removeAttribute("disabled");
                }
            }
        });
    }
    // Generate PNG from resume content (using html2canvas)
    generatePng() {
        var _a;
        // Ensure html2canvas is loaded before use
        if (!window.html2canvas) {
            console.error("html2canvas is not loaded.");
            return;
        }
        const html2canvas = window.html2canvas;
        const themeNumber = ((_a = new URLSearchParams(window.location.search).get("theme")) === null || _a === void 0 ? void 0 : _a.slice(-1)) ||
            "1";
        const htmlElement = document.getElementById(`resume${themeNumber}-output`);
        if (htmlElement) {
            html2canvas(htmlElement).then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.href = imgData;
                link.download = "Resume.png";
                link.click(); // Trigger download
            });
        }
        else {
            console.error("Target HTML element not found for PNG");
        }
    }
    generatePreview() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const previewContainer = this.modal.querySelector("#download-preview");
            const themeNumber = ((_a = new URLSearchParams(window.location.search).get("theme")) === null || _a === void 0 ? void 0 : _a.slice(-1)) ||
                "1";
            const element = document.querySelector(`#resume${themeNumber}-output`);
            if (!previewContainer || !element)
                return;
            try {
                previewContainer.innerHTML =
                    '<div class="preview-loading">Generating preview...</div>';
                // 1. Target dimensions
                const targetHeight = 250; // Your desired preview height
                // const aspectRatio = 210 / 297; // A4 aspect ratio (width/height)
                const targetWidth = 220; // ≈ 177px
                // 3. Create hidden clone with original size
                const clone = element.cloneNode(true);
                clone.style.cssText = `
        position: absolute;
        left: -9999px;
        width: 450px;
        height: 520px;
        opacity: 0.999;  
      `;
                document.body.appendChild(clone);
                // 4. Calculate precise scale factor
                // const scale = (targetHeight / originalHeight) * window.devicePixelRatio;
                // 5. Render optimized canvas
                const canvas = yield window.html2canvas(clone, {
                    scale: 10,
                    windowWidth: 220,
                    windowHeight: 250,
                    useCORS: true,
                    logging: true,
                    backgroundColor: "#ffffff",
                });
                // 6. Create downscaled preview image
                const previewImg = new Image();
                previewImg.src = canvas.toDataURL("image/svg");
                previewImg.style.cssText = `
        width: ${targetWidth}px;
        height: ${targetHeight}px;
        image-rendering: crisp-edges;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px !important;
      `;
                // 7. Cleanup and display
                document.body.removeChild(clone);
                previewContainer.innerHTML = "";
                previewContainer.appendChild(previewImg);
            }
            catch (error) {
                console.error("Preview failed:", error);
                previewContainer.innerHTML =
                    '<div class="preview-error">Preview generation failed</div>';
            }
        });
    }
}
class ShareManager {
    constructor() {
        this.userName = this.extractUserName();
        if (!this.userName) {
            throw new Error("User name is missing. Please ensure the name is added to the profile.");
        }
        const modalElement = this.createShareModal();
        if (!modalElement) {
            throw new Error("Failed to create share modal");
        }
        this.modal = modalElement;
        this.setupShareListeners();
    }
    extractUserName() {
        var _a;
        // Grab the user name from the heading element with class 'profile-name'
        const profileNameElement = document.querySelector(".profile-name");
        console.log("Extracting user name...");
        if (profileNameElement) {
            const user = (_a = profileNameElement.textContent) === null || _a === void 0 ? void 0 : _a.trim(); // Get the name from the heading and trim it
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
    }
    getStoredUserName() {
        const storedName = localStorage.getItem("profileName");
        console.log("Retrieved stored name:", storedName); // Log to check if it's retrieved correctly
        return storedName || "Unnamed User"; // Return stored name or default
    }
    createShareModal() {
        const modal = document.createElement("div");
        modal.innerHTML = `
      <div class="modal-overlay share-overlay" style="display: none;">
        <div class="modal-content share-content">
          <div class="modal-header">
            <h3 class="modal-title">Share Resume</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div id="share-link-container">
            <input type="text" id="share-link" readonly>
            <button id="copy-link">Copy Link</button>
          </div>
          <h4 id="share-heading">Share With Others :</h4>
          <div class="share-buttons">
            <button class="share whatsapp"><img src="assets/whatsapp_3670025.png" alt="whatsapp"></img></button>
            <button class="share linkedin"><img src="assets/social_10110406.png" alt="linkedin"></img></button>
            <button class="share twitter"><img src="assets/social-network_15714543.png" alt="twitter"></img></button>
          </div>
        </div>
      </div>
    `;
        document.body.appendChild(modal);
        console.log("Modal has been created and appended");
        return modal;
    }
    setupShareListeners() {
        const shareBtn = document.getElementById("share-btn");
        if (shareBtn) {
            shareBtn.addEventListener("click", () => {
                this.showModal();
                console.log("Share button clicked");
            });
        }
        else {
            console.error("Share button not found");
        }
        const closeBtn = this.modal.querySelector(".modal-close");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                this.closeModal();
            });
        }
        const overlay = this.modal.querySelector(".modal-overlay");
        if (overlay) {
            overlay.addEventListener("click", (e) => {
                if (e.target === overlay) {
                    this.closeModal();
                }
            });
        }
        const shareButtons = this.modal.querySelectorAll(".share");
        shareButtons.forEach((btn) => {
            btn.addEventListener("click", (e) => this.shareOnPlatform(e));
        });
        const copyBtn = this.modal.querySelector("#copy-link");
        const shareLink = this.modal.querySelector("#share-link");
        if (copyBtn && shareLink) {
            shareLink.value = this.generateUniqueResumeLink();
            copyBtn.addEventListener("click", () => {
                shareLink.select();
                document.execCommand("copy");
            });
        }
    }
    showModal() {
        const overlay = this.modal.querySelector(".modal-overlay");
        if (overlay) {
            overlay.style.display = "flex";
            console.log("Modal shown");
        }
        else {
            console.error("Modal overlay not found");
        }
    }
    closeModal() {
        const overlay = this.modal.querySelector(".modal-overlay");
        if (overlay) {
            overlay.style.display = "none";
        }
    }
    generateUniqueResumeLink() {
        const userName = this.getStoredUserName();
        const userId = this.getUserId(); // Assuming you have a method to get a unique user ID
        const timestamp = new Date().getTime(); // Timestamp to make the URL unique over time
        // Combine the userName, userId, and timestamp to create a truly unique link
        const uniqueId = `${userId}-${timestamp}`;
        // Get the base URL
        const baseUrl = window.location.href.split("?")[0]; // Remove any existing query parameters
        // URL-encode the user information to make it URL-safe
        const encodedUserName = encodeURIComponent(userName);
        const encodedUniqueId = encodeURIComponent(uniqueId);
        // Generate the unique resume link
        const uniqueResumeLink = `${baseUrl}?user=${encodedUserName}&id=${encodedUniqueId}`;
        console.log("Generated unique resume link:", uniqueResumeLink);
        return uniqueResumeLink;
    }
    // Example method to get the user ID (you can modify this logic based on your app)
    getUserId() {
        // This could come from user authentication data, session, or a generated user ID
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            return storedUserId;
        }
        else {
            // If no user ID exists, generate one for the session (can be improved for production)
            const generatedId = Math.random().toString(36).substr(2, 9); // Random alphanumeric ID
            localStorage.setItem("userId", generatedId);
            return generatedId;
        }
    }
    shareOnPlatform(event) {
        const target = event.target;
        const platform = target.classList[1];
        if (!platform || !this.isValidPlatform(platform)) {
            console.error("Invalid sharing platform");
            return;
        }
        const text = encodeURIComponent("Check out my resume!");
        const url = encodeURIComponent(window.location.href);
        const urls = {
            whatsapp: `https://api.whatsapp.com/send?text=${text}%20${url}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        };
        window.open(urls[platform], "_blank");
    }
    isValidPlatform(platform) {
        return ["whatsapp", "linkedin", "twitter"].includes(platform);
    }
}
class EditManager {
    constructor() {
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
    toggleNavbarFooterVisibility() {
        const navbar = document.getElementById("heading-nav-bar");
        const footer = document.getElementById("footer");
        if (navbar) {
            navbar.style.display = this.isEditing ? "none" : "flex";
        }
        if (footer) {
            footer.style.display = this.isEditing ? "none" : "flex";
        }
    }
    setupEditListeners() {
        var _a;
        // Listen for the "edit" button click to toggle edit mode
        (_a = document.getElementById("edit-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            this.toggleEditMode();
        });
        // Wait until DOM is fully loaded to ensure elements exist
        document.addEventListener("DOMContentLoaded", () => {
            this.initializeEditableElements();
        });
    }
    initializeEditableElements() {
        // Loop through the editable elements and add click listeners for editing
        this.editableElements.forEach((selector) => {
            document.querySelectorAll(selector).forEach((el) => {
                const htmlElement = el;
                htmlElement.addEventListener("click", () => this.toggleContentEditable(htmlElement));
            });
        });
    }
    toggleEditMode() {
        this.isEditing = !this.isEditing;
        // Enable or disable contenteditable based on whether we are in edit mode
        document
            .querySelectorAll(this.editableElements.join(","))
            .forEach((el) => {
            const htmlElement = el;
            if (this.isEditing) {
                htmlElement.setAttribute("contenteditable", "true");
                htmlElement.classList.add("editable");
            }
            else {
                htmlElement.removeAttribute("contenteditable");
                htmlElement.classList.remove("editable");
                this.saveChanges(); // Save changes when editing is turned off
            }
        });
        this.updateEditButton();
        this.toggleNavbarFooterVisibility();
    }
    toggleContentEditable(element) {
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
    }
    updateEditButton() {
        const editBtn = document.getElementById("edit-btn");
        if (!editBtn)
            return;
        if (this.isEditing) {
            editBtn.textContent = "Save"; // Change button text to "Save" when in edit mode
        }
        else {
            editBtn.innerHTML =
                "<img src='assets/pencil_12281340.png' alt='edit-btn'>"; // Reset button content when not editing
        }
    }
    saveChanges() {
        var _a, _b, _c, _d, _e, _f, _g;
        const data = {
            profile: {
                name: ((_a = document.querySelector(".profile-name")) === null || _a === void 0 ? void 0 : _a.textContent) || "",
                email: ((_b = document.querySelector(".em-span")) === null || _b === void 0 ? void 0 : _b.textContent) || "",
                contact: ((_c = document.querySelector(".con-span")) === null || _c === void 0 ? void 0 : _c.textContent) || "",
                address: ((_d = document.querySelector(".Add-span")) === null || _d === void 0 ? void 0 : _d.textContent) || "",
                profileText: ((_e = document.querySelector(".profile-description")) === null || _e === void 0 ? void 0 : _e.textContent) || "",
            },
            education: ((_f = document.querySelector(".education-content")) === null || _f === void 0 ? void 0 : _f.textContent) || "",
            experience: ((_g = document.querySelector(".experience-content")) === null || _g === void 0 ? void 0 : _g.textContent) || "",
            skills: Array.from(document.querySelectorAll(".skills-list li")).map((li) => li.textContent || ""),
            languages: Array.from(document.querySelectorAll(".languages-list li")).map((li) => li.textContent || ""),
        };
        // Save the updated resume data in localStorage
        localStorage.setItem("resumeData", JSON.stringify(data));
    }
    loadProfile() {
        var _a, _b, _c, _d, _e, _f, _g;
        const storedData = localStorage.getItem("resumeData");
        if (storedData) {
            const data = JSON.parse(storedData);
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
            const skillsList = document.querySelector(".skills-list");
            if (skillsList) {
                (_f = data.skills) === null || _f === void 0 ? void 0 : _f.forEach((skill) => {
                    const li = document.createElement("li");
                    li.textContent = skill;
                    skillsList.appendChild(li);
                });
            }
            const languagesList = document.querySelector(".languages-list");
            if (languagesList) {
                (_g = data.languages) === null || _g === void 0 ? void 0 : _g.forEach((language) => {
                    const li = document.createElement("li");
                    li.textContent = language;
                    languagesList.appendChild(li);
                });
            }
        }
    }
}
class createContactUSModal {
    constructor() {
        this.modal = this.createModal();
        this.setupContactUSModal();
    }
    setupContactUSModal() {
        this.setupContactListeners();
    }
    createModal() {
        const modal = document.createElement("div");
        modal.innerHTML = `
    <div class="modal-overlay contact-overlay" style="display: none;">
        <div class="modal-content contact-content">
          <div class="contact-header">
            <h3 class="contact-title">Contact Us</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div class="contact-form">
            <form id="contact-form">
              <div class="comment-head">
              <h4 class="comment-heading">Comment US</h4>
              </div>
              <div class="name-email">
              <input type="text" id="contact-name" placeholder="Name">
              <input type="email" id="contact-email" placeholder="Email">
              </div>
              <textarea id="contact-message" placeholder="Message" tabindex="0"></textarea>
              <button type="button" class="comment-button">Send</button>
            </form>
            <div id="social-links">
            <h4 class="follow-heading">Follow ON Your Favorite Social Media Platforms :</h4>
            <div class="contact-buttons">
            <button class="follow whatsapp"><a href="https://www.instagram.com/aman.nazim07/"><img src="assets/instagram_1400813.png" alt="insta"></a></img></button>
            <button class="follow whatsapp"><a href="https://www.facebook.com/amannazim98"><img src="assets/facebook_408796.png" alt="facebook"></a></img></button>
            <button class="follow linkedin"><a href="https://www.linkedin.com/in/aman-nazim-b9a0a0305"><img src="assets/linkedin_255287.png" alt="linkedin"></a></img></button>
            </div>
            </div>
          </div>
        </div>
      </div>
    `;
        document.body.appendChild(modal);
        return modal;
    }
    setupContactListeners() {
        // Fix: Change from contact-btn to contact-btn class since that's what's in the HTML
        const contactBtn = document.querySelector(".contact-btn");
        if (contactBtn) {
            contactBtn.addEventListener("click", () => {
                this.showModal();
            });
        }
        const closeBtn = this.modal.querySelector(".modal-close");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => this.closeModal());
        }
        // Add click handler for overlay to close when clicking outside
        const overlay = this.modal.querySelector(".modal-overlay");
        if (overlay) {
            overlay.addEventListener("click", (e) => {
                if (e.target === overlay) {
                    this.closeModal();
                }
            });
        }
    }
    showModal() {
        const overlay = this.modal.querySelector(".modal-overlay");
        if (overlay) {
            overlay.style.display = "flex";
        }
    }
    closeModal() {
        const overlay = this.modal.querySelector(".modal-overlay");
        if (overlay) {
            overlay.style.display = "none";
        }
    }
}
class Dashboard {
    constructor() {
        this.dashboard = this.createDashboardSection();
        this.initializeProfile(); // Initialize profile on dashboard creation
        this.setupDashboardListeners();
    }
    createDashboardSection() {
        const dashboard = document.createElement("div");
        dashboard.id = "dashboard-section";
        dashboard.innerHTML = `
    <div id="dashboard-overlay">
    <div id="dashboard-header">
      <h1 id="dash-heading">Dashboard</h1>
      <button id="close-dashboard">&times;</button>
    </div>
      <div id="profile-inp-div">
        <h2 id="dash-profile">Profile :</h2>
      </div>
      <div id="center-div">
        <div id="dash-pic"><img src="" alt="profile-pic" id="dash-pic-img"></div>
        <input type="file" id="profile-pic-inp">
        <h1 id="dash-name"></h1>
      </div>
    </div>
    `;
        document.body.appendChild(dashboard);
        return dashboard;
    }
    setupDashboardListeners() {
        const dashboardBtn = document.querySelector(".nav-dash");
        if (dashboardBtn) {
            dashboardBtn.addEventListener("click", () => {
                this.toggleDashboard(); // Toggle the dashboard visibility when clicked
                this.closeDashboard();
            });
        }
    }
    toggleDashboard() {
        this.dashboard.classList.add("show-dashboard");
    }
    closeDashboard() {
        const closeBtn = this.dashboard.querySelector("#close-dashboard");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                this.dashboard.classList.remove("show-dashboard");
            });
        }
    }
    // Function to initialize profile from localStorage (called on page load)
    initializeProfile() {
        const storedName = localStorage.getItem("profileName");
        const storedPic = localStorage.getItem("profilePic");
        if (storedName) {
            // Update profile if name exists in localStorage
            this.updateProfile(storedName, storedPic || "");
        }
    }
    // Function to update profile name and profile picture from localStorage
    updateProfile(name, image) {
        const profileNameElement = document.querySelector("#dash-name");
        const profilePicElement = document.getElementById("dash-pic");
        const profilePicInp = document.getElementById("profile-pic-inp");
        let profilePicimg = document.getElementById("dash-pic-img");
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
            profilePicInp.addEventListener("change", (e) => {
                var _a;
                const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        var _a;
                        const dataUrl = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
                        // Update the image element with the newly selected file
                        profilePicimg.src = dataUrl;
                        // Optionally, update localStorage for persistence
                        localStorage.setItem("profilePic", dataUrl);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }
}
const buttons = document.querySelectorAll(".hide-buttons");
buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
        // Force DOM reflow to reset animation
        void button.offsetWidth;
        // Add temporary active class
        button.classList.add("shining");
        // Remove class after animation
        setTimeout(() => {
            button.classList.remove("shining");
        }, 600000);
    });
});
function setupLabelLineFocus() {
    // Select all input containers
    const inputContainers = document.querySelectorAll(".input-container");
    inputContainers.forEach((container) => {
        // Find the input element within the container
        const input = container.querySelector(".input-style");
        if (!input)
            return; // Skip containers without inputs
        // Add click handler to container
        container.addEventListener("click", (event) => {
            // Only focus if clicking directly on the container (not its children)
            if (event.target === container) {
                input.focus();
                container.classList.add("input-container--focused");
            }
        });
    });
}
// Initialize the functionality
setupLabelLineFocus();
//# sourceMappingURL=manager.js.map