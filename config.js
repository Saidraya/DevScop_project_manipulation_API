export function set_localstorage_users_repos(user, key){
    localStorage.setItem(key, JSON.stringify(user))
}
export function get_localstorage_users_repos(key){
    return JSON.parse(localStorage.getItem(key))
}
