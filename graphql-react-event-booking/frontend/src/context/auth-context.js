import React, { createContext, useState } from 'react';

export default createContext({
    token: null,
    userId: null,
    login: (token, userId,tokenExpiration) => {
        
    },
    logout: () => {}
})