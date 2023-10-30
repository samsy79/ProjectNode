<template>
  <Navbar></Navbar>
<section>
  <div class="content  flex " style="height: 800px; ">
    <div class="user m-5">
      <h1>Hi nigga <span style="color: rgb(97, 97, 174);">{{ name }}</span> Welcome to Benin</h1>
    </div>
    <div class="email">{{ userData.email }}</div>
    <div class="age">{{ userData.age }}</div>
    <div class="age">{{ userData.knowMore }}</div>

  </div>
</section>

</template>
<script lang="ts" setup>
import router from "@/router";
import { ref, onMounted } from "vue";
import Navbar from "@/components/Header.vue";
import Cookies from "js-cookie";
const isModelOpen = ref(false);
const departments = ref([]);
let msg = ref("");
let userData = ref({
email:"",
age:"",
knowMore:""
})
let name =ref("")
const isloading = ref(false);
onMounted(async () => {

});
const token = localStorage.getItem('token');
if (token) {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  console.log(decodedToken);
  
  userData.value.email = decodedToken.email;
    name.value = userData.value.email.split("@")[0];
  userData.value.age = decodedToken.age;
  userData.value.knowMore =decodedToken.knowMore

} else {
  console.log('Le token n\'a pas été trouvé dans localStorage.');
  router.replace('/')
}
</script>
<style scoped>
.flex{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
</style>