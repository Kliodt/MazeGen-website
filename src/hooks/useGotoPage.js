import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Hook similar to useNavigate, but it doesn't adds new page entry
 * to the history if the page is already open.
 */
const useGotoPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (to, options = {}) => {
        const currentUrl = location.pathname;
        // const currentUrl = location.pathname + location.search;
        if (currentUrl !== to) {
            navigate(to, options);
        } else {
            navigate(to, { replace: true, ...options });
        }
    };
};

export default useGotoPage;
