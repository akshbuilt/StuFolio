import { showSection } from "../main.js";
import { createPortfolio, createDemoPortfolio } from "./preview.js";
import { supabase } from "../services/supabase.js"

const username = document.getElementById("infoname");
const infoemail = document.getElementById("infoemail");
const infoprofession = document.getElementById("infoprofession");
const infooneliner = document.getElementById("infooneliner");
const infoabout = document.getElementById("infoabout");
const infobtn = document.getElementById('infobtn')
const infoloader = document.getElementById("infoloader")
const infoform = document.getElementById("infoform");


infoform.addEventListener("submit", async (e) => {
  e.preventDefault();
  const selectedTemplate = localStorage.getItem("selectedTemplate");

try {
  const demoMode = localStorage.getItem("demoMode");
  if (demoMode) {
    const demoPortfolio = {
        name: username.value,
        email: infoemail.value,
        profession: infoprofession.value,
        one_liner: infooneliner.value,
        about: infoabout.value,
        template: selectedTemplate
    };


    localStorage.removeItem("demoMode");

createDemoPortfolio(demoPortfolio);
    return;
}
      infoloader.classList.remove("hidden")
  infobtn.disabled = true;
  infobtn.textContent = "Submitting"
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to create a portfolio.");
}
 const portfolioData = {
    user_id: user.id,
    name: username.value,
    email: infoemail.value,
    profession: infoprofession.value,
    one_liner: infooneliner.value,
    about: infoabout.value,
    template: selectedTemplate
};


const { data, error } = await supabase
    .from("portfolios")
    .insert(portfolioData)
    .select("id")
    .single();

if (error) throw error;

const url = `/p/${data.id}`;
history.pushState({}, "", url);

await createPortfolio(data.id);
    localStorage.removeItem("selectedTemplate");
  }
 catch (error) {
    alert(error.message)
     console.error(error);
}finally{
  infoloader.classList.add("hidden")
  infobtn.disabled = false;
  infobtn.textContent = "Submit"
}

});
