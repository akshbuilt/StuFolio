import "./style.css";
import * as THREE from "three";
const home = document.getElementById("home");
const signup = document.getElementById("signup");
const login = document.getElementById("login")
const dashboard = document.getElementById("dashboard")
const signupBtn = document.querySelectorAll(".signup");
const loginBtn = document.querySelectorAll(".login");
 let sections = [ signup, login, dashboard];
  sections.forEach(element => {
    element.classList.add("hidden");
  });
export function showSection(sectionId) {
let sections = [home, signup, login, dashboard];
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


