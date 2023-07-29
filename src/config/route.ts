//  定义一些路由
import Index from "../Pages/IndexPage.vue";
import UserPage from "../Pages/UserPage.vue";
import UserUpdatePage from "../Pages/UserUpdatePage.vue";
import UserTeamCreatePage from "../Pages/UserTeamCreatePage.vue";
import UserTeamJoinPage from "../Pages/UserTeamJoinPage.vue";
import SearchPage from "../Pages/SearchPage.vue";
import UserEditPage from "../Pages/UserEditPage.vue";
import SearchResultPage from "../Pages/SearchResultPage.vue";
import UserLogin from "../Pages/UserLogin.vue";
import TeamAddPage from "../Pages/TeamAddPage.vue";
import TeamUpdatePage from "../Pages/TeamUpdatePage.vue";
import TeamPage from "../Pages/TeamPage.vue";
import RegisterPage from "../Pages/UserRegister.vue";


const routes = [
    {path: '/', component: Index},
    {path: '/team', title: '找伙伴', component: TeamPage},
    {path: '/team/add', title: '创建队伍', component: TeamAddPage},
    {path: '/team/update', title: '更新队伍', component: TeamUpdatePage},
    {path: '/user', title: '用户', component: UserPage},
    {path: '/search', title: '查找伙伴', component: SearchPage},
    {path: '/user/edit', title: '用户信息编辑', component: UserEditPage},
    {path: '/user/list', title: '搜索结果', component: SearchResultPage},
    {path: '/user/login', title: '用户登录', component: UserLogin},
    {path: '/user/update', title: '用户信息更改', component: UserUpdatePage},
    {path: '/user/team/create', title: '我创建的队伍', component: UserTeamCreatePage},
    {path: '/user/team/join', title: '我加入的队伍', component: UserTeamJoinPage},
    {path: '/register', title: '用户注册', component: RegisterPage},

]
export default routes;