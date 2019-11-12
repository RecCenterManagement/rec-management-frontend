import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Button,
  Typography,
  TextField,
  CardActions,
  CardHeader,
  Grid,
  Input,
  InputLabel
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { saveAccountForm } from '../actions/authentication'
import {
  get_all_profile_pictures,
  put_profile_picture,
  create_profile_picture,
  delete_profile_picture
} from '../actions/profile-pictures-action'
const useStyles = makeStyles(theme => ({
  gridContainer: {
    padding: '20px'
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.light,
    color: 'black'
  },
  media: {
    height: 240,
    backgroundSize: 240
  }
}))

const Settings = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const account = useSelector(state => state.authentication.account)
  const [form_field, set_form_field] = useState({
    firstName: account.firstName,
    lastName: account.lastName,
    email: account.email,
    username: account.login
  })
  const allProfilePictures = useSelector(
    state => state.profile_pictures.entities
  )
  const [uploadInfo, setUploadInfo] = useState(null)

  const [image, setImage] = useState(null)
  const [pictureData, setPictureData] = useState({
    id: Math.floor(Math.random() * 1000),
    user: {
      activated: account.activated,
      email: account.email,
      firstName: account.id,
      id: account.id,
      imageUrl: account.imageUrl,
      langKey: account.langKey,
      lastName: account.lastName,
      login: account.login
    }
  })


  const { firstName, lastName, email, username } = form_field

  useEffect(() => {
    dispatch(get_all_profile_pictures())
  }, [dispatch])

  const handleChange = name => event => {
    set_form_field({ ...form_field, [name]: event.target.value })
  }
  const handleSubmit = () => {
    dispatch(
      saveAccountForm({
        ...account,
        firstName: firstName,
        lastName: lastName,
        email: email,
        login: username
      })
    )
  }
  const loadInitialImg = () =>{
    if(allProfilePictures){
      allProfilePictures.filter(picture => {
        if(picture.user.id === account.id ){
        return `data:${picture.imageDataContentType};base64,${picture.imageData}`
        }
    })}
    
  }
  const handleUpload = event => {
   // const id =account.imageUrl && account.imageUrl.replace('/content/user-profile-picture/', '')
    const file = event.target.files[0]
    if (file) {
      const fr = new FileReader()
      fr.onload = () => {
        const imageDataContentType = file.type
        const imageData = fr.result.replace(
          `data:${imageDataContentType};base64,`,
          ''
        )
        setUploadInfo({ image: fr.result, name: file.name })
        setImage({ ...image, imageData, imageDataContentType })
        setPictureData({ ...pictureData, imageData, imageDataContentType })
      }
      fr.readAsDataURL(file)
    }
  }
  const handleSaveUpload = () => {
    if (pictureData.id) {
      dispatch(put_profile_picture(pictureData))
      console.log('uploading')
    } else {
      create_profile_picture(pictureData)
      console.log('creating')

    }
    setUploadInfo(null)
  }

  const handleCancel = () => {
    setUploadInfo(null)
  }
  const handleDelete = () => {
    const id = account.imageUrl && account.imageUrl.replace('/content/user-profile-picture/', '')
    dispatch(delete_profile_picture(id))
    setUploadInfo(null)
  }
  console.log("image",loadInitialImg())
  return (
    <div className={classes.gridContainer}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={7}>
          <Card className={classes.card}>
            <CardHeader
              className={classes.cardHeader}
              title={`${username} profile`}
            />
            <CardContent>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                  id='outlined-name'
                  label='First Name'
                  className={classes.textField}
                  value={firstName}
                  onChange={handleChange('firstName')}
                  margin='normal'
                  variant='outlined'
                />
                <TextField
                  id='outlined-name'
                  label='Last Name'
                  className={classes.textField}
                  value={lastName}
                  onChange={handleChange('lastName')}
                  margin='normal'
                  variant='outlined'
                />
                <TextField
                  id='outlined-name'
                  label='Email Address'
                  className={classes.textField}
                  value={email}
                  onChange={handleChange('email')}
                  margin='normal'
                  variant='outlined'
                />
              </div>
            </CardContent>
            <CardActions
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Button
                size='medium'
                color='secondary'
                onClick={() => handleSubmit()}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <Card className={classes.card}>
            <CardHeader
              className={classes.cardHeader}
              title='Profile Picture'
            />
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={
                  uploadInfo && uploadInfo.image
                    ? uploadInfo.image
                    :loadInitialImg()
                }
                title='Contemplative Reptile'
              />
            </CardActionArea>
            <CardContent>
              <Typography variant='body2' color='textSecondary' component='p'>
                Thinking of changing your look? Click the button below to switch
                to a fancy new profile picture
              </Typography>
            </CardContent>
            <CardActions
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Input
                accept='image/*'
                className={classes.input}
                style={{ display: 'none' }}
                id='raised-button-file'
                multiple
                type='file'
                onChange={e => handleUpload(e)}
              />
              <InputLabel htmlFor='raised-button-file'>
                <Button color='secondary' variant='raised' component='span'>
                  Upload
                </Button>
              </InputLabel>
              {uploadInfo && uploadInfo.name && (
                <>
                  <Typography>{uploadInfo.name}</Typography>
                  <Button
                    size='small'
                    color='secondary'
                    onClick={handleSaveUpload}
                  >
                    Save
                  </Button>
                  <Button size='small' color='secondary' onClick={handleCancel}>
                    Cancel
                  </Button>
                </>
              )}
              {account && account.imageUrl && (
                <Button size='small' onClick={handleDelete}>
                  Delete
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default Settings
