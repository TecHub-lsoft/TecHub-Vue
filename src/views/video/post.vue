<template>
    <div th:replace="common/header::top"></div>
    <div class="wrapper">
        <div class="row">
            <div class="col-sm-10" style="left: 8.3%">
                <section class="panel">
                    <div class="panel-body">
                        <div class="media-gal2">
                            <div class="col-md-12">
                                <span class="js-switch">
                                    <input @change="changeVideoStatus" type="checkbox" id="videoStatus" class="js-switch-blue" checked />
                                    <span id="public">公开</span>
                                </span>
                                <div id="app" v-cloak class="panel-body">
                                    <div id="post_show">
                                        <form @click="openFile" class="dropzone">
                                            <i class="fa fa-upload i"></i>
                                            <div class="text">
                                                点击选择视频文件
                                            </div>
                                            <div class="notice">
                                                (目前仅支持mp4格式的大小为50MB以下的视频文件)
                                            </div>
                                            <div class="chose"></div>
                                            <div class="videoName"></div>
                                        </form>
                                        <form class="myform" enctype="multipart/form-data">
                                            <input style="display: none" type="file" name="videoFile" id="postVideo" @change="getFileName($event)">
                                            <div class="form-group myform-group">
                                                <label class="col-md-2 col-sm-2 control-label mylabel">标题</label>
                                                <div class="title form-control">
                                                    <input @input="charNumDisplay" v-model="title" maxlength="80" class="hiddenInput" type="text" required>
                                                    <span class="charNum">{{ remain1 }}/80</span>
                                                </div>
                                            </div>
                                            <div class="form-group myform-group2">
                                                <label class="col-md-2 col-sm-2 control-label mylabel">视频介绍</label>
                                                <textarea @input="charNumDisplay" v-model="introduction" maxlength="250" class="form-control mytextarea" rows="8" placeholder="完善视频的相关信息,让更多人能找到你的视频!"></textarea>
                                                <span class="charNum">{{ remain2 }}/250</span>
                                            </div>
                                            <div class="mysubmit">
                                                <a @click="post" class="btn btn-info">确认上传</a>
                                                <a href="javascript:window.history.back();" class="btn btn-default back">返回上页</a>
                                                <a hidden id="errorNotice" href="#myModal2" data-toggle="modal"></a>
                                            </div>
                                        </form>
                                    </div>
                                    <div id="succ_show" style="display: none">
                                        <div class="post_succ">
                                            <img class="loading" style="height: 200px" th:src="@{/images/loading.gif}">
                                            <img class="succ" style="height: 200px" th:src="@{/images/post_succ.png}">
                                            <div class="text">上传中</div>
                                            <div class="btn">
                                                <a href="/post.html" class="btn btn-info">继续上传</a>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <a href="/" class="btn btn-default">返回主页</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="myModal2" class="modal fade">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <a aria-hidden="true" data-dismiss="modal" class="close">×</a>
                                                    <h4 class="modal-title">提示</h4>
                                                </div>
                                                <div class="media-gal4 modal-body">
                                                    <div id="errorMsg"></div>
                                                </div>
                                                <div class="modal-footer">
                                                    <a type="button" class="btn btn-default" data-dismiss="modal">确定</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                            </div>
                            <div class="col-md-10 text-right clearfix"></div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
import axios from 'axios'

// 数据
const video_status = ref(0)
const videoFile = ref(null)
const title = ref('')
const introduction = ref('')
const remain1 = ref(0)
const remain2 = ref(0)

// 方法
const changeVideoStatus = () => {
    const videoStatus = document.querySelector('#videoStatus').checked
    if (videoStatus) {
        video_status.value = 0
        document.querySelector("#public").textContent = '公开'
    } else {
        video_status.value = 2
        document.querySelector("#public").textContent = '私密'
    }
}

const openFile = () => {
    document.querySelector('#postVideo').click()
}

const getFileName = (event) => {
    const file = event.currentTarget.files[0]
    videoFile.value = file
    title.value = file.name
    document.querySelector('.videoName').textContent = file.name
    document.querySelector('.chose').textContent = '已选择:'
    charNumDisplay()
}

const charNumDisplay = () => {
    remain1.value = title.value.length
    remain2.value = introduction.value.length
}

const post = async () => {
    if (videoFile.value) {
        if (title.value) {
            const [fileType, videoType] = videoFile.value.type.split("/")
            if (fileType === 'video' && videoType === 'mp4') {
                const params = new FormData()
                params.append('title', title.value)
                // 注意这里我假设`currentUsername`是一个你已定义的变量
                params.append('username', currentUsername)
                params.append('videoFile', videoFile.value)
                params.append('status', video_status.value)
                params.append('introduction', introduction.value)
                
                await axios.post('/video/addVideo', params, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'x-oss-object-acl': 'public-read'
                    }
                })

                // 清除数据和展示成功页面
                title.value = ''
                videoFile.value = null
                introduction.value = ''
                document.querySelector('.videoName').textContent = ''
                document.querySelector('.chose').textContent = ''
                document.querySelector("#post_show").style.display = 'none'
                document.querySelector("#succ_show").style.display = 'inline'

            } else {
                showError("很抱歉，目前仅支持mp4格式的视频文件")
            }
        } else {
            showError("请输入标题")
        }
    } else {
        showError("请先选择上传的视频")
    }
}

const showError = (message) => {
    document.querySelector("#errorMsg").textContent = message
    document.querySelector("#errorNotice").click()
}

  </script>
  
  <style scoped>
    /* ... your CSS here ... */
  </style>
  