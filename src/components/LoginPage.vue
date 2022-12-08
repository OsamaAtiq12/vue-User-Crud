<template>
  <div class="Login">
    <div class="container">
      <div class="row">
        <div class="col-3"></div>
        <div class="col-6 Signup-Container text-center">
          <div class="text-center text-white Signup mb-5 mt-3">
            <h3>Login in</h3>
          </div>

          <div class="input-group mb-5">
            <span class="input-group-text field">Username</span>
            <input
              type="email"
              v-model="username"
              id="email"
              class="form-control"
            />
          </div>

          <div class="input-group mb-5">
            <span class="input-group-text field">Password</span>
            <input
              type="Password"
              v-model="Password"
              id="username"
              class="form-control"
            />
          </div>

          <div class="d-flex justify-content-evenly">
            <button class="btn btn-primary My-btn mb-3" @click="Login">
              Submit
            </button>
          </div>
        </div>
        <div class="col-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Page-1",
  data: () => ({
    username: "",
    Password: "",
  }),
  methods: {
    Login: function () {
      console.log(this.username, this.Password);
      fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: this.username,
          password: this.Password,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          const Login_data = json;
          if (Login_data.message == "Invalid credentials") {
            alert("Wrong credentials");
          } else {
            localStorage.setItem("username", Login_data.username);
            localStorage.setItem("token", Login_data.token);
            localStorage.setItem("image", Login_data.image);
            localStorage.setItem("firstname", Login_data.firstName);
            localStorage.setItem("lastName", Login_data.lastName);
            localStorage.setItem("email", Login_data.email);
            this.$router.push({ path: "/dashboard" });
          }
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Signup-Container {
  margin-top: 100px;
  border: 2px solid black;
  border-radius: 10px;
}
.My-btn {
  background-color: black !important;
  color: white;

  padding-left: 5px;
  padding-right: 5px;
  margin-bottom: 5px;
}
.Signup {
  background-color: black;

  padding-bottom: 2px;
}
.field {
  background-color: black !important;
  color: white !important;
}

body {
  background-color: whitesmoke;
}

.My-btn:hover {
  background-color: white !important;
  color: black;
}

.hidden {
  display: none;
  color: red;
}
</style>
