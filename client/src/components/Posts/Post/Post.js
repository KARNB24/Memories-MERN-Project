import React from 'react'
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';


const Post = ({ post, setCurrentId }) => {
  const classes = useStyles()
  const dispatch = useDispatch();


  return (
    <Card className={classes.card} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '15px', height: '100%', position: 'relative'}}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} sx={{height: 0, paddingTop: '56.25%', backgroundColor: 'rgba(0,0,0,0.5)', backgroundBlendMode: 'darken'}} />
      <div className={classes.overlay} style={{position: 'absolute', top: '20px', left: '20px', color: 'white'}}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2} style={{position: 'absolute', top: '20px', right: '20px', color: 'white'}}>
        <Button style={{ color: 'white' }} size="medium" onClick={() => setCurrentId(post._id)}>
          <MoreHorizIcon fontSize='medium' />
        </Button>
      </div>
      <div className={classes.details} style={{display: 'flex', justifyContent: 'space-between', margin: '20px'}}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2" sx={{padding: '0 16px'}}>{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions} sx={{padding: '0 16px 8px 16px', display: 'flex', justifyContent: 'space-between'}}>
        <Button size='small' color='primary' onClick={() => dispatch(likePost(post._id)) }>
          <ThumbUpAltIcon fontSize='small' />
          &nbsp; Like &nbsp;
          {post.likeCount}
        </Button>
        <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id)) }>
          <DeleteIcon fontSize='small' />
          Delete          
        </Button>
      </CardActions>
    </Card>
  )
}

export default Post