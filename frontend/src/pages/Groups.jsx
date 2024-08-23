import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ListTable from '../components/ListTable'
import { getGroups, createGroup } from '../services/groupService'
import { PlusOne } from '@mui/icons-material';
import ModalForm from '../components/ModalForm';

const Groups = () => {
    const [groups, setGroups] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [open, setOpen] = useState(false)

    // const handleOpen = () => setOpen(true)
    // const handleClose = () => setOpen(false)

    const handleCreateGroup = async (formData) => {
        await createGroup(formData)
        fetchGroups()
        setOpen(false)
    }

    const fetchGroups = async() => {
        try {
            const data = await getGroups()
            setGroups(data)
        } catch (error) {
            setError('Failed fetching groups:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        
        fetchGroups()
    }, [])

    const columns = [
        { key: 'id', label: 'Group ID' },
        { key: 'name', label: 'Name' },
    ];

    const Fields = [
        {label: 'Group Name', name: 'name', type: 'text'}
    ]

    return (
        <div>
            <div>
                <Typography variant="h4" gutterBottom>Groups</Typography>
                <button onClick={() => setOpen(true)}>
                    <PlusOne />
                    Create Group
                </button>
            </div>
            <ListTable data={groups} columns={columns} loading={loading} error={error} />
            <ModalForm 
                open={open} 
                onClose={() => setOpen(false)} 
                onSubmit={handleCreateGroup} 
                formFields={Fields}/>
        </div>
    );
};

export default Groups;