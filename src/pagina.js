import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: '15px'
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },

    papercard: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 360,
      width: 440,
      height: 'auto',
      minHeight: '250px'
    },
    image: {
      width: 300,
      height: 320,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));


export default function SpacingGrid(props) {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  console.log(props)
  const handleChange = event => {
    setSpacing(Number(event.target.value));
  };
  // var rawpage = 9 * (props.page - 1);
  // var rawpagefin = 9 * props.page;
  //var totalheroes = props.superheroes.slice(rawpage,rawpagefin);
  var totalheroes = props.superheroes;

  var likes;
  if(localStorage.getItem("likes") === null){
    likes = props.likes;
  }else{
    likes = JSON.parse(localStorage.getItem("likes"));
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
        
          {totalheroes.map((value, index) => (
                    <Grid key={index} item>
                        <Paper className={classes.papercard}>
                                <ButtonBase className={classes.image}>
                                    <img className={classes.img} alt="complex" src={value.picture} />
                                </ButtonBase>
                                <Grid container spacing={1}>
                                <Grid item>
                                    <Typography gutterBottom variant="subtitle1">
                                            <strong>{value.name}</strong>
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1">
                                            {value.publisher}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                    <Grid item>
                                        <Typography variant="body2" style={{ cursor: 'pointer', textAlign: 'rigth ' }}>
                                            <CardActions disableSpacing>
                                            <IconButton aria-label={props.colorIcon} onClick={() =>props.handleSubmitlike(index*props.page)}>
                                                <ThumbUpIcon color={likes[index*props.page] === 0?props.disabled:props.secondary} />
                                            </IconButton>
                                              <Button variant="outlined" color="secondary" style={{minWidth: '14px' }}>
                                                 {likes[index*props.page]}
                                              </Button>
                                              
                                            </CardActions>
                                        </Typography>
                                    </Grid>
                                    </Grid>
                                </Grid>
                                </Grid>
                            </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
