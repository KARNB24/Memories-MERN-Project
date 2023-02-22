import React, {useEffect, useState} from 'react';

import { Container, AppBar, Toolbar, Typography, Grow, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';

import { getPosts } from './actions/posts';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';

import memories from './images/memories.png';
import useStyles from './styles';



const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());        
    }, [currentId, dispatch]);
    
    return (
        <Container maxWidth="lg">
            <AppBar sx={{borderRadius: 15, margin: '30px 0', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} position="static" color="inherit">
                <Typography className={classes.heading} sx={{color: 'rgba(0,183,255, 1)'}} variant="h2">Memories</Typography>
                <img className={classes.image}  style={{marginLeft: '15px'}} src={memories} alt="icon" height="60" />
            </AppBar>

            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>

                    </Grid>
                </Container>
            </Grow>
        </Container>
    );

}

export default App;