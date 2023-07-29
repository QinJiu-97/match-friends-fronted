<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
          v-model="checkPassword"
          type="password"
          name="checkPassword"
          label="确认密码"
          placeholder="请再次输入密码"
          :rules="[{ required: true, message: '请确认密码' }]"
      />
      <van-field
          v-model="planetCode"
          name="planetCode"
          label="学号"
          placeholder="请输入学号"
          :rules="[{ required: true, message: '请填写学号' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        注册                                             
      </van-button>
    </div>                     

  </van-form>


</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../Plugins/my-axios";
import {Toast} from "vant";

const router = useRouter();
const route = useRoute();
const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('');
const planetCode = ref('');
const onSubmit = async () => {
  const res = await myAxios.post("/user/register",{
    userAccount: userAccount.value,
    userPassword: userPassword.value,
    checkPassword: checkPassword.value,
    planetCode: planetCode.value,
  })
  console.log(res,"用户注册");
  if(res.code === 0 && res.data ){
    Toast.success("注册成功");
    // 注册成功跳转到之前的页面
    window.location.href = route.query?.redirect as string ?? '/';
  }else {
    Toast.fail("注册失败");
  }
};

</script>

<style scoped>

</style>