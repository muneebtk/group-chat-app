import React, { useContext, useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Box } from '@mui/material';
import AuthContext from '../../context/AuthContext';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const Login = () => {
    const notyf = new Notyf();
    let { loginUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    // login form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        let email = formData.email
        let password = formData.password
        loginUser(email=email, password=password)
    };

    return (
        <Container component="main" maxWidth="xs" sx={{mt:3}}>
            <Paper elevation={0} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h3" gutterBottom>
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        label="Email"
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Password"
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
                        Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
