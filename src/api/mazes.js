import { Api } from './api';

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
                getMazeById(mazeId: ${id}) {
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
                    userPath {
                        points
                        isMazeCompleted
                    }
                }
            }
        `);
        return response?.data?.getMazeById || null;
    },

    async getMazesByUser(userId, pivotId, pageNum, pageSize) {
        const response = await Api.graphqlQuery(`
            query {
                getMazesByUser(userId: ${userId}, pivotId: ${pivotId}, pageNum: ${pageNum}, pageSize: ${pageSize}) {
                    id
                    algorithm
                    author {
                        nickname
                    }
                    startX
                    startY
                    finishX
                    finishY
                    genDate
                    genDurationMs
                    grid
                    userPath {
                        points
                        isMazeCompleted
                    }
                }
            }
        `);
        return response?.data?.getMazesByUser || null;
    },

    async getRecentMazes(pivotId, pageNum, pageSize) {
        const response = await Api.graphqlQuery(`
            query {
                getRecentMazes(pivotId: ${pivotId}, pageNum: ${pageNum}, pageSize: ${pageSize}) {
                    id
                    algorithm
                    author {
                        nickname
                    }
                    startX
                    startY
                    finishX
                    finishY
                    genDate
                    genDurationMs
                    grid
                    userPath {
                        points
                        isMazeCompleted
                    }
                }
            }
        `);
        return response?.data?.getRecentMazes || null;
    },

    async savePath(mazeId, points) {
        const response = await Api.graphqlQuery(`
            mutation {
                saveMazePath(points: ${JSON.stringify(points)}, mazeId: ${mazeId})
            }
        `);
        return response?.data?.saveMazePath || null;
    },

    async submitMazeCompletion(mazeId, points) {
        const response = await Api.graphqlQuery(`
            mutation {
                submitMazeCompletion(points: ${JSON.stringify(points)}, mazeId: ${mazeId}) {
                    isMazeCompleted
                    completionDate
                }
            }
        `);
        return response?.data?.submitMazeCompletion || null;
    }
};
