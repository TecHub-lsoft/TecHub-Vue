<template>
    <div id="app">
      <HeaderSection />
      <div class="left-side sticky-left-side" tabindex="5000" style="overflow: hidden;">
        <!-- 左侧导航栏内容 -->
      </div>
      <div class="wrapper" v-clock>
        <div class="row">
          <div class="col-sm-12">
            <section class="index_panel">
              <div class="panel-body">
                <div class="media-gal">
                  <div v-for="(video, index) in videos" class="images item">
                    <!-- Vue传入参数的方式 -->
                    <router-link :to="'/video/toVideo/' + video.id" data-toggle="modal">
                      <span class="spanImg">
                        <img class="vimg" :src="video.img" alt="" />
                        <p>&nbsp;{{ video.time }}</p>
                        <div class="myplayicon"></div>
                      </span>
                    </router-link>
                    <div>
                      <p1>
                        <router-link :to="'/video/toVideo/' + video.id" :title="video.title" class="aitem">{{ video.title }}</router-link>
                      </p1>
                    </div>
                    <div>
                      <p3>
                        <!-- 使用Vue的语法引用图片 -->
                        <img :src="require('@/images/icon_up.png')" alt="Icon Up" />
                        
                        <router-link :to="'/user/toHome/' + video.username"> &nbsp{{ video.username }}&nbsp</router-link>
                        <i style="font-size: 15px; color: #86b828" class="fa fa-check-circle-o"></i>
                      </p3>
                    </div>
                    <div>
                      <p2>
                        <i style="font-size: 16px" class="fa fa-youtube-play"></i>&nbsp&nbsp12万次&nbsp&nbsp&nbsp&nbsp
                        <i style="font-size: 15px" class="fa fa-clock-o"></i>&nbsp{{ video.postTime }}
                      </p2>
                    </div>
                  </div>
  
                  <div class="col-md-12 text-center clearfix">
                    <ul class="pagination">
                      <li><a href="javascript:void(0)" @click="lastPage">«</a></li>
                      <li><a href="javascript:void(0)" @click="nextPage">»</a></li>
                    </ul>
                  </div>
                </div>
  
                <!-- Modal -->
                <!-- modal -->
              </div>
            </section>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import moment from 'moment';
  import axios from 'axios';
  
  const currentUsername = document.getElementById('currentUsername').textContent;
  
  const videos = ref([]);
  const currentPage = ref(1);
  const totalPages = ref('');
  
  const notifications = ref([]);
  const notificationsNum = ref(0);
  const times = ref([]);
  const msg = '清空通知栏消息';
  const msg2 = '点击已读';
  const msg3 = '返回首页';
  const keyword = ref('');
  
  const getVideo = (pageNum) => {
    moment.locale('zh-cn');
    axios.get('/video/getAllVideos/' + pageNum).then((res) => {
      totalPages.value = res.data.pages;
      res.data.records.forEach((record) => {
        let post_time = record.postTime;
        let timeDif = moment(post_time).startOf('minute').fromNow();
        if (timeDif.indexOf('天') !== -1 || timeDif.indexOf('月') !== -1 || timeDif.indexOf('年') !== -1) {
          record.postTime = moment(post_time).format('YYYY-MM-DD');
        } else {
          record.postTime = moment(post_time).startOf('minute').fromNow();
        }
      });
      videos.value = res.data.records;
    });
  };
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value += 1;
      if (keyword.value !== '') {
        getKeyVideo(keyword.value);
      } else {
        getVideo(currentPage.value);
      }
    }
  };
  
  const lastPage = () => {
    if (currentPage.value > 1) {
      currentPage.value -= 1;
      if (keyword.value !== '') {
        getKeyVideo(keyword.value);
      } else {
        getVideo(currentPage.value);
      }
    }
  };
  
  const clearAll = () => {
    axios.get('/notification/clearNotifications/' + currentUsername).then(() => {
      notifications.value = [];
      hasRead();
    });
  };
  
  const hasRead = () => {
    axios.get('/notification/clearNotificationsNum/' + currentUsername).then(() => {
      notificationsNum.value = 0;
    });
  };
  
  const getKeyVideo = (keyword) => {
    axios.get('/video/getKeyVideos/' + currentPage.value + '/' + keyword).then((res) => {
      totalPages.value = res.data.pages;
      res.data.records.forEach((record) => {
        let post_time = record.postTime;
        let timeDif = moment(post_time).startOf('minute').fromNow();
        if (timeDif.indexOf('天') !== -1 || timeDif.indexOf('月') !== -1 || timeDif.indexOf('年') !== -1) {
          record.postTime = moment(post_time).format('YYYY-MM-DD');
        } else {
          record.postTime = moment(post_time).startOf('minute').fromNow();
        }
      });
      videos.value = res.data.records;
    });
  };
  
  const search = () => {
    currentPage.value = 1;
    keyword.value = document.getElementById('keyword').value;
    if (keyword.value !== '') {
      getKeyVideo(keyword.value);
    } else {
      getVideo(currentPage.value);
    }
  };
  
  onMounted(() => {
    moment.locale('zh-cn');
    axios.get('/notification/getNotifications/' + currentUsername).then((res) => {
      if (res.data !== null) {
        notifications.value = res.data;
        res.data.forEach((subscribe) => {
          let timeDif = moment(subscribe.notify_time).startOf('minute').fromNow();
          if (timeDif.indexOf('月') !== -1 || timeDif.indexOf('年') !== -1) {
            times.value.push(moment(subscribe.notify_time).format('YYYY-MM-DD'));
          } else {
            times.value.push(timeDif);
          }
        });
      }
    });
    axios.get('/notification/getNotificationsNum/' + currentUsername).then((res) => {
      if (res.data !== null) {
        notificationsNum.value = res.data;
      } else {
        notificationsNum.value = 0;
      }
    });
    getVideo(1);
  });
  </script>
  
  <!-- Add the styles and other necessary scripts below -->
  
  <style scoped>
  /* ... 样式 ... */
  </style>
  