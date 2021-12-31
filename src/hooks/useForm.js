import React from 'react';

export default function useForm() {
    const [state, setState] = React.useState({})
    const handleChange = (name, value) => {
        setState(prevState => ({ ...prevState, [name]: value }));
    }

    return [state, handleChange];
}   