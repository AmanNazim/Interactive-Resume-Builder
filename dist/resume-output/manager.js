var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
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
    new createContactUSModal();
}
// 1. Download Manager
class DownloadManager {
    constructor() {
        const modalElement = this.createDownloadModal();
        if (!modalElement) {
            throw new Error("Failed to create download modal");
        }
        this.modal = modalElement;
        this.setupDownloadListeners();
    }
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
    setupDownloadListeners() {
        const downloadBtn = document.getElementById("download-btn");
        if (downloadBtn) {
            downloadBtn.addEventListener("click", () => {
                this.showModal();
                // this.generatePreview();
            });
        }
        const confirmBtn = this.modal.querySelector("#confirm-download");
        if (confirmBtn) {
            confirmBtn.addEventListener("click", () => {
                var _a;
                const format = ((_a = this.modal.querySelector("#format")) === null || _a === void 0 ? void 0 : _a.value) ||
                    "pdf";
                // this.downloadFile(window.URL.createObjectURL(new Blob()), "resume.pdf");
                // this.generatePdf();
                this.downloadResume(format);
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
    // private generatePdf() {
    //   let pdf = new jsPDF("p", "pt", "letter");
    // const themeNumber =
    //   new URLSearchParams(window.location.search).get("theme")?.slice(-1) ||
    //   "1";
    //   const htmlElement = document.getElementById(`resume${themeNumber}-output`);
    //   if (!htmlElement) {
    //     console.error("Resume element not found");
    //     return;
    //   }
    //   // Create a clone of the element to avoid modifying the original
    //   const clone = htmlElement.cloneNode(true) as HTMLElement;
    //   // Get computed styles for the original element and its children
    //   const styles = window.getComputedStyle(htmlElement);
    //   const styleText = `
    //     #${clone.id} {
    //       ${Array.from(styles)
    //         .map((prop) => `${prop}: ${styles.getPropertyValue(prop)};`)
    //         .join("\n")}
    //     }
    //   `;
    //   // Apply styles to children elements
    //   const children = htmlElement.getElementsByTagName("main");
    //   for (let i = 0; i < children.length; i++) {
    //     const element = children[i];
    //     const computedStyle = window.getComputedStyle(element);
    //     let elementStyle = `
    //       #${clone.id} ${element.tagName.toLowerCase()}:not(style) {
    //         ${Array.from(computedStyle)
    //           .map((prop) => `${prop}: ${computedStyle.getPropertyValue(prop)};`)
    //           .join("\n")}
    //       }
    //     `;
    //     let styleText: any;
    //     styleText += elementStyle;
    //   }
    //   // Create and append style element
    //   const style = document.createElement("style");
    //   style.textContent = styleText;
    //   clone.appendChild(style);
    //   // Generate PDF with computed styles
    //   const opt = {
    //     callback: function (jsPdf: any) {
    //       jsPdf.save("Resume.pdf");
    //     },
    //     margin: [72, 72, 72, 72],
    //     autoPaging: "text",
    //     html2canvas: {
    //       allowTaint: true,
    //       dpi: 300,
    //       letterRendering: true,
    //       logging: true, // Enable logging for debugging
    //       scale: 0.8,
    //     },
    //   };
    //   pdf.html(clone, opt);
    // }
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
    downloadResume(format) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const themeNumber = (yield ((_a = new URLSearchParams(window.location.search)
                    .get("theme")) === null || _a === void 0 ? void 0 : _a.slice(-1))) || "1";
                const element = yield document.querySelector(`resume${themeNumber}-output`);
                if (!element) {
                    throw new Error("Resume container not found");
                }
                // Show loading state
                const downloadBtn = this.modal.querySelector("#confirm-download");
                if (downloadBtn) {
                    downloadBtn.textContent = "Preparing download...";
                    downloadBtn.setAttribute("disabled", "true");
                }
                const clone = (yield element.cloneNode(true));
                clone.style.cssText = `
        width: 210mm;
        min-height: 297mm;
        padding: 20mm;
        background: white;
      `;
                // Create a wrapper with white background
                const wrapper = yield document.createElement("div");
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
                try {
                    const canvas = yield html2canvas(wrapper, {
                        scale: 2,
                        useCORS: true,
                        allowTaint: true,
                        backgroundColor: "#ffffff",
                        logging: true,
                        foreignObjectRendering: true,
                    });
                    if (format === "pdf") {
                        const pdf = yield new jsPDF.jsPDF({
                            orientation: "portrait",
                            unit: "mm",
                            format: "a4",
                            compress: true,
                        });
                        const imgData = canvas.toDataURL("image/jpeg", 1.0);
                        pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
                        pdf.save(`resume-${new Date().toISOString().split("T")[0]}.pdf`);
                    }
                    else {
                        canvas.toBlob((blob) => {
                            if (blob) {
                                saveAs(blob, `resume-${new Date().toISOString().split("T")[0]}.${format}`);
                            }
                        }, `image/${format}`, 1.0);
                    }
                }
                finally {
                    wrapper.remove();
                }
                this.closeModal();
            }
            catch (error) {
                console.error("Download failed:", error);
                alert("Download failed. Please try again.");
            }
            finally {
                const downloadBtn = this.modal.querySelector("#confirm-download");
                if (downloadBtn) {
                    downloadBtn.textContent = "Download Resume";
                    downloadBtn.removeAttribute("disabled");
                }
            }
        });
    }
    generatePreview() {
        return __awaiter(this, void 0, void 0, function* () {
            const previewContainer = this.modal.querySelector("#download-preview");
            // Change selector to match the visible resume template
            const element = document.querySelector("#resume1-output");
            if (!previewContainer || !element) {
                console.error("Required elements not found");
                return;
            }
            try {
                previewContainer.innerHTML =
                    '<div class="preview-loading">Generating preview...</div>';
                const clone = element.cloneNode(true);
                // Adjust clone styles for better preview
                clone.style.cssText = `
        width: 210mm;
        min-height: 297mm;
        padding: 20mm;
        background: white;
        transform: scale(0.2);
        transform-origin: top left;
      `;
                // @ts-ignore
                const canvas = yield html2canvas(clone, {
                    scale: 1,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: "#ffffff",
                    logging: true, // Enable logging for debugging
                    foreignObjectRendering: true,
                });
                previewContainer.innerHTML = "";
                canvas.style.cssText = "width: 100%; height: auto; max-height: 400px;";
                previewContainer.appendChild(canvas);
            }
            catch (error) {
                console.error("Preview generation failed:", error);
                previewContainer.innerHTML =
                    '<div class="preview-error">Preview generation failed</div>';
            }
        });
    }
}
// 2. Share Manager
class ShareManager {
    constructor() {
        const modalElement = this.createShareModal();
        if (!modalElement) {
            throw new Error("Failed to create share modal");
        }
        this.modal = modalElement;
        this.setupShareListeners();
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
          <input type="text" id="share-link" readonly>
          <button id="copy-link">Copy Link</button>
          <div class="share-buttons">
            <button class="share whatsapp">WhatsApp</button>
            <button class="share linkedin">LinkedIn</button>
            <button class="share twitter">Twitter</button>
          </div>
        </div>
      </div>
    `;
        document.body.appendChild(modal);
        return modal;
    }
    setupShareListeners() {
        const shareBtn = document.getElementById("share-btn");
        if (shareBtn) {
            shareBtn.addEventListener("click", () => {
                this.showModal();
            });
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
            shareLink.value = window.location.href;
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
        }
    }
    closeModal() {
        const overlay = this.modal.querySelector(".modal-overlay");
        if (overlay) {
            overlay.style.display = "none";
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
// 3. Edit Manager
class EditManager {
    constructor() {
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
    setupEditListeners() {
        var _a;
        (_a = document.getElementById("edit-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            this.toggleEditMode();
        });
    }
    toggleEditMode() {
        this.isEditing = !this.isEditing;
        document.querySelectorAll("h1, h2, h3, h4, h5, h6, label").forEach((el) => {
            el.classList.add("non-editable");
        });
        this.editableElements.forEach((selector) => {
            document.querySelectorAll(selector).forEach((el) => {
                el.setAttribute("contenteditable", this.isEditing.toString());
                if (this.isEditing) {
                    el.classList.add("editable");
                }
                else {
                    el.classList.remove("editable");
                    this.saveChanges();
                }
            });
        });
        this.updateEditButton();
        const resumeOutputContainer = document.getElementById("resume-output-container");
        resumeOutputContainer === null || resumeOutputContainer === void 0 ? void 0 : resumeOutputContainer.classList.toggle("edit-mode", this.isEditing);
        document.body.style.zIndex = this.isEditing ? "-1111" : "0";
    }
    updateEditButton() {
        const editBtn = document.getElementById("edit-btn");
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
        localStorage.setItem("resumeData", JSON.stringify(data));
    }
}
function html2pdf(resumeElement, p0) {
    throw new Error("Function not implemented.");
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
          <div class="modal-header">
            <h3 class="modal-title">Contact Us</h3>
            <button class="modal-close">&times;</button>    
          </div>
          <div class="contact-form">
            <form id="contact-form">
              <input type="text" id="name" placeholder="Name">
              <input type="email" id="email" placeholder="Email">
              <textarea id="message" placeholder="Message"></textarea>
            </form>
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
//# sourceMappingURL=manager.js.map