/* @flow */
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

type Props = {
  title: string,
  owner: string,
  price: string,
  classes: Object
}

const Offer = (props: Props) => {
  let { title, owner, price, classes } = props

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant='headline' component='h3'>
            {title}
          </Typography>
          <Typography className={classes.pos} color='textSecondary'>
            {price}
          </Typography>
          <Typography component='p'>
            by {owner}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small'>Learn more</Button>
        </CardActions>
      </Card>
    </div>
  )
}

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}

export default withStyles(styles)(Offer)
