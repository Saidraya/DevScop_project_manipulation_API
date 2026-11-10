import { input_search,analysez, regex_nom, error_msg, search_for, Rchercher } from "./dom.js";
import { input_value } from "./main.js";
async function response(user){
    try{
        const res = await fetch(`https://api.github.com/users/${user}`)
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
let user_info = null;
function search(){
    search_for.value = input_value;
    Rchercher.addEventListener("click", async function(){
            const result = await response(input_value)
            if(result)
            {
                user_info = result 
            }
            else
            {
                return false;
            }
        })
    }
search();
function add(user_info){
if(!user_info)
{
    console.log("error")
    return
}
if(user_info.bio === null)
{
    user_info.bio = "cyber securiry"
}
const date = new Date(user_info.created_at);
const month = date.toLocaleString("fr-FR", { month: "long" });
const year = date.getFullYear();
const member = `Member depuis ${month} ${year}`;

const cart = document.creatElement("div")
card.className = "w-1/3 border border-slate-700 rounded-xl text-white p-5 bg-slate-900"
cart.innerHTML = `
<div class="flex flex-col items-center gap-2 mb-5">
            <img class="border-2 border-slate-600 rounded-full w-40 h-40 object-cover"
                src="${user_info.avatar_url}" alt="github profil">
            <a href="#" class="text-xl font-semibold hover:text-blue-400 text-blue-500">${user_info.url}</a>
            <p class="domain text-slate-400">${user_info.bio}</p>
        </div>
        <div class="border border-slate-700 bg-slate-800 rounded-lg p-3 space-y-3 mb-5">
            <p>
                <i class="fa-solid fa-map-pin text-red-500 mr-2"></i>
                ${user_info.location}
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
        <a href="#"  class="w-full border rounded-lg p-3 bg-gradient-to-r from-blue-400 via-blue-300 to-pink-400 text-slate-900 font-semibold hover:opacity-90 mb-3">
            <i class="fa-regular fa-star mr-2"></i>
            Ajouter à la shortlist
        </a>

        <div class="text-center border border-slate-700 bg-slate-800 rounded-lg p-3">
            <a href="https://api.github.com/users/octocat" class="hover:text-blue-400 text-cyan-400">
                Voir le profil original
                <i class="fa-solid fa-arrow-up-right-from-square ml-2"></i>
            </a>
        </div>`
        all.append(cart);
}