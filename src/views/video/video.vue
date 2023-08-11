<template>
    <div th:replace="common/header::top"></div>
<!-- header section end-->

<!-- page heading start-->
<!-- page heading end-->

<!--body wrapper start-->
<div class="wrapper" >
    <div class="row">
        <input hidden="hidden" type="text" id="url" th:value="${url}">
        <input hidden="hidden" type="text" id="videoId" th:value="${videoId}">

        <div class="col-md-8">
            <section class="panel">
                <div class="panel-body">
                    <div class="row">
                        <br>
                        <div id="dplayer" ></div>
                        <br>
                        <div id="app" v-clock class="video-info"   >
                            <div class="mytitle" >
                                {{video.title}}
                            </div>
                            <br>
                            <div class="myjudge">
                                <span class="video-view">21,321,321次观看</span>&nbsp&nbsp
                                <span class="video-view">{{video.postTime}}</span>
                                <span   class="video-judge">
                            <a  href="javascript:void(0);" class="fa fa-thumbs-up" >12.3万</a>
                            <a  href="javascript:void(0);" class="fa fa-thumbs-down" >2122</a>
                            <a  @click="collection" id="collection" class="fa fa-star" >1.1万</a>
                            <a  href="javascript:void(0);" class="fa fa-share" >123</a>

                            </span>

                            </div>
                            <hr>
                            <div class="video-usr">
                                <a :href="'http://localhost:8080/user/toHome/'+(video.username)" class="" >
                                    <img  th:src="@{/images/photos/user.png}" alt="" />
                                    <!--获取当前用户名-->
                                    <span class="usrname" >{{video.username}}</span>
                                </a>
                                <a @click="subscribe"    class="btn btn-danger subscribe_btn"  >订阅2.5万</a>
                                <a @click="un_subscribe" class="btn btn-danger subscribe_unbtn" style="display: none">已订阅 2.5万</a>
                            </div>
                            <div class="row">
                                <div >
                                    <!--collapse start-->
                                    <div class="panel-group ">
                                        <div >
                                            <div  class="panel-collapse collapse in">
                                                <div class="panel-body">
                                                    {{video.introduction}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--collapse end-->
                                </div>
                            </div>
                            <div class="row">
                                <div class="panel-body mycomment">
                                    <span class="c_title">评论 {{totalRecords}}</span>
                                    <form class="form-horizontal leave-cmnt">
                                        <div class="form-group">
                                            <textarea v-model="comment_information" class="form-control mytextarea" rows="8" placeholder="Message"></textarea>
                                        </div>
                                    </form>
                                    <p>
                                        <a class="btn btn-post-cmnt pull-right popup" @click="post_comment" >发表评论
                                            <span class="popuptext" id="myPopup">不能发布空评论!</span>
                                            <span class="popuptext" id="myPopup2">发布成功!</span>
                                            <span class="popuptext" id="myPopup3">发布太频繁了!</span>
                                        </a>
                                    </p>
                                    <div id="noComment" style="text-align: center"></div>
                                    <ul v-for="(comment,index) in commentList" class="activity-list">


                                        <li >
                                            <div class="avatar">
                                                <a :href="'http://localhost:8080/user/toHome/'+(comment.commentator)"><img th:src="@{/images/photos/user3.png}" alt=""/></a>
                                            </div>
                                            <div class="activity-desk">

                                                <h5><a :href="'http://localhost:8080/user/toHome/'+(comment.commentator)">{{comment.commentator}}</a> <span>发表了评论</span></h5>
                                                <p class="text-muted" v-text="commentTimeDif[index]"> </p>
                                                <div class="location-map">
                                                    <div class="map-canvas">
                                                        {{comment.commentInfo}}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div id="pagination" style="display: none;">
                                        <ul style="float: right" class="pagination">
                                            <li><a @click="prePage" >«</a></li>
                                            <li><a @click="firstPage" >1</a></li>
                                            <li ><a >···</a></li>
                                            <li class="active"><a >{{currentPage}}</a></li>
                                            <li ><a >···</a></li>
                                            <li><a @click="lastPage" >{{totalPages}}</a></li>
                                            <li><a @click="nextPage" >»</a></li>

                                            <!--                                      <li>-->
                                            <!--                                         跳至<input type="text"  class="form-control myblog-search">-->

                                            <!--                                      </li>-->
                                        </ul>

                                    </div>

                                </div>

                            </div>

                            <a v-bind:title="returnTopInfo" @click="returnTop"  class="btn btn-default returnTop " data-toggle="button">
                                <i style="color: #797979" class="fa fa-arrow-up"></i>
                            </a>

                        </div>
                    </div>
                </div>
            </section>
        </div>

        <div id="app2" v-clock class="col-md-4">
            <div class="row">
                <div class="col-md-12">
                    <section class="panel">
                        <div class="panel-body ">
                            <div class="rightTitle">
                                最新推荐
                            </div>

                            <div v-for="(video,index) in videos" class="rightZoom">
                                <div  class="images item " >
                                    <!--注意此处Vue传入参数的方式-->
                                    <a :href="'/video/toVideo/'+(video.id)" data-toggle="modal" >
                                        <img class="vimg" :src="video.img" alt="" />
                                        <p> &nbsp;{{video.time}}</p>
                                    </a>
                                    <div class="p1">
                                        <a :href="'http://localhost:8080/video/toVideo/'+(video.id)" v-bind:title="video.title" class="aitem">{{video.title}}</a>
                                    </div>
                                    <div >
                                        <p3>
                                            <img  height="15px" width="15px" th:src="@{/images/icon_up.png}" alt="" />
                                            <a  :href="'http://localhost:8080/user/toHome/'+(video.username)"> {{video.username}}&nbsp </a>
                                            <i style="font-size: 15px;color: #86b828" class="fa fa-check-circle-o"></i>
                                        </p3>
                                    </div>
                                    <div class="p2">
                                        <i style="font-size: 16px" class="fa fa-youtube-play"></i>&nbsp22万次 &nbsp&nbsp&nbsp&nbsp
                                        <i style="font-size: 16px" class="fa fa-clock-o"></i>&nbsp {{video.postTime}}
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
<!--body wrapper end-->

<!--footer section start-->
<!--footer section end-->
<div th:replace="common/header::footer"></div>


<!-- m  ain content end-->
  </template>
  
  <script setup>
 import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import axios from 'axios'; // Assuming you're using the axios library for HTTP requests

const url = ref('');
const videoId = ref('');

// For DPlayer setup
// ... Your DPlayer configuration and instantiation

// For main app functionality
const videos = ref([]);
const video = ref('');
const comment_information = ref('');
const currentPage = ref(1);
const video_username = ref('');
const totalPages = ref('');
const upLoading = ref(true);
const commentList = ref([]);
const returnTopInfo = ref('返回顶部');
const commentTimeDif = ref([]);
const totalRecords = ref('');
const timer = ref(0);
const timer2 = ref(0);
const timer3 = ref(0);
const timer4 = ref(0);
const timer5 = ref(0);
const time = ref(0);

onMounted(() => {
    // All the logic inside created() should go here
    moment.locale('zh-cn')
            window.addEventListener('scroll', this.handleScroll,true);  // 监听（绑定）滚轮滚动事件
            window.add
            axios.get('http://localhost:8080/video/getVideoInfo/'+videoId).then(res=>{
                this.video=res.data;
                this.video_username=res.data.username

                const _this=this;
                axios.get('http://localhost:8080/subscription/status/'+_this.video_username+"/"+currentUsername).then(res=> {
                    if (currentUsername===''){
                        //未订阅
                        $('.subscribe_unbtn').attr('style', 'display: none;') ;
                    }else
                    {
                        var original_status=res.data
                        if(original_status>0){
                            //未订阅
                            $('.subscribe_unbtn').attr('style', 'display: none;') ;
                            $('.subscribe_btn').attr('style', 'display: inline;') ;
                        }else {
                            //已订阅
                            $('.subscribe_btn').attr('style', 'display: none;') ;
                            $('.subscribe_unbtn').attr('style', 'display: inline;') ;
                        }
                    }
                })
            });

    axios.get(`http://localhost:8080/video/getVideoInfo/${videoId.value}`).then(res => {
      video.value = res.data;
      video_username.value = res.data.username;

      // ... rest of the axios calls and logic inside created() method
    });
    
    // You should also add any event listeners here
    
});

onBeforeUnmount(() => {
    // The logic inside destroyed() should go here
    window.removeEventListener('scroll', this.handleScroll);   //  离开页面清除（移除）滚轮滚动事件
    // You should also remove any event listeners here
});

// Convert all methods from Vue 2 to regular JS functions
const subscribe = () => {
  // ... method logic
  if (currentUsername!==""){
                    $('.subscribe_btn').css('display', 'none');
                    $('.subscribe_unbtn').css('display', 'inline');
                    /*两个定时方法的解释(该方法在这不能延时太长时间，因为如果还到执行内部代码的时间就切换页面那么就不会执行了)
                       1、 clearTimeout(this.timer)：当上面事件下来时，把唯一的timer清除，即置零
                       2、 this.timer = setTimeout(() =>{···},10000):
                           此时timer开始计时，计到4s时就开始执行大括号里面的函数;
                           如多次点击，那么就会不断触发上面的clearTimeout函数，
                           又会把timer给置零了,又重新计时。所以只有最后一次点击有效
                     */
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        axios.get('http://localhost:8080/subscription/subscribe/' + this.video.username).then(res => {
                            console.log("订阅成功");
                        })
                    },1000)
                }else {
                    alert("请先登录");
                }
}

