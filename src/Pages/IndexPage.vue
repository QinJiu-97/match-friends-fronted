<template>
  <van-cell center title="匹配模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24"/>
    </template>
  </van-cell>

  <user-card-list :user-list="userList" :loading="loading"/>


  <van-empty v-if="!userList || userList.length < 1" description="数据为空"/>
</template>

<script setup lang="ts">
import {onMounted, ref, watchEffect} from 'vue';
import {useRoute} from "vue-router";
import myAxios from "../Plugins/my-axios";
import {Toast} from "vant";
import UserCardList from "../components/UserCardList.vue";

const userList = ref([]);

const isMatchMode = ref<boolean>(false);

const loading = ref(false);

const route = useRoute();

const {tags} = route.query;


const loadData = async () => {
  let userListData;
  loading.value = true;
  if (isMatchMode.value) {
    const num1 = 8;
    userListData = await myAxios.get('/user/match', {
      params: {
        n: num1,
      },
    })
        .then(function (response) {
          console.log("/user/match success", response);
          Toast.success("请求成功");
          return response?.data;
        })
        .catch(function (error) {
          console.error("/user/match error", error);
          Toast.fail("请求失败")
        });

  } else {
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: 8,
        pageNum: 1,
      },
    })
        .then(function (response) {
          console.log("/user/recommend success", response);
          Toast.success("请求成功");
          return response?.data?.records;
        })
        .catch(function (error) {
          console.error("/user/recommends error", error);
          Toast.fail("请求失败")
        });
  }
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
}

watchEffect(() => {
  loadData()
})

</script>

<style scoped>

</style>