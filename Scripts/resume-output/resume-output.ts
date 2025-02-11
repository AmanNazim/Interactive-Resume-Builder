interface ResumeData {
  theme: string;
  profile: {
    name: string;
    email: string;
    contact: string;
    address: string;
    profileText: string;
    profileImage?: string;
  };
  education: string;
  experience: string;
  skills: string[];
  languages: string[];
}

document.addEventListener("DOMContentLoaded", () => {
  const storedData = localStorage.getItem("resumeData");
  if (!storedData) return (window.location.href = "index.html");

  const data: ResumeData = JSON.parse(storedData);
  const themeNumber =
    new URLSearchParams(window.location.search).get("theme")?.slice(-1) || "1";
  const container = document.getElementById(`resume${themeNumber}-output`);

  if (container) {
    document
      .querySelectorAll(".resume-template")
      .forEach((t) => t.classList.add("hidden"));
    container.classList.remove("hidden");
    populateResumeData(container, data);
  }
});

function populateResumeData(container: HTMLElement, data: ResumeData) {
  // Class-based selectors
  container.querySelector(".profile-name")!.textContent = data.profile.name;
  container.querySelector(".profile-description")!.textContent =
    data.profile.profileText;

  container.querySelector(".em-span")!.textContent = data.profile.email;
  container.querySelector(".con-span")!.textContent = data.profile.contact;
  container.querySelector(".Add-span")!.textContent = data.profile.address;

  // Education & Experience
  container.querySelector(".education-content")!.textContent = data.education;
  container.querySelector(".experience-content")!.textContent = data.experience;

  // List population
  const populateList = (selector: string, items: string[]) => {
    const list = container.querySelector(selector);
    if (list) list.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
  };

  populateList(".skills-list", data.skills);
  populateList(".languages-list", data.languages);

  // Image handling
  const img = container.querySelector("img") as HTMLImageElement;
  if (img) {
    img.src = data.profile.profileImage || "";
    img.onerror = () => (img.style.display = "none");
  }
}
