import { supabase } from "../services/supabase.js";
import { showSection } from "../main.js";
import { createPortfolio } from "./preview.js";

const { data: { session } } = await supabase.auth.getSession();

const params = new URLSearchParams(window.location.search);

const portfolioId =
    params.get("portfolio") ||
    (window.location.pathname.startsWith("/p/")
        ? window.location.pathname.split("/")[2]
        : null);

// ==============================
// PORTFOLIO LINK
// ==============================

if (portfolioId) {

    try {
        await createPortfolio(Number(portfolioId));
    } catch (error) {
        console.error("Portfolio loading error:", error);
        alert("Portfolio could not be loaded.");
        showSection("home");
    }

}


else if (session) {

    showSection("dashboard");

}

else {

    showSection("home");

}

const logoutbtn = document.getElementById("logout");
const logoutloader = document.getElementById("logoutloader");

async function logout() {

    const { error } = await supabase.auth.signOut();

    if (error) {
        alert(error.message);
        return;
    }

    showSection("home");
}

logoutbtn.addEventListener("click", async () => {

    logoutloader.classList.remove("hidden");
    logoutbtn.disabled = true;

    try {
        await logout();
    }

    finally {
        logoutloader.classList.add("hidden");
        logoutbtn.disabled = false;
    }

});


const username = document.getElementById("username");
const dashmainname = document.getElementById("dashmainname");

async function dynamicName() {

    const { data: { session } } =
        await supabase.auth.getSession();

    if (!session) return;

    const name = session.user.user_metadata.name;

    username.textContent = name;
    dashmainname.textContent = name;
    dashmainname.className = "text-[#7c3aed]";
}

dynamicName();


const portfolioList =
    document.getElementById("portfolioList");

async function loadPortfolios() {

    const { data: { session } } =
        await supabase.auth.getSession();

    if (!session) return;

    const { data: portfolios, error } =
        await supabase
            .from("portfolios")
            .select(
                "id, name, profession, template, created_at"
            )
            .eq("user_id", session.user.id)
            .order("created_at", {
                ascending: false
            });

    if (error) {
        console.error(
            "Portfolio fetch error:",
            error
        );
        return;
    }

    if (portfolios.length === 0) {

        portfolioList.className =
            "w-full rounded-2xl border-2 border-dashed border-white/10 bg-white/2 p-12 text-center transition-all hover:border-[#A78BFA]";

        portfolioList.innerHTML = `

            <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-500/10 text-purple-400">

                <svg
                    class="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >

                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />

                </svg>

            </div>

            <h3 class="text-xl font-semibold text-white">
                No portfolios yet
            </h3>

            <p class="mt-1 text-sm text-gray-400">
                Create your first student portfolio to show off your work.
            </p>

            <a
                href="#template"
                id="dashcreate2"
                class="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#7c3aed] px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-purple-500/25 transition-all hover:bg-purple-500 active:scale-95"
            >
                <span>+</span>
                Create Portfolio
            </a>
        `;

        document
            .getElementById("dashcreate2")
            .addEventListener("click", () => {
                showSection("templates");
            });

        return;
    }
    portfolioList.className =
        "w-auto flex flex-wrap gap-10 rounded-2xl border border-white/10 bg-white/5 p-6";

    portfolioList.innerHTML = "";


    portfolios.forEach((portfolio) => {

       const url = `/p/${portfolio.id}`;


        const card =
            document.createElement("div");

        card.className =
            "flex flex-col w-106 h-auto border border-gray-700 rounded-lg md:items-center md:justify-between gap-4 py-4";


        card.innerHTML = `

            <div>

                <h3 class=" text-lg md:text-xl font-semibold text-white">
                    ${portfolio.name}
                </h3>

                <p class="text-gray-400">
                    ${portfolio.profession}
                </p>

                <p class="text-sm text-gray-500 mt-1">
                    ${portfolio.template} template
                </p>

            </div>

            <a
                href="${url}"
                class="rounded-xl bg-[#7c3aed] px-3 py-1.5 md:px-5 mx-2 md:py-2.5 text-white text-center hover:bg-purple-500 transition"
            >
                Open Portfolio
            </a>
            <hr>

        `;

        portfolioList.appendChild(card);

    });

}


// Only load dashboard portfolios when actually on dashboard
if (!portfolioId && session) {
    loadPortfolios();
}


// ==============================
// CREATE PORTFOLIO BUTTONS
// ==============================

const dashCreateFirst =
    document.getElementById("dashcreate1");

if (dashCreateFirst) {

    dashCreateFirst.addEventListener(
        "click",
        () => {
            showSection("templates");
        }
    );

}


const dashCreateSecond =
    document.getElementById("dashcreate2");

if (dashCreateSecond) {

    dashCreateSecond.addEventListener(
        "click",
        () => {
            showSection("templates");
        }
    );

}