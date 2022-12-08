import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    allUsers: [],
  },
  mutations: {
    setusers(state, user) {
      state.allUsers = user;
    },
    deleteuser(state, id) {
      let Access_Token = localStorage.getItem("token");
      fetch(`https://dummyjson.com/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Access_Token} `,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      this.state.allUsers = this.state.allUsers.filter(function (obj) {
        return obj.id !== id;
      });
    },
    adduser(state, obj) {
      this.state.allUsers.unshift(obj);

      fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: obj.firstName,
          lastName: obj.lastName,
          age: obj.age,
          /* other user data */
        }),
      })
        .then((res) => res.json())
        .then(console.log);
    },
  },
  actions: {
    fetchusers({ commit }) {
      var Access_Token = localStorage.getItem("token");
      fetch("https://dummyjson.com/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Access_Token} `,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          commit("setusers", data.users);
        });
    },

    deleteapi(context, cat) {
      console.log(cat);
      context.commit("deleteuser", cat);
    },
    Addapi(context, obj) {
      console.log(obj);
      context.commit("adduser", obj);
    },
    editapi(context, data) {
      console.log("in store", data);
      this.state.allUsers[data.index].firstName = data.firstName;
      this.state.allUsers[data.index].lastName = data.lastName;
      this.state.allUsers[data.index].age = data.age;
      this.state.allUsers[data.index].gender = data.gender;
      fetch("https://dummyjson.com/users/1", {
        method: "PUT" /* or PATCH */,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lastName: data.lastName,
        }),
      })
        .then((res) => res.json())
        .then(console.log);
    },
  },
  getters: {
    getallusers: (state) => state.allUsers,
  },
});
