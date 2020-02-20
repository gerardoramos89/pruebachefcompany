import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from './card.js';
import Pagina from './pagina.js';
import LinearProgress from '@material-ui/core/LinearProgress';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Menu from './menu.js';
import style from './css/style.css';
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled: 'disabled',
      secondary: 'secondary',
      primary: 'primary',
      superheroes: [],
      Rankingheroes: [],
      likes: [],
      array: [],
      page: 1,
      isloading: true,
      checkcard: false,
      checkHeroe: 0
    };
  }

  componentDidMount() {

    if (localStorage.getItem("superheroes") === null) {
    } else {
      var data = JSON.parse(localStorage.getItem("superheroes"));
      this.setState({ superheroes: data })
      this.setState({ isloading: false })
    }




    fetch('http://35.162.46.100/superheroes/')
      .then(res => res.json())
      .then((data) => {

        this.setState({ superheroes: data })
        localStorage.setItem("superheroes", JSON.stringify(data));

        console.log(this.state.superheroes)
        var max = Math.round(this.state.superheroes.length / 9);
        var paso;
        for (paso = 0; paso < max + 1; paso++) {
          this.state.array.push(paso + 1);
          console.log(this.state.array)
        };
        var paso2;
        for (paso2 = 0; paso2 < this.state.superheroes.length; paso2++) {
          this.state.likes.push(0);
        };

        if (localStorage.getItem("likes") === null) {
          localStorage.setItem("likes", JSON.stringify(this.state.likes));
        } else {

        }

        this.setState({ isloading: false })

      })
      .catch(console.log)



  }

  paginateValue = (page) => {
    this.setState({ page: page });
    console.log(page); // access this value from parent component 
    console.log(this.state.superheroes.length);
  }

  paginatePrevValue = (page) => {
    this.setState({ page: page });
    console.log(page)  // access this value from parent component
  }
  paginateNxtValue = (page) => {
    this.setState({ page: page });
    console.log(page)  // access this value from parent component
  }

  handleSubmitlike = (key) => {
    var likes = JSON.parse(localStorage.getItem("likes"));
    var heroes = JSON.parse(localStorage.getItem("superheroes"));;
    likes[key] = 1+likes[key];

    localStorage.setItem("likes", JSON.stringify(likes));
    this.setState({ likes: likes });
    this.setState({ Rankingheroes: [] });

    var aux;
    for (aux = 0; aux < this.state.superheroes.length; aux++) {
      this.state.Rankingheroes.push({name:this.state.superheroes[aux].name, picture: this.state.superheroes[aux].picture, publisher: this.state.superheroes[aux].publisher, info:this.state.superheroes[aux].info, likes:likes[aux]});
    };

    localStorage.setItem("Rankingheroes", JSON.stringify(this.state.Rankingheroes));
    console.log(this.state.Rankingheroes.sort());
  }

  sort(a,b){
    a = a.date;
    b = b.date;
    if(a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    }
    return 0;
  }
  

  handleSubmitNotlike = (key) => {
    var likes2 = JSON.parse(localStorage.getItem("likes"));;
    likes2[key] = 2;
    localStorage.setItem("likes", JSON.stringify(likes2));
    this.setState({ likes: likes2 });
    console.log(this.state.likes)
  }
  handleSubmitCheck = (key) => {
    this.setState({ checkHeroe: key });
    this.setState({ checkcard: true });
  }
  lista = () => {
    this.setState({ checkcard: false });
  }
  ranking = () => {
    this.setState({ checkcard: true });
  }

  regresar = () => {
    this.setState({ checkcard: false });
  }

  render() {

    const styleb = {
      height: '10vh', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };
    const home = {
      color: 'white',
      padding: '10px',
      backgroundColor: '#000000', 
      display: 'flex',
      justifyContent: 'left',
      textAlign: 'left'
    };
 
    
    return (
      
      <div className="App">
        <CssBaseline />
        <Carousel showThumbs={false}>
          <div>
            <img src={'https://ae01.alicdn.com/kf/HTB1YJonp5FTMKJjSZFAq6AkJpXal.jpg'} />
            <div className="titulo">
              <strong >Super Héroes</strong>
            </div>
          </div>
          <div>
            <img src={'https://ae01.alicdn.com/kf/HTB1YJonp5FTMKJjSZFAq6AkJpXal.jpg'} />
            <div className="titulo">
              <strong >Super Héroes</strong>
            </div>
          </div>
          <div>
            <img src={'https://ae01.alicdn.com/kf/HTB1YJonp5FTMKJjSZFAq6AkJpXal.jpg'} />
            <div className="titulo">
              <strong >Super Héroes</strong>
            </div>
          </div>
        </Carousel>
        <div style={home}></div>
        <Menu lista={this.lista} ranking={this.ranking} />

        {this.state.checkcard ?
          <div>
            {!this.state.isloading ?
              <Card {...this.state} handleSubmitlike={this.handleSubmitlike} handleSubmitNotlike={this.handleSubmitNotlike} />
              : null}
          </div>
          :
          <div>
            {!this.state.isloading ?
              <Pagina {...this.state} handleSubmitCheck={this.handleSubmitCheck} handleSubmitlike={this.handleSubmitlike} handleSubmitNotlike={this.handleSubmitNotlike} />
              :
              <div>
                <LinearProgress />
                <LinearProgress color="secondary" />
              </div>
            }
            {/* <Container maxWidth="sm" style={styleb}>
              <br></br>
              {!this.state.isloading ?
                <Paginacion  {...this.state} paginateValue={this.paginateValue} paginatePrevValue={this.paginatePrevValue} paginateNxtValue={this.paginateNxtValue} />
                :
                <div>
                  <LinearProgress color="secondary" />
                </div>
              }
            </Container> */}
          </div>
        }



      </div>
    );
  }
}

export default App;
