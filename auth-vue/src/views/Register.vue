<template>
    <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="error">
                    <strong>Error Message </strong> <br>{{ error}}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
                    </button>
                </div>
    <section class="form">
      <div class="container">
        <div class="form_content">
          <form action="" @submit.prevent="register">
          <div class="title">
            <h1>S'inscrire</h1>
          </div>
          <div class="input">
            <input
              type="email"
              name=""
              id=""
              v-model="user.email"
              placeholder=" Your Email"
            />
          </div>
          <div class="input">
            <input
              type="password"
              name=""
              id=""
              v-model="user.password"
              placeholder="@password"
            />
          </div>
          <div class="input">
            <textarea name="" id="" cols="30" rows="10" v-model="user.knowMore"
              placeholder="Talk about you">

            </textarea>
          </div>
          <div class="input">
            <input
              type="number"
              name=""
              id=""
              v-model="user.age"
              placeholder="Age"
            />
          </div>
          <div class="button">
            <button type="submit">Valider</button>
          </div>
          <div class="register">
            <RouterLink to="/">Se connecter?</RouterLink>
          </div>
        </form>
        </div>
      </div>
    </section>
  </template>
  <script lang="ts" setup>
  import router from "@/router";
  import { clientHttp } from "../libs/clientHttps";
  import { ref } from "vue";
  const error = ref("")
  const user = ref({
    email: "",
    password: "",
    age:"",
    knowMore:""
  });
  const register = async function () {
    if (user.value.email.trim() === "" || user.value.password.trim() === "" || user.value.age === "") {
        error.value="Tous les champs sont requis"
      console.log("Tous les champs sont requis ");
    } else {
      try {
        const userData = await clientHttp.post("/users/register", user.value);
        user.value.email = "";
        user.value.password = "";
        user.value.age = "";
        user.value.knowMore = "";
        router.replace("/");
        console.log(userData);
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  </script>
  <style scoped>
</style>