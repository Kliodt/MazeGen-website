import { AuthApi } from "./authorizatoin";
import { MazeApi } from "./mazes";
import { ApiUtils } from "./utils";
import { UserApi } from "./user";

export const Api = {

    ...ApiUtils,
    ...MazeApi,
    ...AuthApi,
    ...UserApi

};
