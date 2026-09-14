import "./style.css";
import * as THREE from "three";
const home = document.getElementById("home");
const auth = document.getElementById("auth");
const signupBtn = document.querySelector(".signup");
const loginBtn = document.querySelector(".login");

function showSection(section) {
  let sections = [home, auth];
  sections.forEach((element) => {
    element.classList.add("hidden");
  });
  const targetSection = document.getElementById(section);
  targetSection.classList.remove("hidden");
}
showSection("home")

signupBtn.addEventListener("click", () => {
  showSection("auth");
});
