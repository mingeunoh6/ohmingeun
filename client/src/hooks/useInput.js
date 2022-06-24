import React, { useState, useCallback } from 'react';


const useInput = (init) => {
    const [value, setValue] = useState(init)
    const onChange = useCallback(e => {
        setValue(e.target.value)
    }, [])

    const reset = useCallback(() => setValue(init), [init])


    return [value, onChange, reset];
};

export default useInput;