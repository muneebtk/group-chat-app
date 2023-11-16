import React, { useContext } from 'react'
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

function NavBar() {
    let { logoutUser, user } = useContext(AuthContext);

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component={Link} to='/' sx={{ textDecoration: 'None', color: 'white' }} >Asterbyte</Typography>
                    
                    {!user ?
                        
                        <div style={{ marginLeft: 'auto' }}>
                            <Button component={Link} sx={{ ml: 'auto' }} to="/signup" variant="contained" color="secondary">
                                Signup
                            </Button>
                            <Button component={Link} sx={{ ml: 1 }} to="/login" variant="contained" color="secondary">
                                Login
                            </Button>
                        </div>
                        :
                        <div style={{ marginLeft: 'auto' }}>
                            {user.email}
                         <Button onClick={logoutUser} sx={{ ml: 2 }} variant="contained" color="error">
                            Logout
                            </Button>
                        </div>
                        } 
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar