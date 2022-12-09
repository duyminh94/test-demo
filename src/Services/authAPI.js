import fetcher from "./fetcher"

const authAPI = {
    login : (values) => {
        return fetcher.post("/Users/signin", values)
    },

    regsiter: (values) => {
        return fetcher.post("/Users/signup", {
            ...values
        })
    },

    getUsers: () => {
        return fetcher.get("/Users/getUser")
    }
}

export default authAPI