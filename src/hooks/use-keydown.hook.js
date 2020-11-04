import {useEffect} from 'react';


function useKeyDown (code,callback)  {
    useEffect(() => {

            const handleKeyDown = (ev) => {
                if (ev.code === code) {
                    document.activeElement.blur();
                    callback();
            }
        };
        window.addEventListener("keydown", handleKeyDown )
        return () => {
            window.removeEventListener("keydown", handleKeyDown )
        }

    }, [callback]);

}


export default useKeyDown ;