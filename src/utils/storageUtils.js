import store from 'store'
const USER_KEY =  'user_key'
const storegeUtils = {
    saveUser(user){
        store.set(USER_KEY, user)
    },
    getUser(USER_KEY){
        return store.get(USER_KEY) || {}
    },
    removeUser(){
        store.remove()
    }
}
export default storegeUtils