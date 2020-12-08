import React, { Component } from 'react'
import App from './App'  
import axios from "axios"
import MultiApi from "./MultiApi"
import styled from 'styled-components'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
const Input = styled.input.attrs(props => ({
  
    size: props.size || "1em",
  }))`
    color: palevioletred;
    font-size: 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
  
    /* here we use the dynamically computed prop */
    margin: ${props => props.size};
    padding: ${props => props.size};
  `;
  const Title = styled.h1`
  font-size: 2em;
  text-align: left;
  color: black;
  margin: 10px
`;

export default class apiInput extends Component {
    
    constructor() {
        super();
        this.state = {
            inputURL:"", 
            showResult:false, 
            selectedFile:"", 
            shoeMultipleResult: false,
            multipleResult: []
        }
    }
    valueChange=(data) =>{
        let name = data.target.name;
        let value = data.target.value;
        this.setState({[name]: value});
    } 

    handleChange=() => {
        if(this.state.inputURL!==""){
            this.setState({showResult: true})
        } 
    }

    fileUpload=(data)=> {
        this.setState( {selectedFile: data.target.files[0]} )
    }

    handleFile=()=> {
        const dataFile = new FormData();
        dataFile.append("file",this.state.selectedFile);
        dataFile.append("name","data.csv");
        axios.post("http://localhost:3000/csvfile",dataFile,{
            headers: {
                'Content-Type':'multipart/form-data'
            }
        }).then(res=> {
            // console.log(res.data);
            this.setState( {
                multipleResult: res.data
            } )
            
            
        }).then( ()=>{
            this.setState({shoeMultipleResult: true})
            this.setState({showResult: true})
        } );
    }   

    render() {
        return (
            <div>
            {!this.state.showResult?
                <div>
                <Card>
                <Title>YouTube API & CSV file </Title>
                    <div>
                        <Input type="text" name="inputURL" placeholder="Enter YouTube Playlist Link" onChange={this.valueChange}></Input>
                        <Button onClick={this.handleChange}>SUBMIT</Button>
                    </div>

                    <div>
                        <Input type="file" name="inputFIle" onChange={this.fileUpload}></Input>
                        <Button onClick={this.handleFile}>File Upload</Button>
                    </div>
                    </Card>
                    <Card>
                        <Typography>Created By Zen Mansuri (zainmansuri7@gmail.com) </Typography>
                    </Card>
                    </div>
                
            : !this.state.shoeMultipleResult ? <App inputURL={this.state.inputURL}/> :
                this.state.multipleResult.map( (data)=> {
                    return <MultiApi data={data}/> 
                })    
            } 
            </div>
        )
    }
}
