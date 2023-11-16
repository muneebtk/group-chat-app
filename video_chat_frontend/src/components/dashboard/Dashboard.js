import React, { useContext } from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import AuthContext from '../../context/AuthContext';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 4
    },
    card: {
        minWidth: 275,
        minHeight: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
    },
    title: {
        fontSize: 20,
        marginBottom: 4
    },
    button: {
        marginTop: 4
    },
}));
const Dashboard = () => {
    const notyf = new Notyf()
    const { user, loginRes } = useContext(AuthContext);
    const classes = useStyles();
    let navigate = useNavigate();
    const handleChatClick = () => {
    };

    const handleVideoCallClick = () => {
    };
    let toGroupChat = () => {
        if (user) {
            navigate('chat_dashboard/')
        } else {
            notyf.error('Unauthorized!')
            setTimeout(() => {
                navigate('/login')
            }, 3000);
     }
 }
    return (
        <div className={classes.root}>
            <Grid container spacing={5} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={12} sm={5} sx={{ ml: 4, mt: 4 }}>
                    <Card className={classes.card} elevation={0} sx={{ border: 5, borderColor: 'skyblue', borderRadius: 4 }} onClick={handleChatClick}>
                        <CardContent>
                            <Typography  color="textSecondary" gutterBottom variant='h2'>
                                Group Chat
                            </Typography>
                            <Typography variant="h6" component="">
                                Join the group or create chat to communicate with others.
                            </Typography>
                            <Button onClick={toGroupChat} variant="contained" color="primary">
                                Go to Chat
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={5} sx={{ ml: 4, mt: 4 }}>
                    <Card className={classes.card} onClick={handleVideoCallClick} sx={{ border: 5, borderColor: 'skyblue', borderRadius: 4 }}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom variant='h2'>
                                Group Video Call
                            </Typography>
                            <Typography variant="h6" component="p">
                                Join the group or create video call to have a meeting.
                            </Typography>
                            <Button  variant="contained" color="primary">
                                Start Video Call
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default Dashboard;
