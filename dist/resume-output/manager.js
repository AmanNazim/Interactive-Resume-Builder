// import "./Styles/resume-output.css";
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
    // new createContactUSModal();
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
            <select id="format" class="format-select">
              <option value="pdf">PDF Document</option>
              <option value="png">PNG Image</option>
            </select>
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
            });
        }
        const confirmBtn = this.modal.querySelector("#confirm-download");
        if (confirmBtn) {
            confirmBtn.addEventListener("click", () => {
                var _a;
                const format = ((_a = this.modal.querySelector("#format")) === null || _a === void 0 ? void 0 : _a.value) ||
                    "pdf";
                if (format === "pdf") {
                    this.generatePdf();
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
    // Generate PDF from resume content
    generatePdf() {
        var _a;
        // Ensure html2canvas is loaded before use
        if (!window.html2canvas) {
            console.error("html2canvas is not loaded.");
            return;
        }
        const jsPDF = window.jsPDF;
        const html2canvas = window.html2canvas;
        // Create a new jsPDF instance
        const jsPdf = new jsPDF("p", "pt", "letter");
        const themeNumber = ((_a = new URLSearchParams(window.location.search).get("theme")) === null || _a === void 0 ? void 0 : _a.slice(-1)) ||
            "1";
        const htmlElement = document.getElementById(`resume${themeNumber}-output`);
        if (htmlElement) {
            const options = {
                margin: [72, 72, 72, 72],
                autoPaging: "text",
                html2canvas: {
                    allowTaint: true,
                    dpi: 300,
                    letterRendering: true,
                    logging: false,
                    scale: 0.8,
                },
                callback: (jsPdf) => {
                    jsPdf.save("Resume.pdf"); // Save the PDF
                },
            };
            jsPdf.html(htmlElement, options);
        }
        else {
            console.error("Target HTML element not found");
        }
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
}
// private async downloadFile(fileUrl: string, filename: string): Promise<void> {
//   try {
//     const response = await fetch(fileUrl);
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const blob = await response.blob();
//     const blobUrl = URL.createObjectURL(blob);
//     const img = new Image();
//     await new Promise((resolve, reject) => {
//       img.onload = resolve;
//       img.onerror = reject;
//       img.src = blobUrl;
//     });
//     const pdf = new jsPDF();
//     pdf.addImage(img, "PNG", 0, 0, 210, 297);
//     pdf.save(filename);
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.style.display = "none";
//     a.href = url;
//     a.download = filename;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     window.URL.revokeObjectURL(url);
//   } catch (error) {
//     console.error("There was a problem with the fetch operation:", error);
//   }
// }
// private async downloadResume(format: string): Promise<void> {
//   try {
//     const themeNumber =
//       (await new URLSearchParams(window.location.search)
//         .get("theme")
//         ?.slice(-1)) || "1";
//     const element = await document.querySelector(
//       `resume${themeNumber}-output`
//     );
//     if (!element) {
//       throw new Error("Resume container not found");
//     }
//     // Show loading state
//     const downloadBtn = this.modal.querySelector("#confirm-download");
//     if (downloadBtn) {
//       downloadBtn.textContent = "Preparing download...";
//       downloadBtn.setAttribute("disabled", "true");
//     }
//     const clone = (await element.cloneNode(true)) as HTMLElement;
//     clone.style.cssText = `
//       width: 210mm;
//       min-height: 297mm;
//       padding: 20mm;
//       background: white;
//     `;
//     // Create a wrapper with white background
//     const wrapper = await document.createElement("div");
//     wrapper.style.cssText = `
//       position: fixed;
//       top: -9999px;
//       left: -9999px;
//       background: white;
//       width: 210mm;
//       min-height: 297mm;
//     `;
//     wrapper.appendChild(clone);
//     document.body.appendChild(wrapper);
//     try {
//       const canvas = await html2canvas(wrapper, {
//         scale: 2,
//         useCORS: true,
//         allowTaint: true,
//         backgroundColor: "#ffffff",
//         logging: true,
//         foreignObjectRendering: true,
//       });
//       if (format === "pdf") {
//         const pdf = await new jsPDF.jsPDF({
//           orientation: "portrait",
//           unit: "mm",
//           format: "a4",
//           compress: true,
//         });
//         const imgData = canvas.toDataURL("image/jpeg", 1.0);
//         pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
//         pdf.save(`resume-${new Date().toISOString().split("T")[0]}.pdf`);
//       } else {
//         canvas.toBlob(
//           (blob: Blob | null) => {
//             if (blob) {
//               saveAs(
//                 blob,
//                 `resume-${new Date().toISOString().split("T")[0]}.${format}`
//               );
//             }
//           },
//           `image/${format}`,
//           1.0
//         );
//       }
//     } finally {
//       wrapper.remove();
//     }
//     this.closeModal();
//   } catch (error) {
//     console.error("Download failed:", error);
//     alert("Download failed. Please try again.");
//   } finally {
//     const downloadBtn = this.modal.querySelector("#confirm-download");
//     if (downloadBtn) {
//       downloadBtn.textContent = "Download Resume";
//       downloadBtn.removeAttribute("disabled");
//     }
//   }
// }
// private async generatePreview(): Promise<void> {
//   const previewContainer = this.modal.querySelector("#download-preview");
//   // Change selector to match the visible resume template
//   const element = document.querySelector("#resume1-output");
//   if (!previewContainer || !element) {
//     console.error("Required elements not found");
//     return;
//   }
//   try {
//     previewContainer.innerHTML =
//       '<div class="preview-loading">Generating preview...</div>';
//     const clone = element.cloneNode(true) as HTMLElement;
//     // Adjust clone styles for better preview
//     clone.style.cssText = `
//       width: 210mm;
//       min-height: 297mm;
//       padding: 20mm;
//       background: white;
//       transform: scale(0.2);
//       transform-origin: top left;
//     `;
//     // @ts-ignore
//     const canvas = await html2canvas(clone, {
//       scale: 1,
//       useCORS: true,
//       allowTaint: true,
//       backgroundColor: "#ffffff",
//       logging: true, // Enable logging for debugging
//       foreignObjectRendering: true,
//     });
//     previewContainer.innerHTML = "";
//     canvas.style.cssText = "width: 100%; height: auto; max-height: 400px;";
//     previewContainer.appendChild(canvas);
//   } catch (error) {
//     console.error("Preview generation failed:", error);
//     previewContainer.innerHTML =
//       '<div class="preview-error">Preview generation failed</div>';
//   }
// }
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
            <button class="share twitter"><img src="assets/twitter_5969020.png" alt="twitter"></img></button>
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
            editBtn.innerHTML = "<img src='assets/pen_18221918.png' alt='edit-btn'>"; // Reset button content when not editing
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
export {};
// class createContactUSModal {
//   private modal: HTMLDivElement;
//   constructor() {
//     this.modal = this.createModal();
//     this.setupContactUSModal();
//   }
//   private setupContactUSModal(): void {
//     this.setupContactListeners();
//   }
//   private createModal(): HTMLDivElement {
//     const modal = document.createElement("div");
//     modal.innerHTML = `
//     <div class="modal-overlay contact-overlay" style="display: none;">
//         <div class="modal-content contact-content">
//           <div class="modal-header">
//             <h3 class="modal-title">Contact Us</h3>
//             <button class="modal-close">&times;</button>
//           </div>
//           <div class="contact-form">
//             <form id="contact-form">
//               <input type="text" id="name" placeholder="Name">
//               <input type="email" id="email" placeholder="Email">
//               <textarea id="message" placeholder="Message"></textarea>
//             </form>
//           </div>
//         </div>
//       </div>
//     `;
//     document.body.appendChild(modal);
//     return modal;
//   }
//   private setupContactListeners(): void {
//     // Fix: Change from contact-btn to contact-btn class since that's what's in the HTML
//     const contactBtn = document.querySelector(".contact-btn");
//     if (contactBtn) {
//       contactBtn.addEventListener("click", () => {
//         this.showModal();
//       });
//     }
//     const closeBtn = this.modal.querySelector(".modal-close");
//     if (closeBtn) {
//       closeBtn.addEventListener("click", () => this.closeModal());
//     }
//     // Add click handler for overlay to close when clicking outside
//     const overlay = this.modal.querySelector(".modal-overlay");
//     if (overlay) {
//       overlay.addEventListener("click", (e) => {
//         if (e.target === overlay) {
//           this.closeModal();
//         }
//       });
//     }
//   }
//   private showModal(): void {
//     const overlay = this.modal.querySelector(".modal-overlay") as HTMLElement;
//     if (overlay) {
//       overlay.style.display = "flex";
//     }
//   }
//   private closeModal(): void {
//     const overlay = this.modal.querySelector(".modal-overlay") as HTMLElement;
//     if (overlay) {
//       overlay.style.display = "none";
//     }
//   }
// }
// class Dashboard {
//   private dashboard: HTMLDivElement;
//   constructor() {
//     this.dashboard = this.createDashboardSection();
//     this.initializeProfile(); // Initialize profile on dashboard creation
//     this.setupDashboardListeners();
//   }
//   private createDashboardSection(): HTMLDivElement {
//     const dashboard = document.createElement("div");
//     dashboard.id = "dashboard-section";
//     dashboard.innerHTML = `
//       <div id="profile-inp-div">
//         <h2 id="dash-profile">Profile</h2>
//         <input type="text" id="profile-nam-inp">
//         <input type="file" id="profile-pic-inp">
//         <button id="saveProfileBtn">Done</button>
//       </div>
//       <div id="center-div">
//         <div id="dash-pic"></div>
//         <h1 id="dash-name">Full Name</h1>
//       </div>
//       <div>
//         <h2 id="dash-download">Download</h2>
//         <h3>no downloads yet</h3>
//       </div>
//     `;
//     document.body.appendChild(dashboard);
//     return dashboard;
//   }
//   private setupDashboardListeners(): void {
//     const dashboardBtn = document.querySelector("#nav-dash");
//     if (dashboardBtn) {
//       dashboardBtn.addEventListener("click", () => {
//         this.toggleDashboard(); // Toggle the dashboard visibility when clicked
//       });
//     }
//   }
//   private toggleDashboard(): void {
//     this.dashboard.classList.toggle("show-dashboard");
//   }
//   // Function to initialize profile from localStorage (called on page load)
//   private initializeProfile(): void {
//     const storedName = localStorage.getItem("profileName");
//     const storedPic = localStorage.getItem("profilePic");
//     if (storedName) {
//       // Update profile if name exists in localStorage
//       this.updateProfile(storedName, storedPic || "");
//     }
//   }
//   // Function to update profile name and profile picture from localStorage
//   private updateProfile(name: string, image: string): void {
//     const profileNameElement = document.querySelector(
//       "#dash-name"
//     ) as HTMLHeadingElement;
//     const profilePicElement = document.getElementById(
//       "dash-pic"
//     ) as HTMLDivElement;
//     if (profileNameElement) {
//       profileNameElement.textContent = name; // Update the name
//     }
//     if (profilePicElement && image) {
//       const img = document.createElement("img");
//       img.src = image;
//       img.alt = "Profile Picture";
//       img.style.width = "100px";
//       img.style.height = "100px";
//       img.style.borderRadius = "50%";
//       img.style.objectFit = "cover";
//       profilePicElement.innerHTML = ""; // Clear any existing content
//       profilePicElement.appendChild(img); // Append the new image
//     }
//   }
// }
// // Initialize the dashboard
// document.addEventListener("DOMContentLoaded", () => {
//   new Dashboard(); // Instantiate and setup the dashboard
// });
//# sourceMappingURL=manager.js.map