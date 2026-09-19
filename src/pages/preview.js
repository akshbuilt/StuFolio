import { supabase } from "../services/supabase.js";
import { showSection } from "../main.js";
const minimal = document.getElementById("minimal");
const creative = document.getElementById("creative");

export async function createPortfolio(id) {

  const { data: portfolio, error } = await supabase
    .from("portfolios")
    .select("name, email, profession, one_liner, about, template")
    .eq("id", id)
    .single();

  if (error) throw error;

  console.log("Portfolio from DB:", portfolio);

  if (portfolio.template === "minimal") {

    minimal.querySelector("nav div").textContent =
      portfolio.name;

    minimal.querySelector("nav a").href =
      `mailto:${portfolio.email}`;

    minimal.querySelector("header h1").textContent =
      portfolio.name;

    minimal.querySelector("header > p:first-child").textContent =
      portfolio.profession;

    minimal.querySelector("header > p:nth-of-type(2)").textContent =
      portfolio.one_liner;

    minimal.querySelector(".max-w-3xl > p").textContent =
      portfolio.about;
      minimal.querySelector(".msgmeminimal").href = `mailto:${portfolio.email}`
            minimal.querySelector(".msgmeminimal2").href = `mailto:${portfolio.email}`
      showSection("minimal");
        console.log("Minimal portfolio rendered ✅");
  }

  if (portfolio.template === "creative") {

    creative.querySelector("nav div").textContent =
      portfolio.name;

    creative.querySelector("nav a").href =
      `mailto:${portfolio.email}`;

    const hero = creative.querySelector("header");

    hero.querySelector("h1").innerHTML =
      portfolio.name.replace(" ", "<br>") + ".";

    hero.querySelector("p:nth-of-type(2)").textContent =
      portfolio.profession;

    hero.querySelector("p:nth-of-type(3)").textContent =
      portfolio.one_liner;

    creative.querySelector(".max-w-4xl > p").textContent =
      portfolio.about;
      showSection("creative")
  }
}