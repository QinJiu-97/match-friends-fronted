/**
 * 队伍类别
 */
import {UserType} from "./user";

export type TeamType = {
    teamId: number,
    expireTime?: Date,
    maxNum: number,
    teamDesc: string,
    teamName: string,
    teamPassword: string,
    //todo 定义枚举类型更规范
    teamStatus: number,
    createTime: Date,
    updateTime: Date,
    createUser: UserType,
    hasJoin: boolean,
    hasJoinNum?: number,
};