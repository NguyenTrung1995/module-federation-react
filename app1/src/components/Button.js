import React from 'react';

const Button = ({ children, onClick }) => {
    return (
        <button style={{ width: 100, padding: 10 }} onClick={onClick}>{children}</button>
    )
};

export default Button;