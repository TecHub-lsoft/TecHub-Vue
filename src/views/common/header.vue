<template>
    <div>
      <!-- Notifications Section -->
      <div id="header">
        <style>
        /*v-clock 解决闪烁{{后端参数}}的问题，在id=app的div内声明v-clock即可*/
        [v-clock]{
            display: none;
        }
    </style>
    <!--toggle button start-->
    <!--    <a class="toggle-btn"><i class="fa fa-bars"></i></a>-->
    <a href="/index" :title="msg3" class="toggle-btn2">
  <img src="images/mylogo.png" style="width:200px">
</a>

    <form class="searchform" >
        <input type="text"  class="form-control" name="keyword" placeholder="Search here..."/>
        <a class="toggle-btn"><i class="fa fa-search"></i></a>

    </form>
    <div class="menu-right">
        <ul class="notification-menu">

            <li sec:authorize="isAuthenticated()" >
                <a href="#" class="btn btn-default dropdown-toggle info-number" data-toggle="dropdown">
                    <i style="font-size: 30px;" class="fa fa-bell-o" ></i>
                    <span v-if="notificationsNum!==0" class="badge">{{notificationsNum}}</span>
                </a>
                <div class="dropdown-menu dropdown-menu-head pull-right">
                    <h5 class="mytitle" >
                        你最近有{{notificationsNum}}条通知
                        <a  href="javascript:void(0)" @click="hasRead" >
                            <i v-bind:title="msg2" style="float: right;font-size: 20px" class="fa fa-check-square-o"></i>
                        </a>
                        <a  href="javascript:void(0)" @click="clearAll">
                            <i v-bind:title="msg" style="float: right;font-size: 20px" class="fa fa-trash-o"></i>
                        </a>
                    </h5>
                    <ul  class="dropdown-list normal-list">
                        <li v-for="(notification,index) in notifications">
                            <a :href="notification.url" >
                                <span class="thumb">
                                    <img src="images/photos/user2.png" alt="" />
                                </span>
                                <span class="desc">
                                          <span class="name">
                                              {{notification.notifier}}
                                              <span  style="float: right;color: orange" v-if="index<notificationsNum"><i  class="fa fa-circle"></i></span>
                                          </span>
                                          <span class="msg">
                                              <span>{{notification.msg}}</span>
                                              <span style="float: right" v-text="times[index]"></span>
                                          </span>
                                        </span>
                            </a>
                        </li>
                        <li style="background-color: #fafafa"></li>
                    </ul>
                </div>
            </li>
            <li sec:authorize="isAuthenticated()">
                <a href="#" class="btn btn-default dropdown-toggle " data-toggle="dropdown">
                    <i style="font-size: 30px;" class="fa fa-bars"></i>
                </a>
                <ul  class="dropdown-menu my-dropdown-menu-usermenu pull-right">
                    <li>
                        <a href="/post.html">
                            <i style="font-size: 22px;" class="fa fa-arrow-circle-o-up"></i> 发布作品
                        </a>
                    </li>
                    <li>
                        <a :href="'http://localhost:8080/user/toFocus/'+currentUsername">
                            <i style="font-size: 20px;" class="fa fa-heart"></i> 我的关注
                        </a>
                    </li>
                    <li>
                        <a :href="'http://localhost:8080/user/toFans/'+currentUsername">
                            <i style="font-size: 20px;" class="fa fa-group"></i> 我的粉丝
                        </a>
                    </li>
                    <li>
                        <a :href="'http://localhost:8080/user/toCollection/'+currentUsername">
                            <i style="font-size: 24px;" class="fa fa-star"></i> 我的收藏
                        </a>
                    </li>
                </ul>

            </li>

            <li>
                <a href="#" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                    <img  src="images/photos/user.png" alt="" />
                    <!--获取当前用户名-->
                    <span id="currentUsername" sec:authorize="isAuthenticated()" sec:authentication="name" ></span>
                    <!--                    <span class="caret"></span>-->
                </a>
                <template v-if="isAuthenticated()">
  <ul class="dropdown-menu dropdown-menu-usermenu pull-right">
    <li><a :href="'http://localhost:8080/user/toHome/' + currentUsername"><i style="font-size: 20px;" class="fa fa-user"></i> 个人</a></li>
    <li><a href="#"><i style="font-size: 20px;" class="fa fa-cog"></i> 设置</a></li>
    <li><a href="http://localhost:8080/logout"><i style="font-size: 20px;" class="fa fa-sign-out"></i> 注销</a></li>
  </ul>
