/* @flow */
import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'

type Props = {
  classes: Object
}

const NavBar = (props: Props) => {
  let { classes } = props
  return (
    <div>
      <AppBar position='absolute' className={classes.appBar}>
        <Toolbar>
          <IconButton color='inherit' aria-label='Menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='title' color='inherit'>
            Wheels
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' anchor='left' classes={{ paper: classes.drawerPaper }}>
        <div className={classes.toolbar} />
        <List component='nav'>
          <ListItem component={Link} to='/' button>
            <ListItemText primary='Home' />
          </ListItem>
          <ListItem component={Link} to='/offers' button>
            <ListItemText primary='Offers' />
          </ListItem>
          <ListItem component={Link} to='/new-offer' button>
            <ListItemText primary='New Offer' />
          </ListItem>
        </List>
      </Drawer>
    </div>
  )
}

const drawerWidth = 240
const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar
})

export default withStyles(styles)(NavBar)
