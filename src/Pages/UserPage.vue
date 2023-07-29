<template>
  <template v-if="user">

    <van-cell title="当前用户" :value="user?.username"/>
    <van-cell title="修改信息" is-link to="/user/update"/>
    <van-cell title="我创建的队伍" is-link to="/user/team/create"/>
    <van-cell title="我加入的队伍" is-link to="/user/team/join"/>
    <van-button size="large" round type="danger" @click="handleLogout">退出登录</van-button>

  </template>


<!--  <a href="http://beian.miit.gov.cn/" class="icp">黔ICP备2023001444号-1</a>-->

</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
import {useRoute} from "vue-router";
import MyAxios from "../Plugins/my-axios";
import axios from "axios";


const user = ref()

onMounted(async () => {
  user.value = await getCurrentUser();

})

const router = useRouter();
const route = useRoute();
const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }

  })

}

const handleLogout = () => {
  MyAxios.post('/user/logout');

  router.push('/');
  window.location.reload();
}

</script>

<style scoped>

</style>