</template>
<template v-else>
  <ul class="dropdown-menu dropdown-menu-usermenu pull-right">
    <li><a href="/login.html"><i style="font-size: 20px;" class="fa fa-user"></i> 登录</a></li>
  </ul>
</template>


            </li>

        </ul>
    </div>
      </div>
      
      <!-- User Header Section -->
      <div id="user_header" v-clock class="col-sm-10" style="left: 8.3%">
        <div class="panel">
        <div class="mybackground">
            <br><br><br><br><br><br>
            <div class="panel-body ">
                <div class="media usr-info ">

                    <a href="#" class="pull-left">
                        <img class="thumb" src="images/photos/user4.png" alt=""/>
                    </a>
                    <div class="media-body">
                        <input hidden="hidden" type="text" id="username" th:value="${username}">
                        <h3 style="color: white;font-weight: bold" class="">{{username}}</h3>
                        <span v-if="username===currentUsername">
                        <input class="mysignature" type="text" maxlength="49" @blur="setSignature" placeholder="编写个性签名" v-model="signature"/>
                        </span>
                        <span v-if="username!==currentUsername">
                        <input readonly class="mysignature" style="pointer-events: none" type="text" maxlength="49"  placeholder="这个人很懒，什么都没留下" v-model="signature"/>
                         <span class="subscribe">
                             <a :name="'sub'+username" @click="subscribe($event)"    class="btn btn-danger header_subscribe_btn"  >订阅2.5万</a>
                             <a :name="'un_sub'+username" @click="un_subscribe($event)" class="btn btn-danger header_subscribe_unbtn" >已订阅 2.5万</a>
                         </span>
                        </span>
                    </div>
                </div>

            </div>
        </div>

        <div class="panel-footer custom-trq-footer">
  <ul class="user-states">
    <a :href="'http://localhost:8080/user/toHome/' + username">
      <li :class="activeUrl === 'home.html' ? 'liActive' : 'liNotActive'"><i class="fa fa-home"></i>&nbsp主页</li>
    </a>
    <a :href="'http://localhost:8080/user/toVideos/' + username">
      <li :class="activeUrl === 'videos.html' ? 'liActive' : 'liNotActive'"><i class="fa fa-youtube-play"></i>&nbsp投稿&nbsp<span>127</span></li>
    </a>
    <a :href="'http://localhost:8080/user/toFocus/' + username">
      <li :class="activeUrl === 'focus.html' ? 'liActive' : 'liNotActive'"><i class="fa fa-heart"></i>&nbsp关注&nbsp<span>853</span></li>
    </a>
    <a :href="'http://localhost:8080/user/toFans/' + username">
      <li :class="activeUrl === 'fans.html' ? 'liActive' : 'liNotActive'"><i class="fa fa-users"></i>&nbsp粉丝&nbsp<span>311</span></li>
    </a>
    <a :href="'http://localhost:8080/user/toCollection/' + username">
      <li :class="activeUrl === 'collection.html' ? 'liActive' : 'liNotActive'"><i class="fa fa-star"></i>&nbsp收藏&nbsp<span>127</span></li>
    </a>
  </ul>
