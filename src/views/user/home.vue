<template>
    <div class="mybody">

    <!-- left side (assuming it's empty as per the comment) -->
    
    <!-- main content start -->

    <!-- header section -->
    <div></div> <!-- this was the th:replace, you might need to add the header component manually -->

    <!-- body wrapper start -->
    <div class="wrapper " >
    <div class="row ">
        <div th:replace="common/header::#user_header(activeUrl='home.html')"></div>

        <div id="app" v-clock class="col-sm-10" style="left: 8.3%">
           <div style="margin-top: -80px">
            <section class="panel">
                <div class="panel-body">
                    <div style="margin-top: -30px">
                    <div  class="media-gal2">
                        <div class="col-md-12">
                            <section class="panel">
                                <div style="margin-top: -60px">
                                <div class="panel-body">
                                    <div v-if="top_videoInfo===''&& username===currentUsername"  class="i-pin-empty-set list-create">
                                            <a  style="text-decoration: none" href="#myModal" @click="chooseVideo" data-toggle="modal" >
                                            <br>
                                            <br>
                                            <div class="icon"><i style="font-size: 50px" class="fa fa-plus"></i></div>
                                            <div class="text">设置置顶视频</div>
                                            </a>
                                        </div>
                                    <div v-if="top_videoInfo!==''" class="top_video">
                                        <div  class="images item ">
                                            <!--注意此处Vue传入参数的方式-->
                                            <a  :href="'http://localhost:8080/video/toVideo/'+(top_videoInfo.id)"  data-toggle="modal" >
                                                <img class="vimg" :src="top_videoInfo.img" alt="" />
                                            </a>
                                            <a :href="'http://localhost:8080/video/toVideo/'+(top_videoInfo.id)" class="aitem">{{top_videoInfo.title}}</a>
                                            <div class="p2">
                                                <i style="font-size: 14px;" class="fa fa-youtube-play"></i>&nbsp212万次 &nbsp&nbsp&nbsp&nbsp
                                                <i style="font-size: 14px;" class="fa fa-comments-o"></i>&nbsp2213  &nbsp&nbsp&nbsp&nbsp
                                                <i style="font-size: 14px;" class="fa fa-clock-o"></i>&nbsp {{top_videoInfo.postTime}}
                                            </div>
                                            <div class="p3">{{top_videoInfo.introduction}}</div>
                                            <div v-if="currentUsername===username" class="set" >
                                                <a @click="chooseVideo" href="#myModal"  data-toggle="modal" style="color:white;" class="btn btn-info">编辑置顶</a>
                                                <a href="#myModal2"  data-toggle="modal" class="btn btn-default">取消置顶</a>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Modal -->
                                    <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="myModal" class="modal fade">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <a @click="reChoose" aria-hidden="true" data-dismiss="modal" class="close" >×</a>
                                                    <h4 class="modal-title">请选择置顶视频</h4>
                                                </div>
                                                <div  class="media-gal3 modal-body">
                                                    <a id="a_choose" href="#"  data-toggle="modal" >
                                                        <div @click="chosen($event,video.id)" v-for="(video,index) in videos" class="images item ">
                                                            <!--注意此处Vue传入参数的方式-->
                                                            <img class="vimg" :src="video.img" alt="" />
                                                            <span class="p1">{{video.title}}
                                                        </span>
                                                            <span class="p2"> <i style="font-size: 14px;" class="fa fa-youtube-play"></i>&nbsp212万次 &nbsp&nbsp&nbsp&nbsp
                                                            <i style="font-size: 14px;" class="fa fa-clock-o"></i>&nbsp {{video.postTime}}
                                                        </span>
                                                        </div>
                                                    </a>

                                                </div>
                                                <div class="modal-footer">
                                                    <ul class="pagination">
                                                        <li ><a href="javascript:void(0);" @click="lastPage($event)">«</a></li>
                                                        <li><a href="javascript:void(0);"  @click="nextPage($event)">»</a></li>
                                                    </ul>
                                                    <span >{{currentPage}}/{{totalPage}}</span>
                                                    <div>
                                                    <a type="button" id="chosen"  @click="submit" class="btn btn-success" data-dismiss="modal">确定</a>
                                                    &nbsp&nbsp&nbsp
                                                    <a @click="reChoose" type="button" class="btn btn-default" data-dismiss="modal">取消</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="myModal2" class="modal fade">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <a aria-hidden="true" data-dismiss="modal" class="close" >×</a>
                                                    <h4 class="modal-title">确认提示</h4>
                                                </div>
                                                <div  class="media-gal4 modal-body">
                                                    <div>确定要取消置顶视频吗？</div>
                                                </div>
                                                <div class="modal-footer">
                                                    <a type="button" @click="cancel" class="btn btn-success" data-dismiss="modal">确定</a>
                                                    <a type="button" class="btn btn-default" data-dismiss="modal">取消</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </section>
                        </div>

                        <div class="col-md-10 text-right clearfix">
                        </div>
                    </div>
                    </div>
                </div>
            </section>
           </div>
        </div>

    </div>
</div>
    <!-- body wrapper end -->

    <!-- footer section -->
    <div></div> <!-- this was the th:replace, you might need to add the footer component manually -->

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import moment from 'moment';

moment.locale('zh-cn');

const videos = ref([]);
const top_video_id = ref('');
const top_videoInfo = ref({});
const currentPage = ref(1);
const totalPage = ref(1);
const isChosenDisabled = ref(true);

async function fetchTopVideoInfo() {
    const response = await axios.get(`http://localhost:8080/video/getTopVideoInfoByUsernameAndStatus/${username}`);
    if (response.data) {
        top_videoInfo.value = response.data;
    }
}

async function getVideo(pageNum) {
    const response = await axios.get(`http://localhost:8080/video/get7VideosInfoPerPageByUsername/${pageNum}/${username}`);
    totalPage.value = response.data.pages === 0 ? 1 : response.data.pages;
    
    videos.value = response.data.records.map(video => {
        let timeDif = moment(video.postTime).startOf('minute').fromNow()
        video.postTime = timeDif.includes("天") || timeDif.includes("月") || timeDif.includes("年") 
            ? moment(video.postTime).format("YYYY-MM-DD")
            : timeDif;
        return video;
    });
}

function chooseVideo() {
    isChosenDisabled.value = true;
    getVideo(1);
}

function chosen(event, videoId) {
    top_video_id.value = videoId;
    isChosenDisabled.value = false;
}

function reChoose() {
    top_video_id.value = '';
    videos.value = [];
    currentPage.value = 1;
}

async function submit() {
    if (top_video_id.value !== top_videoInfo.value.id) {
        if (top_videoInfo.value !== '') {
            await axios.get(`http://localhost:8080/video/cancelTopVideoStatus/${top_videoInfo.value.id}`);
        }
        const response = await axios.get(`/video/getVideoInfoById/${top_video_id.value}`);
        top_videoInfo.value = response.data;
        await axios.get(`http://localhost:8080/video/setTopVideoStatus/${top_video_id.value}`);
        reChoose();
    } else {
        reChoose();
    }
}

async function cancel() {
    await axios.get(`http://localhost:8080/video/cancelTopVideoStatus/${top_videoInfo.value.id}`);
    top_videoInfo.value = '';
}

function nextPage() {
    isChosenDisabled.value = true;
    if (currentPage.value < totalPage.value) {
        currentPage.value++;
        getVideo(currentPage.value);
    }
}

function lastPage() {
    isChosenDisabled.value = true;
    if (currentPage.value > 1) {
        currentPage.value--;
        getVideo(currentPage.value);
    }
}

onMounted(fetchTopVideoInfo);
</script>