const un_subscribe = () => {
  // ... method logic
  $('.subscribe_unbtn').css('display', 'none');
                $('.subscribe_btn').css('display', 'inline');
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    axios.get('/subscription/undo_subscribe/' + this.video.username).then(res => {
                        console.log("取消订阅成功");
                    })
                }, 1000)
}

const collection = () => {
    if (currentUsername!==""){
                    $('#collection').css('color', 'blue');
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        axios.get('/collection/addCollection/' + videoId).then(res => {
                            console.log("收藏成功");
                        })
                    },1000)
                }else {
                    alert("请先登录");
                }
}

const un_collection = () => {
}

const post_comment = () => {
    //防止发送空信息
    if (currentUsername!==''){
                    if (this.comment_information==""){
                        var popup = document.getElementById("myPopup");
                        popup.classList.toggle("show")
                        clearTimeout(this.timer2)
                        this.timer2 = setTimeout(() => {
                            popup.classList.remove("show")
                        },3000)
                    }else {
                        //防止频繁发布,time为0 允许发布，每发布一次time置1，经过15s后置0
                        if (this.time==0){
                            axios.post('/comment/postComment',{
                                id: '',
                                video_id: videoId,
                                video_username: this.video_username,
                                commentator: currentUsername,
                                commentTime: new Date(),
                                commentInfo: this.comment_information
                            })
                            this.time=1;
                            this.comment_information='';
                            var popup2 = document.getElementById("myPopup2");
                            popup2.classList.toggle("show")
                            clearTimeout(this.timer3)
                            this.timer3 = setTimeout(() => {
                                popup2.classList.remove("show")
                                this.loadMore(true)
                            },2000)
                            clearTimeout(this.timer4)
                            this.timer4=setTimeout(()=>{
                                this.time=0;
                            },15000)
                        }else {
                            var popup3 = document.getElementById("myPopup3");
                            popup3.classList.toggle("show")
                            clearTimeout(this.timer5)
                            this.timer5 = setTimeout(() => {
                                popup3.classList.remove("show")
                            },2000)
                        }
                    }
                }else {
                    alert("请先登录")
                }
}
const loadMore = (event) => {
    if(this.upLoading||event) {
                    axios('http://localhost:8080/comment/getComment/'+this.currentPage+"/"+videoId).then(res=>{
                        this.commentList=res.data.records;
                        if (this.commentList.length>0){
                            this.totalPages=res.data.pages;
                            this.totalRecords=res.data.total;
                            for (let i = 0; i <this.commentList.length ; i++) {
                                let comment_time=this.commentList[i].commentTime
                                let timeDif=moment(comment_time).startOf('minute').fromNow()
                                if (timeDif.indexOf("天")!==-1||timeDif.indexOf("月")!==-1||timeDif.indexOf("年")!==-1){
                                    this.commentTimeDif.push(moment(comment_time).format("YYYY-MM-DD"))
                                }else {
                                    this.commentTimeDif.push(timeDif)
                                }
                            }
                            $('#pagination').css("display", "inline")
                            $('#noComment').text("")
                        }else {
                            $('#noComment').text("暂无评论，快来占楼吧！")
                        }
                    })
                    this.upLoading = false;


                }
}
const handleScroll = () => {
    //变量scrollTop是滚动条滚动时，距离顶部的距离
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                //变量windowHeight是可视区的高度
                var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
                //变量scrollHeight是滚动条的总高度
                var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

                //滚动条下到876评论部分显示回到顶部按钮
                if (scrollTop<876){
                    $('.returnTop').css("display","none")
                }else{
                    $('.returnTop').css("display","inline")
                }
                //滚动条到底部的条件
                if (scrollTop + windowHeight >= scrollHeight-1) {
                    this.loadMore()
                }

}
const nextPage = () => {
    if (this.currentPage<this.totalPages){
                    this.currentPage=this.currentPage+1
                    this.loadMore(true)
                    window.scrollBy(0,-970);
                }
}
const prePage = () => {
    if (this.currentPage>1){
                    this.currentPage=this.currentPage-1
                    this.loadMore(true)
                    window.scrollBy(0,-326);
                }
}

