<template>
<div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="error">
                    <strong>Error Message </strong> <br>{{ error}}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
                    </button>
                </div>
<form action="" @submit.prevent="login" >
<br>
<br>

<div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card-group mb-0">
          <div class="card p-4">
            <div class="card-body">
              <h1>Login</h1>
              <p class="text-muted">Sign In to your account</p>
              <form action="" @submit.prevent="login">

              <div class="input-group mb-3">
                <span class="input-group-addon"><i class="fa fa-user"></i></span>
                <input type="text" class="form-control" placeholder="Username" v-model="userData.email"  >
              </div>
              <div class="input-group mb-4">
                <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                <input type="password" class="form-control" placeholder="Password" v-model="userData.password">
              </div>
             
                <div class="col-6">
                  <button type="submit" class="btn btn-primary px-4">Login</button>
                </div>
              </form>
              <div class="row">
                <div class="col-6 text-right">
                  <button type="button" class="btn btn-link px-0">Forgot password?</button>
                </div>
              </div>
            </div>
          </div>
          <div class="card text-white bg-primary py-5 d-md-down-none" style="width:44%">
            <div class="card-body text-center">
              <div>
                <h2>Sign up</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
             <RouterLink to="/register"><button type="button" class="btn btn-primary active mt-3">Register Now!</button></RouterLink>  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </form>
</template>

<script lang="ts" setup>
import {RouterLink  } from "vue-router";
import router from "@/router";
import { clientHttp } from "../libs/clientHttps";
import { ref } from "vue";
import Cookies from "js-cookie";
import axios from "axios";
const error = ref(" ")
const userData = ref({
  email: "",
  password: "",
});
const login = async function () {
  if (
    userData.value.email.trim() === "" &&
    userData.value.password.trim() === ""
  ) {
    error.value = "Tous les champs sont requis";
    
    console.log("Tous les champs sont requis");
  } else {
    try {
      const userExist = await clientHttp.post("/users/login", userData.value);
      localStorage.setItem('token',userExist.data.token)
      console.log(userExist);
      
      userData.value.email = "";
      userData.value.password = "";

    /*   Cookies.set("token", userExist.data.token,{ expires: '1h' }); */
     const token = localStorage.getItem('token')
      if(token){
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      }
      router.replace("/home");
    } catch (e) {
        error.value = "oups something wrong"
      console.log(e);
    }
  }
};

</script>
 <style scoped>

body{
    margin-top:20px;
    background:#eee;
}
.container {
    margin-right: auto;
    margin-left: auto;
    padding-right: 15px;
    padding-left: 15px;
    width: 100%;
}

@media (min-width: 576px) {
    .container {
        max-width: 540px;
    }
}

@media (min-width: 768px) {
    .container {
        max-width: 720px;
    }
}

@media (min-width: 992px) {
    .container {
        max-width: 960px;
    }
}

@media (min-width: 1200px) {
    .container {
        max-width: 1140px;
    }
}



.card-columns .card {
    margin-bottom: 0.75rem;
}

@media (min-width: 576px) {
    .card-columns {
        column-count: 3;
        column-gap: 1.25rem;
    }
    .card-columns .card {
        display: inline-block;
        width: 100%;
    }
}
.text-muted {
    color: #9faecb !important;
}

p {
    margin-top: 0;
    margin-bottom: 1rem;
}
.mb-3 {
    margin-bottom: 1rem !important;
}

.input-group {
    position: relative;
    display: flex;
    width: 100%;
}

</style>