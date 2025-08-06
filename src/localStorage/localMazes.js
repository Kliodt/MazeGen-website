

let localMazes = null;
const MAX_MAZES_LIMIT = 20;

const loadLocalMazes = () => {
    if (localMazes === null) {
        const stored = localStorage.getItem('localMazes');
        localMazes = stored ? JSON.parse(stored) : {};
        
        if (!localMazes.mazes) localMazes.mazes = {};
        if (!localMazes.order) localMazes.order = [];
        if (!localMazes.nextId) localMazes.nextId = 1;
    }
    return localMazes;
}

const saveLocalMazes = () => {
    if (localMazes) {
        localStorage.setItem('localMazes', JSON.stringify(localMazes));
    }
}

const generateId = () => {
    const data = loadLocalMazes();
    return data.nextId++;
}

const removeOldestMaze = () => {
    const data = loadLocalMazes();
    if (data.order.length > 0) {
        const oldestId = data.order.shift();
        delete data.mazes[oldestId];
    }
}

const enforceLimit = () => {
    const data = loadLocalMazes();
    while (data.order.length > MAX_MAZES_LIMIT) {
        removeOldestMaze();
    }
}

export const LocalMazeManager = {

    /**
     * Получить лабиринт по ID
     */
    getLocalMaze(id) {
        const data = loadLocalMazes();
        return data.mazes[id] || null;
    },

    /**
     * Сохранить лабиринт в локальное хранилище
     * @returns {number} - Присвоенный ID
     */
    saveLocalMaze(maze) {
        const data = loadLocalMazes();
        const id = generateId();
        
        data.mazes[id] = maze;
        data.order.push(id);
        
        enforceLimit();
        saveLocalMazes();
        
        return id;
    },

    /**
     * Получить все сохраненные лабиринты
     * @returns {Array} - Массив всех лабиринтов
     */
    getAllMazes() {
        const data = loadLocalMazes();
        return Object.values(data.mazes);
    },

    /**
     * Получить список ID всех лабиринтов в порядке сохранения (от старых к новым)
     * @returns {Array} - Массив ID
     */
    getMazeIds() {
        const data = loadLocalMazes();
        return [...data.order];
    },

    /**
     * Удалить лабиринт по ID
     * @returns {boolean} - true если удален, false если не найден
     */
    deleteMaze(id) {
        const data = loadLocalMazes();
        
        if (data.mazes[id]) {
            delete data.mazes[id];
            const orderIndex = data.order.indexOf(Number(id));
            if (orderIndex > -1) {
                data.order.splice(orderIndex, 1);
            }
            saveLocalMazes();
            return true;
        }
        
        return false;
    },

    /**
     * Обновить существующий лабиринт
     * @returns {boolean} - true если обновлен, false если не найден
     */
    updateMaze(id, mazeUpdate) {
        const data = loadLocalMazes();
        
        if (data.mazes[id]) {
            data.mazes[id] = mazeUpdate;
            saveLocalMazes();
            return true;
        }
        
        return false;
    },

    /**
     * Очистить все сохраненные лабиринты
     */
    clearAllMazes() {
        localMazes = { mazes: {}, order: [], nextId: 1 };
        saveLocalMazes();
    },

    /**
     * Получить информацию о состоянии хранилища
     * @returns {Object} - Статистика хранилища
     */
    getStorageInfo() {
        const data = loadLocalMazes();
        return {
            count: data.order.length,
            limit: MAX_MAZES_LIMIT,
            nextId: data.nextId,
            oldestMazeId: data.order.length > 0 ? data.order[0] : null,
            newestMazeId: data.order.length > 0 ? data.order[data.order.length - 1] : null
        };
    }
}