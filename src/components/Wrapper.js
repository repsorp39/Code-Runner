import React from 'react';
import { useGlobalContext } from '../context/context';

const Wrapper = ({ children}) => {
   const { isDarkMode } = useGlobalContext();
    return (
        <main className={isDarkMode ? "dark-theme": "light-theme" }>
            { children }
        </main>
    );
};

export default Wrapper;