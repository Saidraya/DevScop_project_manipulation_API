import { input_search,analysez, regex_nom, error_msg } from "./dom.js";

analysez.addEventListener("click", function(){
    const input_value = input_search.value.trim();
        if(regex_nom.test(input_value))
        {
          error_msg.classList.add("hidden");
            sessionStorage.setItem("username", input_value);
             window.location.href = "./recherche.html";

        }
        else
        {
            error_msg.textContent = "this name not exist...";
            error_msg.classList.remove("hidden")
            error_msg.classList.add("bg-red-500")
            
        }
    })
    
    