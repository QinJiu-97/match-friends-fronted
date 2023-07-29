import myAxios from "../Plugins/my-axios";
import {getCurrentState, setCurrentState} from "../states/user";

export const getCurrentUser = async () => {
    // const currentUser = getCurrentState()
    // if (currentUser) {
    //     return currentUser;
    // }
    //不存在则从远程获取
    const res = await myAxios.get("/user/current");
    // @ts-ignore
    if (res.code === 0) {
        setCurrentState(res.data);
        return res.data;
    }
    return null;
}