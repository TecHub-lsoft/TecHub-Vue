<template>
    <div class="error-page">
      <section>
        <div class="container">
          <section class="error-wrapper text-center">
            <h1><img alt="" :src="imageSrc"></h1>
            <h2>OOOPS!!!</h2>
            <h3>服务器开小差了，请稍后访问</h3>
            <!-- <h3>{{ message }}</h3> -->
            <p class="nrml-txt">Why not try refreshing your page? Or you can <a href="#">contact our support</a> if the problem persists.</p>
            <a class="back-btn" href="/">回到首页</a>
          </section>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // 页面相关数据，可能需要从外部传入
  const status = ref('500'); // 根据实际情况修改
  const imageSrc = '/images/500-error.png'; // 根据实际情况修改
  // const message = '您可以添加错误信息'; // 根据需要取消注释并修改
  
  // 可能需要从外部导入其他需要的资源和模块
  </script>
  
  <style scoped>
  /* 样式将在组件内部生效 */
  </style>
  