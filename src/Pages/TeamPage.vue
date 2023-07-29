<template>
  <div id="teamPage">
    <van-search v-model="searchText" @search="onSearch" placeholder="请输入搜索队伍"/>

    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public"/>
      <van-tab title="加密" name="encryption"/>

    </van-tabs>
    <team-card-list :teamList="teamList"/>

    <van-empty v-if="teamList?.length < 1" description="数据为空"/>

  </div>
  <van-sticky :offset-bottom="70" position="bottom">
    <van-button style="margin-left: 83% ; border-radius: 50%; height: 50px; width: 50px"
                type="primary"
                icon="plus"
                @click="doCreateTeam"/>
  </van-sticky>

</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../Plugins/my-axios";
import {Toast} from "vant";

const router = useRouter();
const searchText = ref('');
const teamList = ref([]);
const active = ref('public');


//跳转到队伍创建页
const doCreateTeam = () => {
  router.push({
    path: '/team/add',
  })
}


const listTeam = async (val: string | undefined, status: number | undefined) => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      pageNum: 1,
      teamStatus: status
    }

  });
  if (res.code === 0) {
    teamList.value = res.data;
  } else {
    Toast.fail("获取列表失败，请刷新重试！")
  }
}

//页面加载时只触发一次
onMounted(() => {
  listTeam();
})

const onSearch = (val) => {
  listTeam(val);
}

/**
 * 查找不同类型的队伍
 * @param name
 */
const onTabChange = (name) => {
  //查公开队伍
  if (name === 'public') {
    listTeam(searchText.value, 0);
  } else {
    // 查加密队伍
    listTeam(searchText.value, 2);

  }
}

</script>

<style scoped>

</style>