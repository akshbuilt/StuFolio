import { showSection } from "../main.js";
import { createPortfolio } from "./preview.js";
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
console.log("Selected:", selectedTemplate);

try {
      infoloader.classList.remove("hidden")
  infobtn.disabled = true;
  infobtn.textContent = "Submitting"
   const { data, error } = await supabase
  .from("portfolios")
  .insert({
    name: username.value,
    email: infoemail.value,
    profession: infoprofession.value,
    one_liner: infooneliner.value,
    about: infoabout.value,
    template: selectedTemplate
  })
  .select("id")
  .single();

if (error) throw error;

console.log("Inserted row:", data);
const url = new URL(window.location.href);
url.searchParams.set("portfolio", data.id);
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
