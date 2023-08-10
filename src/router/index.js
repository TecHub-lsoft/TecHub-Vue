// 路由文件的入口

// 引入
import {createRouter, createWebHashHistory} from 'vue-router'

import Login from '@/views/main/login.vue'
import Main from '@/views/main/index.vue'
import Register from '@/views/main/register.vue'
import Manager from '@/views/main/manager.vue'

// 配置 定义映射关系 地址和组件的映射对应关系
const routes = [
	{
		path: '/login',  // 请求路径
		component: Login   // 组件的引用: 静态引用
	},
	
	{
		path: '/register',  // 请求路径
		component: Register   // 组件的引用: 静态引用
	},
	{
		path: '/manager',  // 请求路径
		component: Manager   // 组件的引用: 静态引用
	},
	{
		path: '/main',
		component: () => Main  //懒加载，请求这个路径时再加载页面
	},
	{
	    path:'/',
	    redirect:'/login'　　//默认显示
	 }
]


// 创建路由实例
const router = createRouter({
	history: createWebHashHistory(), // 模式
	routes,  // : routes  
	// ES6规范, 键值如果键和值名称相同可以省略 :键值
	
})
export default router