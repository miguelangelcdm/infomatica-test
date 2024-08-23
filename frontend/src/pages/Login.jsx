import { useState } from 'react';
import { Button, TextField, Typography, Container, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { login } from '../services/authService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username && password) {
            try {
                const response = await login(username, password);
                localStorage.setItem('token', response.token);
                navigate('./Home');
            } catch (error) {
                console.error('Login failed:', error);
                setError('Invalid username or password');
            }
        } else {
            setError('Username and password are required');
        }
    };

    return (
        <Container component="main" maxWidth="sm">
            <Paper elevation={3} style={{padding: '20px'}}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography variant='h5'>Login</Typography>
                    <form onSubmit={handleSubmit} style={{width: '100%', marginTop: '10px'}}>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            label="Password"
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && (
                            <Typography color="error" variant="body2">
                                {error}
                            </Typography>
                        )}
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                            style={{ marginTop: '20px' }}
                        >
                            Login
                        </Button>
                    </form>
                </Box>
            </Paper>
        </Container>
    )
}

export default Login