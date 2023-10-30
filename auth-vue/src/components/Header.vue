<template>
    <div class="navbar">
      <div class="navbar_content">
        <div class="navbar_logo">
          <div class="navbar_content_logo">
            <a href="#"><span>Big</span><span>Benin</span></a>
          </div>
        </div>
        <div class="navbar_link">
          <ul>
            <li><RouterLink to="#" class="navbarBtn">Accueil</RouterLink></li>
            <li><RouterLink to="#" class="navbarBtn">Voir Benin</RouterLink></li>
            <li><RouterLink to="#" class="navbarBtn">AboutUs</RouterLink></li>
            <li @click="logout"><RouterLink to="" >LogOut</RouterLink></li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  <script lang="ts" setup>
  function logout(){
  
  }
  </script>
  <style scoped>
  .navbar {
    box-shadow: 0 0 5px rgb(97, 97, 174);
    z-index: 50;
    top: 0%;
    padding: 16px 30px;
    position: fixed;
    min-width: 100vw;
    background-color:  rgb(97, 97, 174);
  }
  .navbar_content {
    display: flex;
    justify-content: space-between !important;
    padding: 10px 160px;
  }
  ul {
    display: flex;
    align-items: center;
    gap: 30px;
    margin-left: 30px;
  }
  li {
    list-style-type: none;
  }
  a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    font-size: 18px;
  }
  .navbarBtn::after{
    content: '';
    position: absolute;
    width: 100%;
    height: 3px;
    background-color: white;
    transform: scale(0);
    transition: 0.5s;
    bottom: -5px;
    left: 0;
  }
  .navbarBtn:hover::after{
    transform: scale(1);
  }
  .navbar_content_logo{
      font-style: italic;
      font-weight: bold;
      font-size: 24px;
  }
  .navbar_logo{
      display: flex;
      align-items: center;
  }
  </style>
  