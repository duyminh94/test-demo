import fetcher from "./fetcher";

const userAPI = {
  getUsers: (keyword) => {
    return fetcher.get("/Users/getUser", {
      params: {
        keyword,
      },
    });
  },
  getdeleteUser: (userId) => {
    return fetcher.delete("/Users/deleteUser", {
        params: {
            id: userId
        }
    })
  },

  getUpdateUser: (values) => {
    return fetcher.put("/Users/editUser", values)
  }
};

export default userAPI;