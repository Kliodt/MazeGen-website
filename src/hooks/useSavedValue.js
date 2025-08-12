import { useState } from 'react';


const useSavedValue = (key, defaultValue) => {
    const getStoredValue = () => {
        const item = localStorage.getItem(key);
        return item !== null ? JSON.parse(item) : defaultValue;
    };

    const [savedValue, setSavedValueState] = useState(getStoredValue);

    const setSavedValue = val => {
        const valueToStore = typeof val === 'function' ? val(savedValue) : val;
        setSavedValueState(valueToStore);
        localStorage.setItem(key, JSON.stringify(valueToStore));
    };

    return [savedValue, setSavedValue];
};

export default useSavedValue;