const firstPage = () => {
    if(this.currentPage!=1){
                    this.currentPage=1
                    this.loadMore(true)
                    window.scrollBy(0,-326);
                }
}
const lastPage = () => {
    if(this.currentPage!=this.totalPages){
                    this.currentPage=this.totalPages
                    this.loadMore(true)
                    window.scrollBy(0,-970);
                }
}
const returnTop = () => {
    window.scrollTo({
                    left: 0,
                    top: 0,
                    behavior: 'smooth'
                })
}
const created = () => {
    moment.locale('zh-cn')
            axios.get('http://localhost:8080/video/getAllVideos/1').then(res=>{
                for (let i = 0; i <res.data.records.length -1; i++) {
                    let post_time = res.data.records[i].postTime
                    let timeDif = moment(post_time).startOf('minute').fromNow()
                    if (timeDif.indexOf("天") !== -1 || timeDif.indexOf("月") !== -1 || timeDif.indexOf("年") !== -1) {
                        res.data.records[i].postTime=(moment(post_time).format("YYYY-MM-DD"))
                    } else {
                        res.data.records[i].postTime=(moment(post_time).startOf('minute').fromNow())
                    }
                    this.videos.push(res.data.records[i])
                }
            })
}


// ... Add other methods here

  
  </script>
  
  <style scoped>
    /* 请在此处放置您的CSS样式。根据需要进行更新。 */
  </style>
  