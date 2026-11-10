import { input_search,analysez, regex_nom, error_msg } from "./dom.js";
export let input_value;
analysez.addEventListener("click", async function(){
        if(regex_nom.test(input_search.value.trim()))
        {
            error_msg.classlist.add("hidden")
            input_value = input_search.value.trim()

        }
        else
        {
            error_msg.textContent = "this name not exist...";
            error_msg.classlist.remove("hidden")
            error_msg.classlist.add("bg-red-500")
            
        }
    })