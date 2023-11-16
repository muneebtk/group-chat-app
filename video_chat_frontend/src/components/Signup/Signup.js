import React, { useContext, useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Box } from '@mui/material';
import AuthContext from '../../context/AuthContext';
import { Notyf } from 'notyf';

const Signup = () => {
    let notyf = new Notyf()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName:'',
        email: '',
        password: '',
        confirmPassword:'',
    });
    let { SignupUser } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    // signup for submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
            notyf.error('Please fill the fields')
            return false
        }
        if (formData.password !== formData.confirmPassword) {
            notyf.error('Password does not matching!');
            return false
        }
        SignupUser(formData)
    };


    return (
        <Container component="main" maxWidth="xs" sx={{mt:5}}>
            <Paper elevation={0} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h3" gutterBottom>
                    SignUp
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        label="First Name"
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Last Name"
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
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
                    <TextField
                        label="Confirm Password"
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                        Sign Up
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Signup;
