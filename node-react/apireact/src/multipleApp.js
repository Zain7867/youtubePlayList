import React, {Component} from 'react'
import _get from "lodash/get"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components'

const Title2 = styled.h1`
  font-size: 1.0em;
  text-align: left;
  color: black;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const CardActionAreaIN = styled.body`
  background: lightgray;
  width: 500;
  padding: 0.5em 0.5em;
  margin-bottom: 1em;
  border: 3px solid black;
`;

export default class multipleApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: props.data.videos,
      head_result: props.data,
      
    }
  }

  render() { 
    
        return ( <div >
        
      <Card>
      <Title2>Scroll to see all playlist</Title2>
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
      </div>
    )
  }
}