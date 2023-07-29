<template>
  <div id="teamCardList">
    <van-card
        v-for="team in props.teamList"
        :thumb="team.createUser.avatarUrl"
        :desc="team.teamDesc"
        :title="`${team.teamName}`"

    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px ; margin-top: 8px">
          {{ teamConstantEnum[team.teamStatus] }}
        </van-tag>

      </template>
      <template #bottom>
        <div>
          {{ '队伍人数: ' + team.hasJoinNum + '/' + team.maxNum }}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间: ' + team.expireTime }}
        </div>
        <div>
          {{ '创建时间: ' + team.createTime }}
        </div>
      </template>
      <template #footer>
        <van-button size="small" plain type="primary"
                    v-if="team.createUser.id !== currentUser?.id && !team.hasJoin"
                    @click="preJoinTeam(team)">加入队伍
        </van-button>
        <van-button v-if="team.createUser.id === currentUser?.id" size="small" plain
                    @click="doUpdateTeam(team.teamId)">更新队伍
        </van-button>
        <van-button size="small" plain
                    v-if="team.createUser.id === currentUser?.id" type="danger"
                    @click="doDeleteTeam(team.teamId)">解散队伍
        </van-button>
        <van-button size="small" plain
                    v-if="team.createUser.id !== currentUser?.id && team.hasJoin" type="warning"
                    @click="doQuitTeam(team.teamId)">退出队伍
        </van-button>
      </template>

    </van-card>

    <van-popup v-model:show="show" style="width: 100%; height: 30%;" @closed="doJoinTeam">
      <!-- 密码输入框 -->
      <van-password-input style="padding-top: 50px"
                          :value="pwd"
                          info="请输入房间密码"
                          :focused="show"
                          length="4"
                          @focus="show"
      />

    </van-popup>

    <!-- 数字键盘 -->
    <van-number-keyboard
        v-model="pwd"
        :show="show"
        theme="custom"
        z-index="9999"
        maxlength="4"
        close-button-text="完成"
        @blur="show = false"
        @hide="doJoinCancel"
    />
  </div>


</template>

<script setup lang="ts">
import {TeamType} from "../models/Team";
import {teamConstantEnum} from "../Constant/team";
import myAxios from "../Plugins/my-axios";
import {Dialog, Toast} from "vant";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
import {useRouter} from "vue-router";

interface TeamCardListProps {

  teamList: TeamType[];
}

const router = useRouter();
const show = ref(false);
const currentUser = ref();
const pwd = ref('')
const joinTeamId = ref();

const props = withDefaults(defineProps<TeamCardListProps>(), {
  // @ts-ignore
  teamList: [] as TeamType[],
});


onMounted(async () => {
  currentUser.value = await getCurrentUser();

})


const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.teamId;
  if (team.teamStatus === 2) {
    show.value = true;
  } else {
    doJoinTeam();
  }
}

const doJoinCancel = () => {
  joinTeamId.value = 0;
  pwd.value = '';
}

/**
 * 加入队伍
 */
const doJoinTeam = async () => {


  if (!joinTeamId.value) {
    return;
  }
  const res = await myAxios.post('/team/join', {
    teamId: joinTeamId.value,
    teamPassword: pwd.value,
  })
  if (res?.code === 0) {
    Toast.success('加入队伍成功');
    location.reload()
  } else {
    Toast.fail((res.description ? `${res.description}` : ""));
  }

}

/**
 * 跳转到更新队伍页面
 * @param id
 */
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}

/**
 * 处理退出队伍
 * @param teamId
 */
const doQuitTeam = async (teamId: number) => {
  const res = await myAxios.delete('/team/quit', {
    data: {
      teamId: teamId
    }
  })
  if (res?.code === 0) {
    Toast.success('操作成功');
    location.reload();
  } else {
    //
    Toast.fail('操作失败' + (res.description ? `${res.description}` : ""));
  }
}

/**
 * 处理解散队伍
 * @param teamId
 */
const doDeleteTeam = async (teamId: number) => {
  const res = await myAxios.delete('/team/delete', {
    params: {
      teamId: teamId
    }
  })
  if (res?.code === 0) {
    Toast.success('操作成功');
    location.reload()
  } else {
    Toast.fail('操作失败' + (res.description ? `${res.description}` : ""));
  }
}

</script>

<style scoped>

</style>