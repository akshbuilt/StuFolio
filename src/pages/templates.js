import { showSection } from "../main.js";

const minimalbtn = document.getElementById("minimalbtn");
const creativebtn = document.getElementById("creativebtn");

minimalbtn.addEventListener("click", () => {
    localStorage.setItem("selectedTemplate", "minimal");
    showSection("infopage");
});

creativebtn.addEventListener("click", () => {
    localStorage.setItem("selectedTemplate", "creative");
    showSection("infopage");
});