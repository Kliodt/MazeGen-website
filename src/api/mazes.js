import { Api } from "./api";


export const MazeApi = {

    async generateNewMaze(algorithmKeyStr, width, height) {
        const response = await Api.graphqlQuery(`
            mutation {
                generateMaze(
                    parameters: { width: ${width} height: ${height} algorithmKeyStr: "${algorithmKeyStr}" }
                ) {
                    errorCode
                    errorDescription
                    maze {
                        id
                        algorithm
                        author {
                            id
                            nickname
                            profilePictureUrl
                        }
                        startX
                        startY
                        finishX
                        finishY
                        genDate
                        genDurationMs
                        grid
                    }
                }
            }
        `);
        return response?.data?.generateMaze;
    },


    async getMazeById(id) {
        const response = await Api.graphqlQuery(`
            query {
                getMazeById(${id}) {
                    id
                    algorithm
                    author {
                        id
                        nickname
                        profilePictureUrl
                    }
                    startX
                    startY
                    finishX
                    finishY
                    genDate
                    genDurationMs
                    grid
                }
            }
        `);
        return response?.data?.getMazeById || null;
    },


    async getMazesByUser(userId) {
        const response = await Api.graphqlQuery(`
            query {
                getMazesByUser(${userId}) {
                    id
                    algorithm
                    author {
                        id
                        nickname
                        profilePictureUrl
                    }
                    startX
                    startY
                    finishX
                    finishY
                    genDate
                    genDurationMs
                    grid
                }
            }
        `);

        // todo: rest of the function
    },

    async getMazesByMe() {
        const me = Api.getCurrentUserId();
        return await this.getMazesByUser(me);
    }
}
