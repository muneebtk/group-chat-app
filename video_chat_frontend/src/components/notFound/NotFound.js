import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
    let navigate = useNavigate()
    return (
        <div>
            <div className='main_font' style={{ height: '100vh', width: '100%' }}>
                <Box >
                    <Typography align='center' sx={{ fontFamily: 'Lucida Console' }} variant='h3'>404 <br /><span>Page Not Found!</span></Typography>
                    <Box align='center' mt>
                        <Button variant='outlined' onClick={() => navigate('/')}>back to home</Button>
                    </Box>
                </Box>
            </div>

        </div>

    )
}

export default NotFound