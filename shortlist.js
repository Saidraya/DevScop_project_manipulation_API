import { all_list, search, btns, modal_delete,cancel_delete, confirm_delete, msg_dlt, all} from "./dom.js";
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
async function delet_from_mackapi(id){
    const res  = await fetch(`https://6af4a05b55a1de7dcf0452a7.mockapi.io/users/${id}`,{
        method: "DELETE"
    })
    return await res.json();
}
let cart = JSON.parse(sessionStorage.getItem("user") || "null");
async function get_users() {
    const response = await fetch("https://6af4a05b55a1de7dcf0452a7.mockapi.io/users")
    const data = await response.json();
    return data
}
async function add_user(user) {
    const response = await fetch("https://6af4a05b55a1de7dcf0452a7.mockapi.io/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
    const data = await response.json();
    console.log(data);
}
let data = await get_users()
function remove_user(user, cart) {
  msg_dlt.textContent = "Voulez-vous supprimer cett match  ?";
  modal_delete.removeAttribute("hidden");
  cancel_delete.onclick = function(){
  modal_delete.setAttribute("hidden", "");
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
                <p class="text-sm text-slate-400">Ajouté le ${user.date}</p>
            </div>
        </div>
        <div class="flex flex-wrap items-center gap-3">
            <div class="flex gap-1 text-lime-400">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </div>
            <span class="flex items-center gap-2 rounded-lg border border-red-400 px-3 py-1.5 text-xs font-bold uppercase text-red-300">
                <span class="h-2 w-2 rounded-full bg-red-400"></span>
                Refusé
            </span>
            <button class="flex items-center gap-2 rounded-lg border border-cyan-500/60 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300 cursor-pointer hover:bg-cyan-500/20 edit_btn">
                <i class="fa-solid fa-pen"></i> Modifier
            </button>
            <button class="flex items-center gap-2 rounded-lg border border-red-500/60 bg-red-500/10 px-4 py-2 delet text-sm font-semibold text-red-400 cursor-pointer hover:bg-red-500/20 delet_btn">
                <i class="fa-solid fa-xmark"></i> Supprimer
            </button>
        </div>
    </div>`
    all_list.append(card);
    const delet = card.querySelector(".delet_btn")
    delet.addEventListener("click", ()=>{
        remove_user(user, card);

    })
}

    async function creat()
    {
        let data = await get_users()
            if(cart && !data.some(user => user.login === cart.login))
                {
                    await add_user(cart);
                }
                data = await get_users()
let lang = ""
        for (const user of data) {
            const repos = await response(`https://api.github.com/users/${user.login}/repos`);
              const repo = Array.isArray(repos)? repos.find(repo => repo.language !== null): undefined;
              user.language = repo?.language || "Unknown";
            add_tolist(user, user.language);

search.addEventListener("input", function(){
    all_list.innerHTML = "";
                for(const d of data)
                {
                if(d.login.toLowerCase().includes(search.value.trim().toLowerCase()))
                {
                    add_tolist(d, d.language);
                }
            }
            })
    }
    }
    creat()