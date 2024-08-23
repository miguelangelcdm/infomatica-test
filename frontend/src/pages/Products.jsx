import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ListTable from '../components/ListTable';
import { getProducts, createProduct } from '../services/productService'
import { getSubgroups } from '../services/subgroupService';
import { getGroups } from '../services/groupService';
import { PlusOne } from '@mui/icons-material';
import ModalForm from '../components/ModalForm';

const Products = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [open, setOpen] = useState(false)
    const [subGroups, setSubGroups] = useState([])
    const [groups, setGroups] = useState([]);

    const handleCreateProduct = async (data) => {
        console.log("🚀 ~ handleCreateProduct ~ data:", data);
        const { name, price, subgroupId:subGroupId } = data;
        const productData = { name, price, subGroupId };
         console.log("🚀 ~ handleCreateProduct ~ productData:", productData)
        try {
            await createProduct(productData);
            fetchProducts();
            setOpen(false);
        } catch (error) {
            setError('Failed to create Product: ', error);
        }
       
    };

    const fetchGroups = async () => {
        try {
            const data = await getGroups()
            setGroups(data)
        } catch (error) {
            setError('Failed to fetch groups', error)
        }
    }

    const fetchSubGroups = async() => {
        try {
            const data = await getSubgroups()
            setSubGroups(data)
        } catch (error) {
            setError('Failed to fetch sub groups', error)
        }
    }

    const fetchProducts = async() => {
        try {
            const data = await getProducts()
            setProducts(data)
        } catch (error) {
            setError('Failed fetching products:', error)
        } finally {setLoading(false)}
    }

    useEffect(() => {
        fetchProducts()
        fetchGroups()
        fetchSubGroups()
    }, [])

    const columns = [
        {key: 'id', label: 'Product ID'},
        {key: 'name', label: 'Name'},
        {key: 'subGroupId', label: 'Sub Group'},
        {key: 'price', label: 'Price'}
    ]

    const Fields = [
        { label: 'Product Name', name: 'name', type: 'text' },
        { name: 'groupId', label: 'Group', type: 'select' },
        { name: 'subgroupId', label: 'Subgroup', type: 'select' },
        { label: 'Price', name: 'price', type: 'text' }
    ];

    return (
        <>
            <div>
                <Typography variant="h4" gutterBottom>Products</Typography>
                <button onClick={() => setOpen(true)}>
                    <PlusOne />
                    Add Product
                </button>
            </div>
                <ListTable data={products} columns={columns} loading={loading} error={error} />
                <ModalForm 
                    open={open}
                    onClose={() => setOpen(false)}
                    onSubmit={handleCreateProduct}
                    formFields={Fields}
                    subgroups={subGroups}
                    groups={groups}
                />
        </>
    );
};

export default Products;