<template>
  <div id="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.teamName"
            name="teamName"
            label="队伍名称"
            placeholder="队伍名"
            :rules="[{ required: true, message: '请填写队伍名' }]"
        />
      </van-cell-group>
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.teamDesc"
            rows="4"
            autosize
            label="队伍描述"
            type="textarea"
            placeholder="请输入队伍描述"
        />
        <van-field
            v-model="addTeamData.expireTime"
            is-link
            readonly
            name="expireTime"
            label="过期时间"
            :placeholder="addTeamData.expireTime??'点击选择时间'"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-datetime-picker
              type="date"
              @confirm="onConfirm"
              @cancel="showPicker = false"
              :min-data="minDate"
          />
        </van-popup>

        <van-field name="stepper" label="最大人数">
          <template #input>
            <van-stepper v-model="addTeamData.maxNum" max="10" min="2"/>
          </template>
        </van-field>

        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="addTeamData.teamStatus" direction="horizontal">
              <van-radio name='0' >公开</van-radio>
              <van-radio name='1'>私有</van-radio>
              <van-radio name='2'>加密</van-radio>
            </van-radio-group>

          </template>
        </van-field>
        <van-field
            v-if="addTeamData.teamStatus === '2'"
            v-model="addTeamData.teamPassword"
            type="password"
            name="userPassword"
            label="队伍密码"
            maxlength="4"
            placeholder="请输入密码(4位)"
            :rules="[{ required: true, message: '请填写密码' }]"

        />
      </van-cell-group>


      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>

</template>

<script setup lang="ts">

import {ref} from "vue";
import myAxios from "../Plugins/my-axios";
import {Toast} from "vant";
import {useRouter} from "vue-router";

const router = useRouter();

const initFormData = {
  "expireTime": null,
  "maxNum": 5,
  "teamDesc": "",
  "teamName": "",
  "teamPassword": "",
  "teamStatus": 0,

}
//需要用户填写的数据对象
const addTeamData = ref({...initFormData});

const showPicker = ref(false);
const minDate = new Date();

const onConfirm = (value) => {

  addTeamData.value.expireTime = JSON.parse(JSON.stringify(value));
  showPicker.value = false;
};


const onSubmit = async () => {
  const res = await myAxios.post("/team/add", addTeamData.value)
  console.log("过期时间", addTeamData.value.expireTime);
  if (res.code === 0 && res.data) {
    Toast.success("添加成功");
    router.replace('/team');
  } else {
    Toast.fail("添加失败");
  }
};


</script>

<style scoped>

</style>