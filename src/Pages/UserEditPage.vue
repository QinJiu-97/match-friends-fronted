<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editUser.currentValue "
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        确认修改
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../Plugins/my-axios";
import {useRouter} from "vue-router/dist/vue-router";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user";


const route = useRoute();
const router = useRouter();

const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue,
})

const onSubmit = async () => {
  const currentUser = await getCurrentUser();

  if(!currentUser){
    Toast.fail("用户未登录");
    return;
  }
  console.log(editUser.value,"当前用户信息")
  const res = await myAxios.post("/user/update", {
    'id': currentUser.id,
    [editUser.value.editKey as string]: editUser.value.currentValue,
  })
  console.log(res,"更新请求");
  if(res.code === 0 && res.data > 0){
    Toast.success("修改成功");
    router.back();
  }else {
    Toast.fail("修改失败");
  }
};

</script>

<style scoped>

</style>