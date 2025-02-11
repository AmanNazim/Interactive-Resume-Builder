import * as jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

// import "./Styles/resume-output.css";

// // Initialize after DOM load
document.addEventListener("DOMContentLoaded", () => {
  try {
    initializeManagers();
  } catch (error) {
    console.error("Error initializing managers:", error);
  }
});

// Fix the initialization error by moving it inside a function
function initializeManagers(): void {
  new DownloadManager();
  new ShareManager();
  new EditManager();
  new createContactUSModal();
}

// 1. Download Manager
class DownloadManager {
  private modal: HTMLDivElement;

  constructor() {
    const modalElement = this.createDownloadModal();
    if (!modalElement) {
      throw new Error("Failed to create download modal");
    }
    this.modal = modalElement;
    this.setupDownloadListeners();
  }

  private createDownloadModal(): HTMLDivElement {
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

  private setupDownloadListeners(): void {
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
        const format =
          (this.modal.querySelector("#format") as HTMLSelectElement)?.value ||
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
        if (e.target === overlay) this.closeModal();
      });
    }
  }

  private showModal(): void {
    const overlay = this.modal.querySelector(".modal-overlay") as HTMLElement;
    if (overlay) {
      overlay.style.display = "flex";
    }
  }

  private closeModal(): void {
    const overlay = this.modal.querySelector(".modal-overlay") as HTMLElement;
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

  private async downloadResume(format: string): Promise<void> {
    try {
      const themeNumber =
        (await new URLSearchParams(window.location.search)
          .get("theme")
          ?.slice(-1)) || "1";
      const element = await document.querySelector(
        `resume${themeNumber}-output`
      );
      if (!element) {
        throw new Error("Resume container not found");
      }

      // Show loading state
      const downloadBtn = this.modal.querySelector("#confirm-download");
      if (downloadBtn) {
        downloadBtn.textContent = "Preparing download...";
        downloadBtn.setAttribute("disabled", "true");
      }

      const clone = (await element.cloneNode(true)) as HTMLElement;
      clone.style.cssText = `
        width: 210mm;
        min-height: 297mm;
        padding: 20mm;
        background: white;
      `;

      // Create a wrapper with white background
      const wrapper = await document.createElement("div");
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
        const canvas = await html2canvas(wrapper, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          logging: true,
          foreignObjectRendering: true,
        });
        if (format === "pdf") {
          const pdf = await new jsPDF.jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
            compress: true,
          });

          const imgData = canvas.toDataURL("image/jpeg", 1.0);
          pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
          pdf.save(`resume-${new Date().toISOString().split("T")[0]}.pdf`);
        } else {
          canvas.toBlob(
            (blob: Blob | null) => {
              if (blob) {
                saveAs(
                  blob,
                  `resume-${new Date().toISOString().split("T")[0]}.${format}`
                );
              }
            },
            `image/${format}`,
            1.0
          );
        }
      } finally {
        wrapper.remove();
      }

      this.closeModal();
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed. Please try again.");
    } finally {
      const downloadBtn = this.modal.querySelector("#confirm-download");
      if (downloadBtn) {
        downloadBtn.textContent = "Download Resume";
        downloadBtn.removeAttribute("disabled");
      }
    }
  }

  private async generatePreview(): Promise<void> {
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

      const clone = element.cloneNode(true) as HTMLElement;
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
      const canvas = await html2canvas(clone, {
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
    } catch (error) {
      console.error("Preview generation failed:", error);
      previewContainer.innerHTML =
        '<div class="preview-error">Preview generation failed</div>';
    }
  }
}

// 2. Share Manager
class ShareManager {
  private readonly modal: HTMLDivElement;

  constructor() {
    const modalElement = this.createShareModal();
    if (!modalElement) {
      throw new Error("Failed to create share modal");
    }
    this.modal = modalElement;
    this.setupShareListeners();
  }

