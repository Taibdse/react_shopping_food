import uuid from 'uuid';

export const userAccounts = [
    { 
        id: uuid.v4(), 
        username: 'john doe', 
        password: '123456', 
        fullname: 'john doe',
        email: 'john@gmail.com', 
        address: 'America', 
        phone: '12345678',
        birthdate: '1998/23/02'
    },
    { 
        id: uuid.v4(), 
        username: 'peter', 
        password: '123456', 
        fullname: 'peter pan',
        email: 'peter@gmail.com', 
        address: 'Cananda', 
        phone: '12345678',
        birthdate: '1998/23/02'
    }
]