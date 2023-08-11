<template>
    <div class="error-page">
      <section>
        <div class="container">
          <section class="error-wrapper text-center">
            <h1><img alt="" :src="imageSrc"></h1>
            <h2>抱歉，找不到该页面</h2>
            <!-- <h2>{{ message }}</h2> -->
            <a class="back-btn" href="/">回到首页</a>
          </section>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // 页面相关数据，可能需要从外部传入
  const status = ref('404'); // 根据实际情况修改
  const imageSrc = '/images/404-error.png'; // 根据实际情况修改
  // const message = '您可以添加错误信息'; // 根据需要取消注释并修改
  
  // 可能需要从外部导入其他需要的资源和模块
  </script>
  
  <style scoped>
  /* 样式将在组件内部生效 */
  </style>
  