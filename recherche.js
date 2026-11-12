import { input_search,analysez, regex_nom, error_msg, search_for, Rchercher, all, all_repos, aucun } from "./dom.js";
const input_value = sessionStorage.getItem("username") || "";
export async function response(link_url){
    try{
        const res = await fetch(link_url)
         if(!res.ok)
        {  
            return false
        }
        const data = await res.json();      
        return data;
    }
    catch(error){
        console.error("error:", error)
        return false
    }
}
function add(user_info){
    all.classList.add("hidden")
     if(!user_info){
        all.classList.add("hidden")
        aucun.classList.remove("hidden")
        depos.classList.add("hidden")

        return
    }
const bio = user_info.bio ?? "cyber security"
const location = user_info.location ?? "Non renseigné"
const date = new Date(user_info.created_at);
const month = date.toLocaleString("fr-FR", { month: "long" });
const year = date.getFullYear();
const member = `Member depuis ${month} ${year}`;
all.innerHTML = `
<div class="flex flex-col items-center gap-2 mb-5">
            <img class="border-2 border-slate-600 rounded-full w-40 h-40 object-cover"
                src="${user_info.avatar_url}" alt="github profil">
            <a href="${user_info.html_url}" class="text-xl font-semibold hover:text-blue-400 text-blue-500">@${user_info.login}</a>
            <p class="domain text-slate-400">${bio}</p>
        </div>
        <div class="border border-slate-700 bg-slate-800 rounded-lg p-3 space-y-3 mb-5">
            <p>
                <i class="fa-solid fa-map-pin text-red-500 mr-2"></i>
                ${location}
            </p>
            <p>
                <i class="fa-solid fa-calendar text-blue-400 mr-2"></i> ${member}
            </p>
        </div>
        <div class="grid grid-cols-3 gap-2 text-center mb-5">
            <div class="border border-slate-700 rounded-lg p-2">
                <h1 class="text-xl font-bold text-blue-400 ">${user_info.public_repos}</h1>
                <p class="text-xs text-slate-400">DEPOTS</p>
            </div>
            <div class="border border-slate-700 rounded-lg p-2">
                <h1 class="text-xl font-bold text-pink-400">${user_info.followers}</h1>
                <p class="text-xs text-slate-400">ABONNES</p>
            </div>
            <div class="border border-slate-700 rounded-lg p-2">
                <h1 class="text-xl font-bold text-indigo-300">${user_info.following}</h1>
                <p class="text-xs text-slate-400">ABONNEMENTS</p>
            </div>
        </div>   
        <a href="#"  class="block btn_ajout text-center w-full border rounded-lg p-3 bg-gradient-to-r from-blue-400 via-blue-300 to-pink-400 text-slate-900 font-semibold hover:opacity-90 mb-3">
            <i class="fa-regular fa-star mr-2"></i>
            Ajouter à la shortlist
        </a>

        <div class="text-center border border-slate-700 bg-slate-800 rounded-lg p-3">
            <a href="${user_info.html_url}" class="hover:text-blue-400 text-cyan-400">
                Voir le profil original
                <i class="fa-solid fa-arrow-up-right-from-square ml-2"></i>
            </a>
        </div>`
        all.classList.remove("hidden");
        const ajout = all.querySelector(".btn_ajout")
        ajout.onclick = function(){
            sessionStorage.setItem("user", JSON.stringify(user_info));

        }
}
search_for.value = input_value;

if (input_value) {

    const user = await response(`https://api.github.com/users/${input_value}`)
    add(user)
}
const depos = document.createElement("div");
const grid = document.createElement("div");

grid.className = "grid grid-cols-2 md:grid-cols-2 gap-5 w-full";

all_repos.append(depos, grid);
function add_repos(data)
{
    

const now = new Date()
const date = new Date(data.updated_at)
const days = now - date;
const last_update = Math.floor(days /(1000 * 60 * 60 * 24))

let member = `mis á jour il y a${last_update} jours`;
if (last_update === 0) {
    member = "Mis à jour aujourd'hui";
}
    const card = document.createElement("div");
    const description = data.description ?? "aucun description";
    
     card.className = "flex-1 min-w-0 text-white";
    card.innerHTML = ` 
    <div class="">
        <div class="border border-slate-700 rounded-lg p-5 space-y-4 w-full hover:border-blue-500">
            <h1 class="text-2xl">
                <i class="fa-brands fa-github"></i>${data.name} 
            </h1>
            <p class="text-slate-400">${description} </p>
            <div class="flex items-center gap-4">
                <span class="flex items-center gap-2">
                    <span class="inline-block w-2 h-2 rounded-full bg-orange-500"></span>${data.language} 
                </span>
                <span>
                    <i class="fa-solid fa-star text-yellow-500"></i>${data.stargazers_count} 
                </span>
                <span>
                    <i class="fa-solid fa-code-fork"></i>${data.forks_count}
                </span>
            </div>
            <p class="text-slate-400 text-sm">
                ${member}
            </p>
        </div>
    </div>` 
    grid.append(card)    
}Rchercher.addEventListener("click", async function(){
    grid.innerHTML = "";
            const result = await response(`https://api.github.com/users/${search_for.value.trim()}`)
            const result_repos  = await response(`https://api.github.com/users/${search_for.value.trim()}/repos`)
            
            if (Array.isArray(result_repos)) {
                depos.innerHTML = `<h1 class="text-3xl font-bold text-blue-500 mb-5">DEPOTS <span class="text-white">${result_repos.length}</span></h1>`;
                const length = result_repos.length
                for (const repo of result_repos){
                    add_repos(repo, length);
                    
                }
            }
            add(result)
        })
        if (input_value){
 const user = await response(`https://api.github.com/users/${input_value}/repos`);
    if (Array.isArray(user)) {
                depos.innerHTML = `<h1 class="text-3xl font-bold text-blue-500 mb-5">DEPOTS <span class="text-white">${user.length}</span></h1>`;
                for (const repo of user) {
                    add_repos(repo);
                }
            }
}

