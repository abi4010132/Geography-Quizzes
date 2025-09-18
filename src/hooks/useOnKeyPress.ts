import { useEffect } from 'react';

export const useOnKeyPress = (callback: Function, targetKey: string) => {
    useEffect(() => {
        console.log("key")
        const keyPressHandler = (e: KeyboardEvent) => {
            if (e.key === targetKey){
                callback();
            }
        };
        window.addEventListener('keydown', keyPressHandler);
        return () => {
            window.removeEventListener('keydown', keyPressHandler);
        };
    }, [callback, targetKey])
}