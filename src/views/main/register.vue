<template>
    <div class="login-body" id="app">
      <div class="container">
        <form class="form-signin" @submit.prevent="register">
          <div class="form-signin-heading text-center">
            <h1 class="sign-title">REGISTRATION</h1>
            <img src="images/mylogo.png" style="width: 200px" alt="" />
          </div>
          <div class="login-wrap">
            <input
              type="text"
              v-model="vusername"
              @blur="repeated"
              @input="usernameLimit"
              maxlength="19"
              required
              class="form-control"
              placeholder="Username"
              autofocus
            />
            <input
              type="password"
              v-model="vpassword"
              @blur="check"
              maxlength="49"
              required
              class="form-control"
              placeholder="Password"
            />
            <input
              type="password"
              v-model="c_psw"
              @blur="check"
              maxlength="49"
              required
              class="form-control"
              placeholder="Confirm Password"
            />
            <input
              type="text"
              v-model="v_email"
              @blur="checkEmail"
              required
              class="form-control"
              placeholder="Email"
            />
            <div v-if="msg1">
              <label style="color: red">{{ msg1 }}</label>
            </div>
            <div v-if="msg2">
              <label style="color: red">{{ msg2 }}</label>
            </div>
            <div v-if="msg3">
              <label style="color: red">{{ msg3 }}</label>
            </div>
            <div v-if="msg4">
              <label style="color: red">{{ msg4 }}</label>
            </div>
            <button
              class="btn btn-lg btn-login btn-block"
              :class="{ disabled: isDisabled }"
              type="submit"
            >
              <i class="fa fa-check"></i>
            </button>
            <div class="registration">
              Have an account?
              <router-link to="/login">Login</router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import axios from "axios";
  
  const vusername = ref("");
  const vpassword = ref("");
  const c_psw = ref("");
  const msg1 = ref("");
  const msg2 = ref("");
  const msg3 = ref("");
  const msg4 = ref("");
  const v_email = ref("");
  
  const isDisabled = computed(() => {
    return !!msg1.value || !!msg2.value || !!msg3.value || !!msg4.value;
  });
  
  function usernameLimit() {
    vusername.value = vusername.value.replace(/[ `~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '');
  }
  
  function check() {
    if (vpassword.value !== "" && c_psw.value !== "" && vpassword.value !== c_psw.value) {
      msg2.value = "两次密码输入不一样";
    } else {
      msg2.value = "";
    }
  }
  
  function repeated() {
    if (vusername.value !== "" && vusername.value === repeated_username) {
      msg1.value = "用户名重复";
    } else {
      msg1.value = "";
    }
  }
  
  function checkEmail() {
    if (v_email.value) {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(v_email.value)) {
        msg3.value = "";
      } else {
        msg3.value = "邮箱输入格式错误";
      }
      if (v_email.value !== "" && v_email.value === repeated_email) {
        msg4.value = "邮箱已被注册";
      } else {
        msg4.value = "";
      }
    }
  }
  </script>
  
  <style>
  /* ... 样式 ... */
  </style>
  