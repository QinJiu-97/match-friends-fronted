<template>
<user-card-list :user-list = "userList"/>

  <van-empty v-if="!userList || userList.length < 1" description="暂无符合该条件用户" />
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import myAxios from "../Plugins/my-axios";
import {Toast} from "vant";
import qs from "qs"
import UserCardList from "../components/UserCardList.vue";


const userList = ref([]);

onMounted(async () => {
  // Optionally the request above could also be done as
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags

    },
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  })
      .then(function (response) {
        console.log("/user/search/tags success", response);
        Toast.success("请求成功");
        return response?.data;
      })
      .catch(function (error) {
        console.error("/user/search/tags error", error);
        Toast.fail("请求失败")
      });
  if (userListData) {
    userListData.forEach(user =>{
      if(user.tags){
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
})

const route = useRoute();

const {tags} = route.query;

// const mockUser = {
//   id: 1,
//   planetCode: 123,
//   username: 'qinjiiu123',
//   userAccount: 'dfadfa',
//   profile: '这是个人简介哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
//   avatarUrl: 'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/285/picture微信图片_20220330160120.jpg',
//   gender: '男',
//   phone: '12345345345',
//   email: '1231.com',
//   tags: ['java', 'c++', '大三', '男', '刷题'],
//   createTime: new Date(),
// }


</script>

<style scoped>

</style>