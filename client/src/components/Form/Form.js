import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@mui/material'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'



import useStyles from './styles'
import { createPost, updatePost } from '../../actions/posts'


const Form = ({ currentId, setCurrentId }) => {

  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });

  const post = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);


  const classes = useStyles();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, postData));
         
    }
    else {
      dispatch(createPost(postData));
      
    }
    clear();
    
    

  }

  const clear = () => {
    setCurrentId(null);
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  }

  return (
    <Paper className={classes.paper} sx={{ padding: '16px', borderRadius: '15px' }}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: '8px'}} >
        <Typography variant='h6' sx={{marginBottom: 2}}>{currentId ? 'Editing' : 'Creating' } a Memory </Typography>
        <TextField
          name='creator'
          variant='outlined'
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
        />
        <br />
        
        <TextField
          name='title'
          variant='outlined'
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <br />
        <TextField
          name='message'
          variant='outlined'
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />
        <br />
        <TextField
          name='tags'
          variant='outlined'
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}          
        />
        <div className={classes.fileInput} style={{width: '97%', margin: '10px 0'}}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          sx={{ marginBottom: 2 }}
          fullWidth
          
        >
          Submit
        </Button>
        
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form