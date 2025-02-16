document.addEventListener("DOMContentLoaded", function () {
    var _a;
    var storedData = localStorage.getItem("resumeData");
    if (!storedData)
        return (window.location.href = "index.html");
    var data = JSON.parse(storedData);
    var themeNumber = ((_a = new URLSearchParams(window.location.search).get("theme")) === null || _a === void 0 ? void 0 : _a.slice(-1)) || "1";
    var container = document.getElementById("resume".concat(themeNumber, "-output"));
    if (container) {
        document
            .querySelectorAll(".resume-template")
            .forEach(function (t) { return t.classList.add("hidden"); });
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
    var populateList = function (selector, items) {
        var list = container.querySelector(selector);
        if (list)
            list.innerHTML = items.map(function (item) { return "<li>".concat(item, "</li>"); }).join("");
    };
    populateList(".skills-list", data.skills);
    populateList(".languages-list", data.languages);
    // Image handling
    var img = container.querySelector("img");
    if (img) {
        img.src = data.profile.profileImage || "";
        img.onerror = function () { return (img.style.display = "none"); };
    }
}
