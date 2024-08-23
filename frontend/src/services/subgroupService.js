const API_URL = '/api/subgroups';

export const getSubgroups = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error("No token found, please log in again.");
    }

    const response = await fetch(API_URL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    
    if (!response.ok) {
        throw new Error('Failed to fetch subgroups');
    }

    const data = await response.json();
    return data.map(subgroup => ({
        ...subgroup,
        id: String(subgroup.id),
        groupId: String(subgroup.groupId),
    }));
};


export const createSubGroup = async (data) => {
    const token = localStorage.getItem('token')
    const response = await fetch('/api/subgroups', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error("Failedd to create subgroup");
        
    }

    return response.json()
}