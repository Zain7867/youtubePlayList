import React, {Component} from 'react'
import axios from "axios"
import _get from "lodash/get"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const CardActionAreaIN = styled.body`
  background: gray;
  width: 500;
  padding: 0.5em 0.5em;
  margin-bottom: 1em;
  border: 2px solid black;
`;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: [{}],
      head_result: {},
      inputURL: props.inputURL,
    }
  }

  componentDidMount() {
    let data = {
      "you_playlist": this.state.inputURL
    };

    axios.post('http://localhost:3000/api', data, {
      headers: {
         'Content-Type': 'application/json'
      } 
   } )
    .then( (res)=> {
      console.log(res);
      this.setState({
        result: res.data.videos,
        head_result: res.data, 
      })
      
    } );
  }

  render() { 
    
        return ( 
          <div >
          <Grid container xs={10} 
          justify="center"
          alignItems="center"
          direction="column">
          <Card>
      
      <Typography gutterBottom variant="h5" component="h2">
      <Title>
      YouTube PlayList : ID - {this.state.head_result.playlistID}
      </Title>
      <br/>
      No of Videos: {this.state.head_result.numberVideo}
      </Typography>
        
        {
          this.state.result.map( (data)=> {
                            
            return <div>
            <CardActionAreaIN>
            <img src={_get( data,"thumbnail.url","") }/>
            
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            {data.title}
            </Typography>
            </CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
            {data.description}
          </Typography>
              </CardActionAreaIN>  
            </div>
          })
        }
      </Card>
      </Grid>
      </div>
    )
  }
}