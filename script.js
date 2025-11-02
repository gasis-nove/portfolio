// Live update fields
const form = document.getElementById("resume-form");

form.addEventListener("input", () => {
  const getVal = id => document.getElementById(id).value || "";

  document.getElementById("preview-name").textContent = getVal("name");
  document.getElementById("preview-title").textContent = getVal("title");
  document.getElementById("preview-email").textContent = getVal("email");
  document.getElementById("preview-phone").textContent = getVal("phone");
  document.getElementById("preview-address").textContent = getVal("address");
  document.getElementById("preview-linkedin").textContent = getVal("linkedin");
  document.getElementById("preview-education").textContent = getVal("education");
  document.getElementById("preview-objective").textContent = getVal("objective");
  document.getElementById("preview-internship").textContent = getVal("internship");
  document.getElementById("preview-projects").textContent = getVal("projects");
  document.getElementById("preview-certifications").textContent = getVal("certifications");
  document.getElementById("preview-activities").textContent = getVal("activities");
  document.getElementById("preview-languages").textContent = getVal("languages");

  const skills = getVal("skills").split(",").filter(s => s.trim());
  const skillsList = document.getElementById("preview-skills");
  skillsList.innerHTML = "";
  skills.forEach(skill => {
    const li = document.createElement("li");
    li.textContent = skill.trim();
    skillsList.appendChild(li);
  });
});

// Profile picture upload
document.getElementById("profile-pic").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => document.getElementById("preview-pic").src = reader.result;
    reader.readAsDataURL(file);
  }
});

// Color customization
const resume = document.getElementById("resume-preview");
document.getElementById("text-color").addEventListener("input", e => {
  resume.style.color = e.target.value;
});
document.getElementById("bg-color").addEventListener("input", e => {
  resume.style.backgroundColor = e.target.value;
});

// AI Summary (simulated)
document.getElementById("generate-ai").addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const skills = document.getElementById("skills").value;
  document.getElementById("preview-objective").textContent =
    `Motivated ${title} skilled in ${skills || "various technologies"}, eager to contribute to innovative projects and continuous learning.`;
});

// PDF Download
document.getElementById("download-pdf").addEventListener("click", () => {
  const element = document.getElementById("resume-preview");
  const opt = {
    margin: 0.3,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
});
