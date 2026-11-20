   export async function delet_from_mackapi(id){
    const res  = await fetch(`https://6af4a05b55a1de7dcf0452a7.mockapi.io/users/${id}`,{
        method: "DELETE"
    })
    return await res.json();
}
export async function get_users() {
    const response = await fetch("https://6af4a05b55a1de7dcf0452a7.mockapi.io/users")
    const data = await response.json();
    return data;
}
export async function add_user(user) {
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
 export async function update_user(user) {
    const body = { ...user };
    delete body.language;     
     const res = await fetch(`https://6af4a05b55a1de7dcf0452a7.mockapi.io/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    return await res.json();
}