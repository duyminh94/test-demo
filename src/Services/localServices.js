const localServices = {
    user: {
        set: (data) => {
            localStorage.setItem("user", JSON.stringify(data))
        },
        get: () => {
            return JSON.parse(localStorage.getItem("user"))
        },
        remove: () => {
            localStorage.removeItem("user")
        }
    }
}

export default localServices