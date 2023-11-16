import React, { useContext, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import AuthContext from '../../context/AuthContext';
import { Notyf } from 'notyf';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        // padding: theme.spacing(4),
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
        // marginBottom: theme.spacing(2),
        marginBottom: 4
    },
    button: {
        // marginTop: theme.spacing(2),
        marginTop: 4
    },
}));
const Chat = () => {
    const classes = useStyles();

    const handleChatClick = () => {
    };

    const handleVideoCallClick = () => {
    };
    let { CreateRoom, EnterRoom } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        newRoomName: '',
        existingRoomName: '',
    });
    let notyf = new Notyf()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    let createRoom = (e) => {
        e.preventDefault()
        let roomName = formData.newRoomName
        if (!roomName) {
            notyf.error('Please type a group name')
        }
        CreateRoom(roomName)
    }
    let enterRoom = (e) => {
        e.preventDefault()
        let roomName = formData.existingRoomName
        if (!roomName) {
            notyf.error('Please type a group name')
        }
        EnterRoom(roomName)
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={5} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={12} sm={5} sx={{ ml: 4, mt: 4 }}>
                    <Card className={classes.card} elevation={0} sx={{ border: 5, borderColor: 'skyblue', borderRadius: 4 }} onClick={handleChatClick}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom variant='h2'>
                                Create New
                            </Typography>
                            <Typography variant="h6" component="" sx={{ mb: 2 }}>
                                Crate a new chat group, and start chatting.
                            </Typography>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                <TextField label='Enter Group Name' sx={{ Width: 300, }} onChange={handleChange} name='newRoomName'></TextField>
                                <Box sx={{ mt: 3 }}>
                                    <Button className={classes.button} variant="contained" color="primary" onClick={createRoom} >
                                        submit
                                    </Button>
                                </Box>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={5} sx={{ ml: 4, mt: 4 }}>
                    <Card className={classes.card} onClick={handleVideoCallClick} sx={{ border: 5, borderColor: 'skyblue', borderRadius: 4 }}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom variant='h2'>
                                Join  Chat
                            </Typography>
                            <Typography variant="h6" component="p" sx={{ mb: 2 }}>
                                Join an existing chat group
                            </Typography>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <TextField label="Enter Group Name" sx={{ minWidth: 300 }} name='existingRoomName' onChange={handleChange} />
                                <Box sx={{ mt: 2 }}>
                                    <Button variant="contained" color="primary" onClick={enterRoom}>
                                        Submit
                                    </Button>
                                </Box>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default Chat;
