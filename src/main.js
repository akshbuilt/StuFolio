import "./style.css";
import * as THREE from "three";
const home = document.getElementById("home");
const signup = document.getElementById("signup");
const login = document.getElementById("login")
const dashboard = document.getElementById("dashboard")
const minimal = document.getElementById('minimal')
const creative = document.getElementById("creative")
const templates = document.getElementById("templates")
const infopage = document.getElementById('infopage')
const preview = document.getElementById("preview");
const signupBtn = document.querySelectorAll(".signup");
const loginBtn = document.querySelectorAll(".login");
 let sections = [ signup, login, dashboard, minimal, creative, templates, infopage,preview];
  sections.forEach(element => {
    element.classList.add("hidden");
  });
export function showSection(sectionId) {
let sections = [home, signup, login, dashboard, minimal, creative, templates, infopage, preview];
  sections.forEach(element => {
    element.classList.add("hidden");
  });
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.remove("hidden");
  }
}

signupBtn.forEach(signUpBtn => {
  signUpBtn.addEventListener("click", () => {
    showSection("signup")
  })
});

loginBtn.forEach(logInButton => {
  logInButton.addEventListener("click", () => {
    showSection("login")
  })
})
const tryDemo = document.getElementById("tryDemo");

tryDemo.addEventListener("click", () => {
      localStorage.setItem("demoMode", "true");
    showSection("templates");
});


