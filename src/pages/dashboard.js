import { supabase } from "../services/supabase.js";

import { showSection } from "../main.js";

const {data : {session}} = await supabase.auth.getSession()
if (session) {
    showSection("dashboard")
} else {
    showSection("home")
}

const logoutbtn = document.getElementById("logout")
const logoutloader = document.getElementById("logoutloader")

async function logout() {
    const{error} = await supabase.auth.signOut()

    if (error) {
        alert(error.message)
        return
    }
showSection("home")
}

logoutbtn.addEventListener("click", () => {
    logoutloader.classList.remove("hidden")
    logoutbtn.disabled = true
    try {
        logout()
    } 
    finally{
logoutloader.classList.add("hidden")
logoutbtn.disabled = false
    }
})

const username = document.getElementById('username')
const dashmainname = document.getElementById('dashmainname')


async function dynamicName() {
    const{data : {session}} = await supabase.auth.getSession()
    const name = session.user.user_metadata.name;
    username.textContent = name;
    dashmainname.textContent = name;
}
dynamicName()

const dashCreateFirst = document.getElementById("dashcreate1")
const dashCreateSecond = document.getElementById("dashcreate2")

dashCreateFirst.addEventListener("click", () => {
    showSection("templates")
})
dashCreateSecond.addEventListener("click", () => {
    showSection("templates")
})
