import {UserType} from "../models/user";

let current: UserType;

const setCurrentState = (user: UserType) => {
    current = user;
}
const getCurrentState = (): UserType => {
    return current;
}

export  {
    setCurrentState,
    getCurrentState,
}