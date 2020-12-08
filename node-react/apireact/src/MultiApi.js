import React, {Component} from 'react'
import axios from "axios"
import _get from "lodash/get"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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

export default class MultiApi extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      playlistSendID : props.data,  
      extraData: props.data,
      result: [{}],
      head_result: {},
    }
  }

  componentDidMount() {
      let playId="Playlist Link";
    let data = {
      "you_playlist": this.state.playlistSendID[playId]
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
          <div>
          <Card>
          <Grid container xs={10} 
          justify="center"
          alignItems="center"
          direction="column">
      
        <Grid item md={6}>
          <Typography variant="h4" >
             PlayList Detail
          </Typography>
          <div>
            <List>
                <ListItem>
                  <ListItemText
                    primary={this.state.extraData["Title"]}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={this.state.extraData["Level"]}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={this.state.extraData["Language"]}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={this.state.extraData["Instructor"]}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={this.state.extraData["Subject"]}
                  />
                </ListItem>
            </List>
          </div>
        </Grid>
      
      <Typography gutterBottom variant="h5" component="h2">
      <Title>
      {this.state.extraData["Title"]}
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
        </Grid>
      </Card>
      </div>
    )
  }
}