import { useEffect, useMemo, useState } from 'react';
import { Api } from '../../api/api';
import MazeCard from '../maze-board/MazeCard';
import { Button, Flex } from 'antd';

const MazeList = ({ userId, pageSize = 10 }) => {
    const [state, setState] = useState({
        pages: {},
        pivotId: 0,
        hasMore: true,
        pagesDisplayedNow: 0,
        isLoading: false
    });

    const loadPage = pageNum => {
        if (!state.hasMore) return;

        setState(st => ({ ...st, isLoading: true }));

        const mazesPromise = userId
            ? Api.getMazesByUser(userId, state.pivotId, pageNum, pageSize)
            : Api.getRecentMazes(state.pivotId, pageNum, pageSize);

        mazesPromise
            .then(newMazes => {
                if (newMazes.length !== pageSize) {
                    setState(st => ({ ...st, hasMore: false }));
                }
                setState(st => {
                    const pages = st.pages;
                    pages[pageNum] = newMazes;
                    return {
                        ...st,
                        pages: { ...pages },
                        pagesDisplayedNow: Object.keys(pages).length
                    };
                });
            })
            .catch(err => console.log(err))
            .finally(() => setState(st => ({ ...st, isLoading: false })));
    };

    useEffect(() => {
        // load page 0
        const mazesPromise = userId
            ? Api.getMazesByUser(userId, 2_000_000_000, 0, pageSize)
            : Api.getRecentMazes(2_000_000_000, 0, pageSize);

        mazesPromise
            .then(newMazes => {
                if (newMazes.length !== pageSize) {
                    setState(st => ({ ...st, hasMore: false }));
                }
                setState(st => ({
                    ...st,
                    pages: {
                        0: newMazes
                    },
                    pagesDisplayedNow: 1,
                    pivotId: newMazes[0].id
                }));
            })
            .catch(err => console.log(err));
    }, [pageSize, userId]);

    // Optimization for rerenders. MazeCard is also optimized and renders only once
    const content = useMemo(() => {
        const result = [];
        for (let i = 0; i < state.pagesDisplayedNow; i++) {
            const page = state.pages[i];
            if (page) {
                page.forEach(maze => {
                    result.push(
                        <MazeCard
                            key={maze.id}
                            maze={maze}
                            path={maze?.userPath?.points}
                            isMazeCompleted={maze?.userPath?.isMazeCompleted}
                        />
                    );
                });
            }
        }
        return result;
    }, [state.pages, state.pagesDisplayedNow]);

    return (
        <div style={{ marginBottom: 96 }}>
            <Flex wrap justify='center' gap={8} style={{ margin: 8 }}>
                {content}
            </Flex>
            {!state.hasMore || state.pagesDisplayedNow === 0 ? null : (
                <Flex justify='center'>
                    <Button
                        onClick={() => loadPage(state.pagesDisplayedNow)}
                        loading={state.isLoading}
                        iconPosition='end'
                    >
                        Загрузить еще
                    </Button>
                </Flex>
            )}
        </div>
    );
};

export default MazeList;