</div>

    </div>
   
      </div>
  
      <!-- Footer -->
      <footer style="text-align: right; border:none; background:transparent; position: fixed">
        2021 &copy; LangV by <a href="http://www.mycodes.net/" target="_blank">JxHub</a>
      </footer>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios'
  import moment from 'moment'
  
  const currentUsername = $("#currentUsername").text()
  
  const header = Vue.ref({
    notifications: [],
    notificationsNum: 0,
    times: [],
    msg: '清空通知栏消息',
    msg2: '点击已读',
    msg3: '返回首页',
    currentUsername
  })
  
  const userHeader = Vue.ref({
    signature: '',
    avatar: '',
    username: currentUsername
  })
  
  onMounted(() => {
    moment.locale('zh-cn')
    axios.get('http://localhost:8080/notification/getNotifications/' + currentUsername).then(res => {
      if (res.data !== null) {
        header.notifications = res.data
        res.data.forEach(subscribe => {
          let timeDif = moment(subscribe.notify_time).startOf('minute').fromNow()
          if (timeDif.indexOf("月") !== -1 || timeDif.indexOf("年") !== -1) {
            header.times.push(moment(subscribe.notify_time).format("YYYY-MM-DD"))
          } else {
            header.times.push(timeDif)
          }
        })
      }
    })
    axios.get('http://localhost:8080/notification/getNotificationsNum/' + currentUsername).then(res => {
      if (res.data !== null) {
        header.notificationsNum = res.data
      } else {
        header.notificationsNum = 0
      }
    })
  
    axios.get('http://localhost:8080/user/getUsersInfo/' + userHeader.username).then(res => {
      if (res.data.signature) {
        userHeader.signature = res.data.signature
      }
    })
  })
  
  function clearAll() {
    axios.get('http://localhost:8080/notification/clearNotifications/' + currentUsername).then(() => {
      header.notifications = []
      hasRead()
    })
  }
  
  function hasRead() {
    axios.get('http://localhost:8080/notification/clearNotificationsNum/' + currentUsername).then(() => {
      header.notificationsNum = 0
    })
  }
  
  function setSignature() {
    if (userHeader.signature === '') {
      axios.get('http://localhost:8080/user/deleteSignature/' + currentUsername)
    } else {
      axios.get('http://localhost:8080/user/setSignature/' + currentUsername + "/" + userHeader.signature)
    }
  }
  
  function subscribe(event) {
    if (currentUsername!=="") {
                        //通过传入参数名字获取特定标签
                        $("[name='" + event.target.name + "']").css('display', 'none');
                        $("[name='" + "un_" + event.target.name + "']").css('display', 'inline');
                        //切割subxxx为成为xxx然后传入订阅接口
                        var youtuberName = (event.target.name).slice(3)
                        /*两个定时方法的解释
                       1、 clearTimeout(this.timer)：当上面事件下来时，把唯一的timer清除，即置零
                       2、 this.timer = setTimeout(() =>{···},1000):
                           此时timer开始计时，计到1s时就开始执行大括号里面的函数;
                           如多次点击，那么就会不断触发上面的clearTimeout函数，
                           又会把timer给置零了,又重新计时。所以只有最后一次点击有效
                     */
                        clearTimeout(this.timer);
                        this.timer = setTimeout(() => {
                            axios.get('http://localhost:8080/subscription/subscribe/' + youtuberName).then(res => {
                                console.log("订阅成功");
                            })
                        }, 1000)
                    }else {
                        alert("请先登录")
                    }
  }
  
  function unsubscribe(event) {
    $("[name='"+event.target.name+"']").css('display', 'none');
                    //将un_subxxx切割成subxxx使订阅按钮显示
                    var subName=(event.target.name).slice(3);
                    $("[name='"+subName+"']").css('display', 'inline');
                    //再把subxxx切割成xxx传入取消订阅接口
                    var youtuberName=subName.slice(3);
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        axios.get('http://localhost:8080/subscription/undo_subscribe/' + youtuberName).then(res => {
                            console.log("取消订阅成功");
                        })
                    }, 1000)
  }
  </script>
  
  <style scoped>
    /* Add your CSS styling here */
  </style>
  