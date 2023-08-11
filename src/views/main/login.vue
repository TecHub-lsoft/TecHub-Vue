<template>
    <div class="login-body">
      <div class="container">
        <form class="form-signin" @submit.prevent="login">
          <div class="form-signin-heading text-center">
            <h1 class="sign-title">Sign In</h1>
            <img src="images/mylogo.png" style="width: 200px" alt="" />
          </div>
          <div class="login-wrap">
            <input
              type="text"
              v-model="username"
              required
              class="form-control"
              placeholder="Username"
              autofocus
            />
            <input
              type="password"
              v-model="password"
              required
              class="form-control"
              placeholder="Password"
            />
            <span v-if="errorMessage" class="text-danger">{{ errorMessage }}</span>
            <button class="btn btn-lg btn-login btn-block" type="submit">
              <i class="fa fa-check"></i>
            </button>
            <div class="registration">
              Not a member yet?
              <router-link to="/register">Signup</router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </template>

  <script setup>
	import request from '@/utils/request.js'
	import {ref} from 'vue'
	import router from '@/router/index.js'
  import axios from "axios";
  
	
	const username = ref("");
const password = ref("");
const errorMessage = ref("");

async function login() {
  try {
    const response = await axios.post("http://localhost:8080/api/login", {
      username: username.value,
      password: password.value,
    });

    // 根据后端响应处理逻辑，这里使用假设的逻辑
    if (response.data.success) {
      // 登录成功，执行跳转逻辑
      alert("登录成功");
      // 在这里添加实际的路由跳转逻辑
    } else {
      // 登录失败，显示错误信息
      errorMessage.value = "用户名或密码错误，请重新输入";
    }
  } catch (error) {
    console.error("登录失败", error);
    errorMessage.value = "登录失败，请稍后重试";
  }
}

  
	
	
</script>

<style>
</style>