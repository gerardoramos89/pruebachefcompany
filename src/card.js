import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

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
  float: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '40%'
  },
  papercard: {
    padding: theme.spacing(2),
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    maxWidth: 360,
    width: 440,
    height: 'auto',
    minHeight: '550px'
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
    marginTop:'-10px',

  },
  desc: {
    display: 'block',
    position: 'relative',
    width: '300px'
  },
  descripcion: {
    backgroundColor: 'rgba(245, 0, 87, 0.69)',
    color: 'white',
    display: 'block',
    position: 'absolute',
    bottom: '-16px',
    left: '0',
    padding: '5px',
    width: '100%',
    height: '100px'
  }
}));


export default function SpacingGrid(props) {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  //console.log(props)
  const handleChange = event => {
    setSpacing(Number(event.target.value));
  };

  var Rankingheroes10 = [];
  var likes = JSON.parse(localStorage.getItem("likes"));
  console.log(likes.sort())
  var heroes = JSON.parse(localStorage.getItem("Rankingheroes"));


  Array.prototype.sortNumbers = function(){
    return this.sort(
        function(a,b){
            return a - b
        }
    );
}

  var Rankingheroes = JSON.parse(localStorage.getItem("Rankingheroes"));

  var Rankingheroes10 = Rankingheroes.sort(function (a, b) {
    if (a.likes > b.likes) {
      return 1;
    }
    if (a.likes < b.likes) {
      return -1;
    }
    return 0;
  }).reverse();

  console.log(Rankingheroes10)



  var likes;
  if (localStorage.getItem("likes") === null) {
    likes = props.likes;
  } else {
    likes = JSON.parse(localStorage.getItem("likes"));
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>

          {Rankingheroes10.map((value, index) => (
            <Grid key={index} item>
              <Paper className={classes.papercard}>
                <Fab color="secondary"  size="small" aria-label="edit" className={classes.float}>
                  {value.likes}
                </Fab>
                <div className={classes.desc}>
                    <img className={classes.img} alt="complex" src={value.picture} />
                    <p className={classes.descripcion}>{value.info}</p>
                </div>
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
                            <IconButton aria-label={props.colorIcon}>
                              <ThumbUpIcon color={likes[index * props.page] === 0 ? props.disabled : props.secondary} />
                            </IconButton>
                            <Button variant="outlined" color="secondary" style={{ minWidth: '14px' }}>
                              {value.likes}
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
