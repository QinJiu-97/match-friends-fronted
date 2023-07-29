<template>
  <van-nav-bar
      :title=title
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>
  <div id="content">
    <router-view/>
  </div>

  <van-tabbar route @change="onChange">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍页</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">

import {Toast} from "vant";
import {useRouter} from "vue-router";
import {ref} from "vue";
import routes from "../config/route";

const router = useRouter();
const default_title = '伙伴匹配';
const title = ref(default_title);

router.beforeEach((to, from) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath == route.path;
  })
  title.value = route?.title ?? default_title;
})


const onClickLeft = () => {
  router.back();

}
const onClickRight = () => {
  // 字符串路径
  router.push('/search');
}

// const active = ref("index");
// const onChange = (index) => Toast(`标签 ${index}`);



</script>

<style scoped>
#content {
  padding-bottom: 50px;
}
</style>