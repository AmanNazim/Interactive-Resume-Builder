"use strict";
document.addEventListener("DOMContentLoaded", () => {
    var _a;
    const storedData = localStorage.getItem("resumeData");
    if (!storedData)
        return (window.location.href = "index.html");
    const data = JSON.parse(storedData);
    const themeNumber = ((_a = new URLSearchParams(window.location.search).get("theme")) === null || _a === void 0 ? void 0 : _a.slice(-1)) || "1";
    const container = document.getElementById(`resume${themeNumber}-output`);
    if (container) {
        document
            .querySelectorAll(".resume-template")
            .forEach((t) => t.classList.add("hidden"));
        container.classList.remove("hidden");
        populateResumeData(container, data);
    }
});
function populateResumeData(container, data) {
    // Class-based selectors
    container.querySelector(".profile-name").textContent = data.profile.name;
    container.querySelector(".profile-description").textContent =
        data.profile.profileText;
    container.querySelector(".em-span").textContent = data.profile.email;
    container.querySelector(".con-span").textContent = data.profile.contact;
    container.querySelector(".Add-span").textContent = data.profile.address;
    // Education & Experience
    container.querySelector(".education-content").textContent = data.education;
    container.querySelector(".experience-content").textContent = data.experience;
    // List population
    const populateList = (selector, items) => {
        const list = container.querySelector(selector);
        if (list)
            list.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
    };
    populateList(".skills-list", data.skills);
    populateList(".languages-list", data.languages);
    // Image handling
    const img = container.querySelector("img");
    if (img) {
        img.src = data.profile.profileImage || "";
        img.onerror = () => (img.style.display = "none");
    }
}
//# sourceMappingURL=resume-output.js.map