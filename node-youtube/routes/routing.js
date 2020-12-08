const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const secrets = require('../google_api_secret.json');
const axios = require("axios");
const getYotubePlaylistId = require('get-youtube-playlist-id');
const fs = require('fs');
// mongoose
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/youtubeNode");
// file Upload
const fileupload = require('express-fileupload');
const csv = require('csvtojson');

// setting limit for upload file
router.use(bodyParser.json({
    limit: "50mb"
}));
// setting limit for upload file
router.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
}));
router.use(fileupload())

// mongoose Scheme
let video = new mongoose.Schema({
    position: Number,
    id: String,
    title: String,
    description: String,
    thumbnail: Object
});

let result_data = new mongoose.Schema({
    playlistID: {
        type: String,
        required: true
    },
    numberVideo: {
        type: Number,
        required: true
    },
    videos: {
        type: [video],
        required: false
    }
});

var User = mongoose.model("User", result_data);
var videoUser = mongoose.model("videoUser", video);

// connect user to YouTube3
const getPlayListItems = async playlistID => {
    const result = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems`, {
        params: {
            part: 'id,snippet',
            maxResults: 50,
            playlistId: playlistID,
            key: secrets.web.my_api
        }
    });
    return result.data;
};

// api request with TouTube link in post request
router.post('/api', (req, res) => {
    const you_playlist = req.body.you_playlist;
    // const you_id = url.substring(url.indexOf('&list='));
    var id = getYotubePlaylistId(you_playlist)
    getPlayListItems(id).then(data => {
        var mydata = new User();
        mydata.set("playlistID", id);
        mydata.set("numberVideo", data.pageInfo.totalResults);
        let i_index = 0;
        var arr_index = [];
        data.items.forEach(element => {
            var videoUserdata = new videoUser();
            videoUserdata.set("position", element.snippet.position);
            videoUserdata.set("id", element.id);
            videoUserdata.set("title", element.snippet.title);
            videoUserdata.set("description", element.snippet.description);
            videoUserdata.set("thumbnail", element.snippet.thumbnails.medium);
            arr_index.push(videoUserdata);
            videoUserdata.save();
        });
        mydata.set("videos", arr_index);
        mydata.save().then(item => {
                res.status(200).send(item);
            })
            .catch(err => res.status(401).send(err));
    });
});

// post method for CSV file 
router.post('/csvfile', (req, res) => {
    // var filename1 = req.files.file.name;
    // console.log(filename1);
    const nametype = req.body.name;
    const file = req.files.file;
    file.mv(`./${nametype}`, err => {
        if (err) {
            return res.status(500).send(err);
        }
    });

    var dd_dpy = [];
    let dire_file = './'+nametype;
    // console.log(nametype);
    const converter = csv()
        .fromFile(`./${nametype}`)
        .then((dataCSV) => {
            res.send(dataCSV);
        })
})

exports.routes = router;
