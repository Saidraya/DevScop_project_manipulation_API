export async function response(){
    try{
    const [users, repos] =  await Promise.all([
        fetch(`https://api.github.com/users/${search_for.value.trim()}`).then(res => { 
            if(!res.ok)
            {
                throw new Error("poste error");
            }
            return res.json()}),
        fetch(`https://api.github.com/users/${search_for.value.trim()}/repos`).then(res => {
            if(!res.ok)
            {
                throw new Error("poste error");
            }
            return res.json()})
    ])
    users.time = new Date();
    return {users, repos};
        }
    catch(error){
        console.error("error:", error)
        return false;
    }
}