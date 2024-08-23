import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ListTable from '../components/ListTable';
import { getSubgroups, createSubGroup } from '../services/subgroupService'
import { getGroups } from '../services/groupService';
import { PlusOne } from '@mui/icons-material';
import ModalForm from '../components/ModalForm';

const SubGroups = () => {
    const [subgroups, setSubGroups] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [open, setOpen] = useState(false)
    const [groups, setGroups] = useState([]);

    const handleCreateSubGroup = async (data) => {
        try {
            await createSubGroup(data);
            fetchSubGroups();
            setOpen(false);
        } catch (error) {
            setError('Failed to create subgroup: ' + error);
        }
    };

    const fetchSubGroups = async() => {
        try {
            const data = await getSubgroups()
            setSubGroups(data)
        } catch (error) {
            setError('Failed fetching subgroups:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchGroups = async () => {
        try {
            const data = await getGroups()
            setGroups(data)
        } catch (error) {
            setError('Failed to fetch groups', error)
        }
    }

    useEffect(() => {
        fetchGroups()
        fetchSubGroups()
    }, [])

    const columns = [
        {key: 'id', label: 'Sub Group ID'},
        {key: 'name', label: 'Name' },
        {key: 'groupId', label: 'Group'}
    ]

    const Fields = [
        { label: 'Sub Group Name', name: 'name', type: 'text' },
        {
            name: 'groupId',
            label: 'Group',
            type: 'select',
            options: groups.map(group => ({
                value: String(group.id),
                label: group.name
            }))
        }
    ];

    return (
        <>
            <div>
                <Typography variant="h4" gutterBottom>SubGroups</Typography>
                <button onClick={() => setOpen(true)}>
                    <PlusOne />
                    Create Sub Group
                </button>
            </div>
            <ListTable data={subgroups} columns={columns} loading={loading} error={error} />
            <ModalForm 
                open={open}
                onClose={() => setOpen(false)}
                onSubmit={handleCreateSubGroup}
                formFields={Fields}
                groups={groups}
            />
        </>
    );
};

export default SubGroups;