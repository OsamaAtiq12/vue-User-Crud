<template>
  <div>
    <div class="text-center mb-4 mt-3">
      <div>
        <b-button id="show-btn" @click="showModal">Add User</b-button>

        <b-modal ref="my-modal" hide-footer title="Adding User Data">
          <div class="d-block text-center">
            <h3>Add New User</h3>
          </div>
          <div class="addnew">
            <label for="">id</label>
            <div>
              <input type="text" v-model="id" />
            </div>
            <label for="">FirstName</label>
            <div>
              <input type="text" v-model="fname" />
            </div>
            <label for="">LastName</label>
            <div>
              <input type="text" v-model="lname" />
            </div>
            <label for="">Gender</label>
            <div>
              <input type="text" v-model="gen" />
            </div>
            <label for="">Age</label>
            <div>
              <input type="text" v-model="age" />
            </div>
          </div>
          <b-button
            class="mt-3"
            variant="outline-danger"
            block
            @click="hideModal"
          >
            Add
          </b-button>
        </b-modal>
        <button class="btn btn-danger mx-4" @click="Logout">Logout</button>
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">FirstName</th>
          <th scope="col">LastName</th>
          <th scope="col">age</th>
          <th scope="col">Gender</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, idx) in users" :key="idx">
          <td>{{ user.id }}</td>

          <td>
            {{ user.firstName }}
          </td>

          <td>{{ user.lastName }}</td>
          <td>{{ user.age }}</td>
          <td>{{ user.gender }}</td>
          <td>
            <b-button
              class="btn btn-primary"
              @click="toggleModal2(user, idx)"
              ref="btnToggle"
              >Edit</b-button
            >
            <b-modal id="modal-1" title="Updating User Data">
              <div class="addnew">
                <label for="">FirstName</label>
                <div>
                  <input type="text" v-model="ufname" />
                </div>
                <label for="">LastName</label>
                <div>
                  <input type="text" v-model="ulname" />
                </div>
                <label for="">Gender</label>
                <div>
                  <input type="text" v-model="ugen" />
                </div>
                <label for="">Age</label>
                <div>
                  <input type="text" v-model="uage" />
                </div>
                <b-button @click="hideModal2" class="mt-2">Update</b-button>
              </div>
            </b-modal>
            <button class="btn btn-danger mx-2" @click="del(user.id, idx)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data: () => ({
    id: "",
    fname: "",
    lname: "",
    gen: "",
    age: "",

    index: "",
    uid: "",
    ufname: "",
    ulname: "",
    ugen: "",
    uage: "",
  }),

  computed: {
    users() {
      return this.$store.state.allUsers;
    },
  },
  mounted() {
    this.$store.dispatch("fetchusers");
  },
  methods: {
    del: function (id, index) {
      console.log(index);
      this.$store.dispatch("deleteapi", id);
    },
    Logout: function () {
      localStorage.clear();
      this.$router.push({ path: "/" });
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      console.log();
      this.$store.dispatch("Addapi", {
        id: this.id,
        firstName: this.fname,
        lastName: this.lname,
        gender: this.gen,
        age: this.age,
      });
      this.$refs["my-modal"].hide();
    },
    hideModal2() {
      this.$store.dispatch("editapi", {
        index: this.index,
        id: this.uid,
        firstName: this.ufname,
        lastName: this.ulname,
        gender: this.ugen,
        age: this.uage,
      });
      this.$root.$emit("bv::hide::modal", "modal-1", "#btnShow");
    },
    toggleModal2(data, idx) {
      this.uid = data.id;

      this.index = idx;
      this.$root.$emit("bv::toggle::modal", "modal-1", "#btnToggle");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.addnew {
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
}
</style>
