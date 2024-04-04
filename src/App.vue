<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <button @click="getData">clickthis</button> -->
  <form>
    <label for="username">username:
    </label>
    <input v-model="userInfo.username" type="text" name="username">
    <br>
    <label for="password">password:
    </label>
    <input v-model="userInfo.password" type="text" name="password">
    <br>
    <button @click.prevent="getData">submit</button>
  </form>
  <button class="btn btn-primary">Primary button</button>
  <button @click="logHello">logHello</button>
  <div class="a">
    <div class="b"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const userInfo = ref({
  username: '',
  password: ''
})
const request = axios.create({
  baseURL: '/api'
})
const logHello = async () => {
  const r = await request.get(
    '/a'
  );
  alert(r.data)
}
const getData = async () => {
  const r = await request.post(
    '/login',
    userInfo.value
  );
  if (r.data.code === 200) {
    alert('Success Add')
  } else {
    alert("already exist")
  }
}
</script>

<style lang="scss">
.a {
  height: 100px;
  width: 100px;
  background-color: green;

  .b {
    background-color: red;
    width: 50px;
    height: 50px;
  }
}
</style>