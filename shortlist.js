import { all_list, search, btns, modal_delete,cancel_delete, confirm_delete, msg_dlt, all} from "./dom.js";
import {modal,candidateName,candidateForm,status,rating,note,cancelBtn,saveBtn, count} from "./dom.js";
import {delet_from_mackapi , get_users , add_user, update_user } from "./api.js"


export async function response(link_url){
    try{
        const res = await fetch(link_url)
         if(!res.ok)
        {  
            return false;
        }
        const data = await res.json();      
        return data;
    }
    catch(error){
        console.error("error:", error)
        return false;
    }
}

let cart = JSON.parse(sessionStorage.getItem("user") || "null");

let data = await get_users()
function remove_user(user, cart, delet) {
  msg_dlt.textContent = "Voulez-vous supprimer cett match  ?";
  modal_delete.removeAttribute("hidden");
  cancel_delete.onclick = function(){
    modal_delete.setAttribute("hidden", "");
     delet.removeAttribute("disabled", "" )
     console.log(delet)
        delet.classList.remove("disabled:opacity-50", "disabled:cursor-not-allowed")

     return;
  };
  confirm_delete.onclick =  async function(){
    modal_delete.setAttribute("hidden", "");
    await delet_from_mackapi(user.id)
    cart.remove();
    show_message(" user removed successfully");
   }
  }
  function show_message(message, error = false) {
    const success = document.querySelector("#msg-success");
    const p = success.querySelector("p");

    p.textContent = message;
    p.classList.remove("bg-green-500", "bg-red-500");
    p.classList.add(error ? "bg-red-500" : "bg-green-500");

    success.removeAttribute("hidden");
    setTimeout(function () {
        success.setAttribute("hidden", "");
    }, 1500);
}

function manipilation_color(classe) {
classe.forEach(function(btn){

    btn.addEventListener("click",function(){
        classe.forEach(function(btn){
          btn.classList.add("bg-slate-700");
    btn.classList.remove("bg-green-500")
        })
        btn.classList.remove("bg-slate-700");
        btn.classList.add("bg-green-500")
    })
})
}
manipilation_color(btns)
function cancel(clas, modal){
  clas.forEach((e) =>{
   e.onclick =  function(){
    modal.classList.toggle("hidden")}
 })
}

 cancel(cancelBtn,modal)

 

function afficher_nombre() {
    count.textContent = `${data.length} candidat(s) dans votre shortlist`;
}
 function add_tolist(user, lang)
{
all_list
const card = document.createElement("div");
card.innerHTML = `
 <div class="flex flex-wrap items-center justify-between gap-4 w-full rounded-2xl border border-slate-700 bg-[#0b1224] p-5 font-mono text-white">
        <div class="flex items-center gap-4">
            <img class="h-16 w-16 shrink-0 rounded-full object-cover p-0.5 bg-gradient-to-br from-pink-500 via-blue-400 to-cyan-400"
                 src="${user.avatar_url}" alt="${user.login}">
            <div class="space-y-1">
                <h2 class="text-xl font-bold">${user.name}</h2>
                <p class="flex items-center gap-2 text-sm uppercase text-slate-400">
                    @${user.login}
                    <span class="rounded-md border border-cyan-500/60 bg-cyan-500/10 px-2 py-0.5 text-xs normal-case text-cyan-300">${lang}</span>
                </p>
                <p class="italic text-cyan-300">${user.note}</p>
                <p class="text-sm text-slate-400">Ajouté le ${user.add_date}</p>
            </div>
        </div>
        <div class="flex flex-wrap items-center gap-3">
            <div class="flex gap-1 text-lime-300 text-2xl">
               ${"★".repeat(user.stars)}
            </div>
            <span class="flex items-center gap-2 rounded-lg border border-red-400 px-3 py-1.5 text-xs font-bold uppercase text-red-300">
                <span class="h-2 w-2 rounded-full bg-red-400"></span>
                ${user.sitiation}
            </span>
            <button class="flex items-center gap-2 rounded-lg border border-cyan-500/60 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300 cursor-pointer hover:bg-cyan-500/20 edit_btn">
                <i class="fa-solid fa-pen"></i> Modifier
            </button>
            <button class="flex items-center gap-2 rounded-lg border border-red-500/60 bg-red-500/10 px-4 py-2 delet text-sm font-semibold text-red-400 cursor-pointer hover:bg-red-500/20 delet_btn">
                <i class="fa-solid fa-xmark"></i> Supprimer
            </button>
        </div>
    </div>`
    const edit = card.querySelector(".edit_btn")
    edit.addEventListener("click", () => {
        cancelBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        edit.removeAttribute("disabled");
        edit.classList.remove(
            "disabled:opacity-50",
            "disabled:cursor-not-allowed"
        );
    });
});
         edit.setAttribute("disabled", "" )
        edit.classList.add("disabled:opacity-50", "disabled:cursor-not-allowed")
        modal.classList.remove("hidden")
        candidateName.textContent = user.login;
        status.value = user.sitiation;
        rating.value = user.stars;
        note.value = user.note ?? "";
        saveBtn.onclick = async (e) => {
    e.preventDefault();  

    user.sitiation = status.value;
    user.stars = Number(rating.value);
    user.note = note.value;

    await update_user(user);
    edit.removeAttribute("disabled", "" )
        edit.classList.remove("disabled:opacity-50", "disabled:cursor-not-allowed")
    modal.classList.add("hidden");
    afficher_tout();
}
    });
    all_list.append(card);
    const delet = card.querySelector(".delet_btn")
    delet.addEventListener("click", ()=>{
        console.log(delet)
        delet.setAttribute("disabled", "" )
        delet.classList.add("disabled:opacity-50", "disabled:cursor-not-allowed")
        remove_user(user, card, delet);

    })
}
let choice = "Tous"; 
function afficher_tout() {
    all_list.innerHTML = "";

    for (const d of data) {
        if ((choice === "Tous" || d.sitiation === choice) && d.login.toLowerCase().includes(search.value.trim().toLowerCase())) {
            add_tolist(d, d.language);
        }
    }
}
search.addEventListener("input", afficher_tout);
btns.forEach(function (b) {
    b.addEventListener("click", function () {
        choice = b.textContent.trim();
        afficher_tout();
    });
});


    async function creat()
    {
         data = await get_users()
            if(cart && !data.some(user => user.login === cart.login))
                {
                    await add_user(cart);
                }
                sessionStorage.removeItem("user");
                data = await get_users()
let lang = ""
        for (const user of data) {
            const repos = await response(`https://api.github.com/users/${user.login}/repos`);
              const repo = Array.isArray(repos)? repos.find(repo => repo.language !== null): undefined;
              user.language = repo?.language || "Unknown";
            

    }
    afficher_tout();
    afficher_nombre()
    }
    creat()