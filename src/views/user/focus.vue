<template>
    <div class="mybody">
        <div th:replace="common/header::top"></div>

        <div class="wrapper">
            <div class="row">
                
                <header :active-url="'focus.html'"></header>

                <div class="col-md-12 col-sm-6">
        <div v-for="youtuber in youtubers" :key="youtuber.username">
            <div class="panel-body">
                <div class="media">
                    <a class="pull-left" :href="'http://localhost:8080/user/toHome/' + youtuber.username">
                        <img style="border-radius: 50%; width: 75px; height: 75px" class="thumb media-object" src="/images/photos/user2.png" alt="">
                    </a>
                    <div class="media-body">
                        <address>
                            <br>
                            <a style="text-decoration: none" :href="'http://localhost:8080/user/toHome/' + youtuber.username">
                                <strong style="font-size: large">{{ youtuber.username }}</strong><br>
                            </a>
                            <div>{{ youtuber.signature }}
                                <span v-if="username === currentUsername">
                                    <a :name="'sub' + youtuber.username" @click="subscribe($event)" class="btn btn-danger subscribe_btn">订阅2.5万</a>
                                    <a :name="'un_sub' + youtuber.username" @click="unSubscribe($event)" class="btn btn-danger subscribe_unbtn">已订阅 2.5万</a>
                                </span>
                            </div>
                        </address>
                    </div>
                </div>
            </div>
            <hr>
        </div>

        <div v-if="youtubers.length === 0">
            <div class="panel-body">
                <div class="media">
                    <div class="media-body">
                        <address>
                            <br>
                            <strong style="font-size: x-large; margin-left: 9cm">您还没有订阅任何人，快去订阅自己喜欢的作者吧！</strong><br>
                        </address>
                    </div>
                </div>
            </div>
        </div>
    </div>
            </div>
        </div>

        <div th:replace="common/header::footer"></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import Header from '@/views/common/header.vue';

defineProps(['activeUrl']); // 如果你需要从父组件接收 props，可以使用 defineProps

// 导出组件以便在模板中使用
const components = { Header };

const youtubers = ref([])
const timer = ref(0)
const username = ref('') // Assuming this comes from somewhere, might need adjustment

onMounted(async () => {
    const res = await axios.get(`http://localhost:8080/subscription/search_focus/${username.value}`)
    for (let subscribe of res.data) {
        const userData = await axios.get(`http://localhost:8080/user/getUsersInfo/${subscribe.youtuber}`)
        youtubers.value.push(userData.data)
    }
})

const subscribe = async (event) => {
    // Hide current button and show the other one
    subscribeButton.value.style.display = 'none'
    unSubscribeButton.value.style.display = 'inline'

    const youtuberName = event.target.name.slice(3)
    clearTimeout(timer.value)
    timer.value = setTimeout(async () => {
        await axios.get(`http://localhost:8080/subscription/subscribe/${youtuberName}`)
        console.log("订阅成功")
    }, 1000)
}

const unSubscribe = async (event) => {
    // Hide current button and show the other one
    unSubscribeButton.value.style.display = 'none'
    subscribeButton.value.style.display = 'inline'
    
    const youtuberName = event.target.name.slice(6)
    clearTimeout(timer.value)
    timer.value = setTimeout(async () => {
        await axios.get(`http://localhost:8080/subscription/undo_subscribe/${youtuberName}`)
        console.log("取消订阅成功")
    }, 1000)
}

</script>

<style>
/* ... (Your styles go here) */
</style>
