<template>
    <div class="mybody">
      <!-- left side start-->
<!-- left side end-->

<!-- main content start-->

<!-- header section start-->
<div th:replace="common/header::top"></div>
<!-- header section end-->

<!-- page heading start-->
<!-- page heading end-->
  
<div class="wrapper">
    <div class="row">
      <!-- ... -->
      <div th:replace="common/header::#user_header(activeUrl='fans.html')"></div>
      <div id="app" v-clock class="col-sm-10" style="left: 8.3%">
        <div style="margin-top: -80px">
          <section class="panel">
            <div class="panel-body">
              <div class="col-md-12 col-sm-6">
                <div v-for="fan in fans" :key="fan.id">
                  <div class="panel-body">
                    <div class="media">
                      <a class="pull-left" :href="'/user/toHome/' + fan.username">
                        <img style="border-radius: 50%; width: 75px; height: 75px" src="images/photos/user2.png" alt="" />
                      </a>
                      <div class="media-body">
                        <address>
                          <br>
                          <a style="text-decoration: none" :href="'/user/toHome/' + fan.username">
                            <strong style="font-size: large">{{ fan.username }}</strong>
                          </a>
                          <div>{{ fan.signature }}</div>
                        </address>
                      </div>
                    </div>
                    <hr>
                  </div>
                </div>
                <div v-if="!fans.length">
                  <div class="panel-body">
                    <div class="media">
                      <div class="media-body">
                        <address>
                          <br>
                          <strong style="font-size: x-large; margin-left: 10.6cm">您还没有关注者，快去发布作品吧！</strong><br>
                        </address>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';

// Data
const state = reactive({
  signature: '',
  avatar: '',  // 如果您有其他逻辑需要这个avatar，请补充
  username: ''
});

const currentUsername = ''; // 这里我不确定`currentUsername`是从哪里来的，请您补充逻辑

// 计时器
let timer = null;

// Mounted Lifecycle
onMounted(async () => {
  try {
    state.username = document.querySelector("#username").value;
    const response = await axios.get('/user/getUsersInfo/' + state.username);
    
    if (response.data.signature) {
      state.signature = response.data.signature;
    }

    if (currentUsername === '') {
      document.querySelector(".header_subscribe_btn").style.display = 'inline';
      document.querySelector(".header_subscribe_unbtn").style.display = 'none';
    } else {
      const subscriptionStatusResponse = await axios.get('/subscription/status/' + state.username + "/" + currentUsername);
      if (subscriptionStatusResponse.data > 0) {
        document.querySelector(".header_subscribe_btn").style.display = 'inline';
        document.querySelector(".header_subscribe_unbtn").style.display = 'none';
      } else {
        document.querySelector(".header_subscribe_btn").style.display = 'none';
        document.querySelector(".header_subscribe_unbtn").style.display = 'inline';
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});

// Methods
const setSignature = async () => {
  try {
    if (state.signature === '') {
      await axios.get('/user/deleteSignature/' + currentUsername);
    } else {
      await axios.get('/user/setSignature/' + currentUsername + "/" + state.signature);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const subscribe = async (event) => {
  try {
    if (currentUsername !== "") {
      const elem = event.target;
      const buttonName = elem.name;
      document.querySelector(`[name='${buttonName}']`).style.display = 'none';
      document.querySelector(`[name='un_${buttonName}']`).style.display = 'inline';

      const youtuberName = buttonName.slice(3);

      clearTimeout(timer);
      timer = setTimeout(async () => {
        await axios.get('/subscription/subscribe/' + youtuberName);
        console.log("订阅成功");
      }, 1000);
    } else {
      alert("请先登录");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const un_subscribe = async (event) => {
  try {
    const elem = event.target;
    const buttonName = elem.name.slice(3);  // un_subxxx -> subxxx

    document.querySelector(`[name='${buttonName}']`).style.display = 'inline';
    document.querySelector(`[name='un_${buttonName}']`).style.display = 'none';

    const youtuberName = buttonName.slice(3);  // subxxx -> xxx

    clearTimeout(timer);
    timer = setTimeout(async () => {
      await axios.get('/subscription/undo_subscribe/' + youtuberName);
      console.log("取消订阅成功");
    }, 1000);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

  </script>
  
  <style>
    [v-clock] {
      display: none;
    }
    /* ... Other styles ... */
  </style>
  