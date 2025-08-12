import { Api } from './api';

export const UserApi = {
    async getUserInfo(id) {
        const response = await Api.graphqlQuery(`
            query {
                getUserById(userId: ${id}) {
                    nickname
                    profilePictureUrl
                    registrationDate
                }
            }
        `);
        return response?.data?.getUserById || null;
    },

    async getCurrentUserInfo() {
        let id = Api.getCurrentUserId();
        if (id == null) return null;
        return await this.getUserInfo(id);
    }
};
