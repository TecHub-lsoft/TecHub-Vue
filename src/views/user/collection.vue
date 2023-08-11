<template>
    <div class="wrapper">
      <div class="row">
        <!-- 请注意，以下 div 中的 th:replace 需要您自行处理，可能是通过组件或插槽实现 -->
        <div></div> <!-- common/header::#user_header(activeUrl='collection.html') -->
        <div id="app" v-clock class="col-sm-10" style="left: 8.3%">
          <div style="margin-top: -80px">
            <section class="panel">
              <div class="panel-body">
                <div class="media-gal2">
                  <div v-for="(video,index) in videos" class="images item">
                    <a :href="'/video/toVideo/' + video.id" data-toggle="modal">
                      <img class="vimg" :src="video.img" alt="" />
                      <p>&nbsp;{{video.time}}</p>
                      <div class="myplayicon"></div>
                    </a>
                    <div class="p1"><a :href="'/video/toVideo/' + video.id" class="aitem">{{video.title}}</a></div>
                    <div class="p2">
                      <i style="font-size: 16px" class="fa fa-youtube-play"></i>&nbsp212万次 &nbsp&nbsp&nbsp&nbsp
                      <i style="font-size: 16px" class="fa fa-clock-o"></i>&nbsp {{video.postTime}}
                    </div>
                  </div>
                  <div class="col-md-12 text-center clearfix">
                    <ul class="pagination">
                      <li><a href="javascript:void(0);" @click="prePage">«</a></li>
                      <li><a href="javascript:void(0);" @click="firstPage">1</a></li>
                      <li><a>···</a></li>
                      <li class="active"><a>{{currentPage}}</a></li>
                      <li><a>···</a></li>
                      <li><a href="javascript:void(0);" @click="lastPage">{{totalPages}}</a></li>
                      <li><a href="javascript:void(0);" @click="nextPage">»</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue';
import axios from 'axios'; 
import moment from 'moment';

const videos = ref([]);
const currentPage = ref(1);
const totalPages = ref('');

// 模拟 Vue 2 的 created 钩子
const init = async () => {
    moment.locale('zh-cn');
    await getVideo(1);
};
init();

const getVideo = async (pageNum) => {
    moment.locale('zh-cn');
    
    try {
        const res = await axios.get('/collection/getCollection/' + pageNum + '/' + username); // 假设username已经定义
        totalPages.value = res.data.pages === 0 ? 1 : res.data.pages;

        res.data.records.forEach(record => {
            let post_time = record.postTime;
            let timeDif = moment(post_time).startOf('minute').fromNow();
            if (timeDif.includes("天") || timeDif.includes("月") || timeDif.includes("年")) {
                record.postTime = moment(post_time).format("YYYY-MM-DD");
            } else {
                record.postTime = moment(post_time).startOf('minute').fromNow();
            }
        });

        videos.value = res.data.records;
    } catch (error) {
        console.error("Failed to fetch videos:", error);
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        getVideo(currentPage.value);
    }
};

const prePage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        getVideo(currentPage.value);
    }
};

const firstPage = () => {
    if (currentPage.value !== 1) {
        currentPage.value = 1;
        getVideo(currentPage.value);
    }
};

const lastPage = () => {
    if (currentPage.value !== totalPages.value) {
        currentPage.value = totalPages.value;
        getVideo(currentPage.value);
    }
};
</script>

  
  <style>
    /*v-clock 解决闪烁{{后端参数}}的问题，在id=app的div内声明v-clock即可*/
    [v-clock] {
      display: none;
    }
  </style>
  