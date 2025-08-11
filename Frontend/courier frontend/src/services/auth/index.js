// export const signup = (user) => {
//     return publicAxios.post("/users/signup", user)
//         .then((response) => response.data);
// };

// export const signin = (credentials) => {
//     return publicAxios.post("/authenticate", credentials)
// };

import {useNavigate } from 'react-router-dom'

//isLoggedIn
export const isLoggedIn = () => {
    let data = localStorage.getItem("data");
    if (data != null)
        return true;
    else
        return false;
};

export const CustomNavigate = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
};
}

//handleLogin
export const handleLogin = (data) => {
    localStorage.setItem("data", JSON.stringify(data));
};

//handleLogout
export const handleLogout = (next) => {
    localStorage.removeItem("data");
    const { goToLogin } = CustomNavigate();
    goToLogin();
};

//get currentUser
export const getCurrentUser = () => {
    if (isLoggedIn()) {
        return JSON.parse(localStorage.getItem("data")).userDto;
    } else {
        return null;
    }
};

export const isAdmin = () => {
    if (isLoggedIn()) {
        return (JSON.parse(localStorage.getItem("data")).userDto.role === 'ROLE_ADMIN') ? true : false;
    } else {
        return false;
    }
};

export const isEmployee = () => {
    if (isLoggedIn()) {
        return (JSON.parse(localStorage.getItem("data")).userDto.role === 'ROLE_EMPLOYEE') ? true : false;
    } else {
        return false;
    }
};

export const isClient = () => {
    if (isLoggedIn()) {
        return (JSON.parse(localStorage.getItem("data")).userDto.role === 'ROLE_CLIENT') ? true : false;
    } else {
        return false;
    }
};

export const getToken = () => {
    if (isLoggedIn()) {
        return JSON.parse(localStorage.getItem("data")).jwtToken
    } else {
        return null;
    }
}