  private createShareModal(): HTMLDivElement {
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

  private setupShareListeners(): void {
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
    const shareLink = this.modal.querySelector(
      "#share-link"
    ) as HTMLInputElement;
    if (copyBtn && shareLink) {
      shareLink.value = window.location.href;
      copyBtn.addEventListener("click", () => {
        shareLink.select();
        document.execCommand("copy");
      });
    }
  }

  private showModal(): void {
    const overlay = this.modal.querySelector(".modal-overlay") as HTMLElement;
    if (overlay) {
      overlay.style.display = "flex";
    }
  }

  private closeModal(): void {
    const overlay = this.modal.querySelector(".modal-overlay") as HTMLElement;
    if (overlay) {
      overlay.style.display = "none";
    }
  }

  private shareOnPlatform(event: Event): void {
    const target = event.target as HTMLElement;
    const platform = target.classList[1];
    if (!platform || !this.isValidPlatform(platform)) {
      console.error("Invalid sharing platform");
      return;
    }

    const text = encodeURIComponent("Check out my resume!");
    const url = encodeURIComponent(window.location.href);

    interface SharePlatforms {
      whatsapp: string;
      linkedin: string;
      twitter: string;
    }

    const urls: SharePlatforms = {
      whatsapp: `https://api.whatsapp.com/send?text=${text}%20${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    };

    window.open(urls[platform as keyof SharePlatforms], "_blank");
  }
  private isValidPlatform(platform: string): boolean {
    return ["whatsapp", "linkedin", "twitter"].includes(platform);
  }
}

// 3. Edit Manager
class EditManager {
  private isEditing = false;
  private readonly editableElements: readonly string[] = [
    ".profile-description",
    ".education-content",
    ".experience-content",
    ".skills-list li",
    ".languages-list li",
    ".em-span",
    ".con-span",
    ".Add-span",
  ] as const;

  constructor() {
    this.setupEditListeners();
  }

  private setupEditListeners(): void {
    document.getElementById("edit-btn")?.addEventListener("click", () => {
      this.toggleEditMode();
    });
  }

  private toggleEditMode(): void {
    this.isEditing = !this.isEditing;

    document.querySelectorAll("h1, h2, h3, h4, h5, h6, label").forEach((el) => {
      el.classList.add("non-editable");
    });

    this.editableElements.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.setAttribute("contenteditable", this.isEditing.toString());
        if (this.isEditing) {
          el.classList.add("editable");
        } else {
          el.classList.remove("editable");
          this.saveChanges();
        }
      });
    });

    this.updateEditButton();
    const resumeOutputContainer = document.getElementById(
      "resume-output-container"
    );
    resumeOutputContainer?.classList.toggle("edit-mode", this.isEditing);
    document.body.style.zIndex = this.isEditing ? "-1111" : "0";
  }

  private updateEditButton(): void {
    const editBtn = document.getElementById("edit-btn");
    if (!editBtn) return;

    if (this.isEditing) {
      editBtn.textContent = "Save";
      Object.assign(editBtn.style, {
        color: "white",
        backgroundColor: "var(--primary-bg-color)",
        border: "1px solid var(--primary-light-color)",
      });
    } else {
      editBtn.innerHTML = "<img src='assets/pen_18221918.png' alt='edit-btn'>";
      Object.assign(editBtn.style, {
        transition: "all 1s ease-in-out",
        backgroundColor: "var(--primary-light-color)",
        border: "2px solid var(--primary-bg-color)",
      });
    }
  }

  private saveChanges(): void {
    const data: Partial<ResumeData> = {
      profile: {
        name: document.querySelector(".profile-name")?.textContent || "",
        email: document.querySelector(".em-span")?.textContent || "",
        contact: document.querySelector(".con-span")?.textContent || "",
        address: document.querySelector(".Add-span")?.textContent || "",
        profileText:
          document.querySelector(".profile-description")?.textContent || "",
      },
      education:
        document.querySelector(".education-content")?.textContent || "",
      experience:
        document.querySelector(".experience-content")?.textContent || "",
      skills: Array.from(document.querySelectorAll(".skills-list li")).map(
        (li) => li.textContent || ""
      ),
      languages: Array.from(
        document.querySelectorAll(".languages-list li")
      ).map((li) => li.textContent || ""),
    };

    localStorage.setItem("resumeData", JSON.stringify(data));
  }
}
function html2pdf(
  resumeElement: Element,
  p0: { filename: string; html2canvas: { scale: number } }
) {
  throw new Error("Function not implemented.");
}

class createContactUSModal {
  private modal: HTMLDivElement;

  constructor() {
    this.modal = this.createModal();
    this.setupContactUSModal();
  }

  private setupContactUSModal(): void {
    this.setupContactListeners();
  }

  private createModal(): HTMLDivElement {
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

  private setupContactListeners(): void {
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

  private showModal(): void {
    const overlay = this.modal.querySelector(".modal-overlay") as HTMLElement;
    if (overlay) {
      overlay.style.display = "flex";
    }
  }

  private closeModal(): void {
    const overlay = this.modal.querySelector(".modal-overlay") as HTMLElement;
    if (overlay) {
      overlay.style.display = "none";
    }
  }
}
