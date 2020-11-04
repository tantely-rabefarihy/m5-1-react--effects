import React from 'react';


function useTitle ( title, fallbackTitle) {

    React.useEffect(() => {
        document.title = title
      
        return () => {

            document.title = fallbackTitle;
        }
      
      }, [title]);

      return
}

export default useTitle;