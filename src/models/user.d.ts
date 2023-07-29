/**
 * 用户类别
 */
export type UserType = {
    id: number;
    planetCode: string;
    username: string;
    userAccount: string;
    profile?: string;
    avatarUrl?: string;
    gender: number;
    phone: string;
    email: string;
    userStatus: number;
    userRole: number;
    tag: string[];
    createTime: Date;

};