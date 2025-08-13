import { AuthApi } from './authorizatoin';
import { MazeApi } from './mazes';
import { UserApi } from './user';
import { ApiUtils } from './utils';

export const Api = {
    ...ApiUtils,
    ...MazeApi,
    ...AuthApi,
    ...UserApi
};
