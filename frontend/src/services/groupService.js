const API_URL = '/api/groups';

export const getGroups = async () => {
    const token = localStorage.getItem('token');
    console.log("🚀 ~ getGroups ~ token:", token)

    if (!token) {
        throw new Error("No token found, please log in again.");
    }

    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch groups');
    }
    
    const data = await response.json();
    return data.map(group => ({
        ...group,
        id: String(group.id),
    }));
};

export const createGroup = async (groupData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(API_URL, {
        
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(groupData),
    });

    if (!response.ok) {
        throw new Error('Failed to create group');
    }

    return response.json();
};