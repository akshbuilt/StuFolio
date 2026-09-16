import { supabase } from "../services/supabase.js";

let signName = document.getElementById("name");
const signEmail = document.getElementById("email");
const signpassword = document.getElementById("password");
const signBtn = document.getElementById("signbtn");
const signupform = document.getElementById("signupform");
const signuploader = document.getElementById("signupLoader");
// signup
async function signup(name, signupemail, signuppassword) {
  const { data, error } = await supabase.auth.signUp({
    email: signupemail,
    password: signuppassword,
    options: {
      data: {
        name: name,
      },
    },
  });

  if (error) {
    alert(error.message);
    return;
  }

  return { data, error };
}

signupform.addEventListener("submit", async (e) => {
  e.preventDefault();
  signuploader.classList.remove("hidden");
  signBtn.textContent = "Submitting";
  signBtn.disabled = true;

  try {
    const { data, error } = await signup(
      signName.value,
      signEmail.value,
      signpassword.value,
    );

  if (!error) {
    alert("Account created! Please check your email to confirm your account.");
  }
  } finally {
    signuploader.classList.add("hidden");
    signBtn.disabled = false;
    signBtn.textContent = "Submit";
  }
});

// login
const loginemail = document.getElementById("loginemail");
const loginpassword = document.getElementById("loginpassword");
const loginform = document.getElementById("loginform");
const loginbtn = document.getElementById("loginbtn");
const loginloader = document.getElementById("loginloader");

async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    alert(error.message);
    return;
  }
  return { data, error };
}

loginform.addEventListener("submit", async (e) => {
  e.preventDefault();
  loginloader.classList.remove("hidden");
  loginbtn.disabled = true;
  loginbtn.textContent = "Submitting";
  try {
    const { data, error } = await login(loginemail.value, loginpassword.value);
  } finally {
    loginloader.classList.add("hidden");
    loginbtn.disabled = false;
    loginbtn.textContent = "Submit";
  }
});
