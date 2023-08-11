<template>
    <div class="wrapper">
      <div class="row">
        <!-- 用户头部组件和其它相关组件可以作为单独的组件引入 -->
        <div class="col-sm-10" style="left: 8.3%">
          <div style="margin-top: -80px">
            <section class="panel">
              <div class="panel-body">
                <div class="media-gal2">
                  <div v-for="(video,index) in videos" :key="index" class="images item">
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
                      <li><a @click="prePage">«</a></li>
                      <li><a @click="firstPage">1</a></li>
                      <li><a>···</a></li>
                      <li class="active"><a>{{currentPage}}</a></li>
                      <li><a>···</a></li>
                      <li><a @click="lastPage">{{totalPages}}</a></li>
                      <li><a @click="nextPage">»</a></li>
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
  
  // 假设username和currentUsername是从外部传入的props
  const props = defineProps(['username', 'currentUsername']);
  
  const videos = ref([]);
  const currentPage = ref(1);
  const totalPages = ref("");
  
  const getVideo = async (pageNum) => {
    moment.locale('zh-cn');
    let url = (props.currentUsername === props.username) ? 
        `/video/getOwn8VideosInfoPerPageByUsername/${pageNum}/${props.username}` :
        `/video/get8VideosInfoPerPageByUsername/${pageNum}/${props.username}`;
  
    try {
      const res = await axios.get(url);
      totalPages.value = res.data.pages === 0 ? 1 : res.data.pages;
      res.data.records.forEach((record) => {
        const timeDif = moment(record.postTime).startOf('minute').fromNow();
        record.postTime = (timeDif.includes("天") || timeDif.includes("月") || timeDif.includes("年")) ?
                            moment(record.postTime).format("YYYY-MM-DD") :
                            timeDif;
      });
      videos.value = res.data.records;
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  }
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
      getVideo(currentPage.value);
    }
  }
  
  const prePage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
      getVideo(currentPage.value);
    }
  }
  
  const firstPage = () => {
    currentPage.value = 1;
    getVideo(currentPage.value);
  }
  
  const lastPage = () => {
    currentPage.value = totalPages.value;
    getVideo(currentPage.value);
  }
  
  // 初始获取
  getVideo(1);
  </script>
  
  <style scoped>
  [v-cloak] {
      display: none;
  }
  /* Other styles ... */
  </style>
  