import { input_search,analysez, regex_nom, error_msg, search_for, Rchercher, all, all_repos, aucun, langs, recherch } from "./dom.js";
const input_value = sessionStorage.getItem("username") || "";
import {set_localstorage_users_repos, get_localstorage_users_repos} from "./config.js";
import { response } from "./cache.js";
search_for.value = input_value;


async function add_to_local(data)
{
    set_localstorage_users_repos(data, data.users.login);
}

function check(login){
    const time_out = get_localstorage_users_repos(login)
    if (!time_out) {
        return;
    }
    const savetime = new Date(time_out.users.time).getTime();
    const now = new Date();
     
    if(now - savetime > 10 * 60 * 1000)
    {
        localStorage.removeItem(login)
    }
}
function check_every_user_timeout(){
    for(let i = localStorage.length - 1; i >= 0; i--)
    {
        const key = localStorage.key(i);
        check(key)
    }
}
 let repo = null;
function add(user_info){
    all.classList.add("hidden")
     if(!user_info){
        all.classList.add("hidden")
        aucun.classList.remove("hidden")
        depos.classList.add("hidden")
        return
    }
const bio = user_info.bio ?? "aucun bio"
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
            user_info.sitiation = "Nouveau"
            user_info.note = "aucun note"
            user_info.stars = 5;
            user_info.note = "aucun note"
            user_info.add_date = new Date().toLocaleDateString("fr-FR");
            sessionStorage.setItem("user", JSON.stringify(user_info));

        }
        
}
async function initiale(){
   check_every_user_timeout()
const info = get_localstorage_users_repos(search_for.value.trim());

if (input_value) {

    let data = null;
    
    if(info){

        data = info
    }
    else{
        data = await response();
        if(data)
        add_to_local(data);
    }
if(!data)
{
    add(false);
    return
}
    const user = data.users
    add(user)
    

}
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
manipilation_color(langs)

const depos = document.createElement("div");
const grid = document.createElement("div");
initiale()
grid.className = "grid grid-cols-2 md:grid-cols-2 gap-5 w-full";

all_repos.append(depos, grid);
function add_repos(data)
{
    if(!data.language)
    {
        data.language = "aucun"
    }
const now = new Date()
const date = new Date(data.updated_at)
const days = now - date;
const last_update = Math.floor(days /(1000 * 60 * 60 * 24))
let member = `mis á jour il y a ${last_update} jours`;
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
    let data = null;
    check(search_for.value.trim());
    if(get_localstorage_users_repos(search_for.value.trim())){
        data = get_localstorage_users_repos(search_for.value.trim())
    }
    else{
        data = await response();
        if(data)
            add_to_local(data)
    }
    if(!data)
    {
        add(false)
        return
    }
    repo = data
            const result = data.users;
            const result_repos  = data.repos
            if (Array.isArray(result_repos)) {
                depos.innerHTML = `<h1 class="text-3xl font-bold text-blue-500 mb-5">DEPOTS <span class="text-white">${result_repos.length}</span></h1>`;
                const length = result_repos.length;
                for (const repo of result_repos){
                    add_repos(repo);
                }
            }
            add(result)
        })
     
         
    if(get_localstorage_users_repos(search_for.value.trim())){
        repo = get_localstorage_users_repos(search_for.value.trim())
    }
    else{
         repo  = await response()
    }
        let choice = "Tous";
        function afich_felter_search(){
            grid.innerHTML = "";
            if (repo && Array.isArray(repo.repos)) {
            for(const r of repo.repos){
            if((choice === "Tous" || r.language?.toLowerCase() === choice.toLowerCase())  && r.name.toLowerCase().trim(). includes(recherch.value.toLowerCase().trim())){
                add_repos(r);
            }
        }
    }
    else{
        console.log("request api faild")
    }
    }
    recherch.addEventListener("input" , afich_felter_search)
    langs.forEach((e) =>{
        e.addEventListener("click", () => {
            choice = e.textContent.trim();
            afich_felter_search()
        })
    })
        async function need_data_to_print_repos()
        {
            if (search_for.value){
           
            let data = null;
            if(get_localstorage_users_repos(search_for.value.trim())){
                data = get_localstorage_users_repos(search_for.value.trim())
            }
            else{
                data = await response();
            }
            if(!data)
            {
                depos.innerHTML = "Impossible de charger les dépôts";
                return
            }
            const user =  data.repos
        
    if (Array.isArray(user)) {
                depos.innerHTML = `<h1 class="text-3xl font-bold text-blue-500 mb-5">DEPOTS <span class="text-white">${user.length}</span></h1>`;
                for (const repo of user) {
                    add_repos(repo);
                }
            }
}}
need_data_to_print_repos()