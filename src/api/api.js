import { AuthApi } from "./authorizatoin";
import { LocalMazeManager } from "../localStorage/localMazes";
import { MazeApi } from "./mazes";
import { ApiUtils } from "./utils";

export const Api = {

    ...ApiUtils,
    ...MazeApi,
    ...AuthApi,

};
