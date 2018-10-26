/**
 * SongController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var path = require('path'), fs=require('fs');
const NodeID3 = require('node-id3')

function fromDir(startPath,filter){

    //console.log('Starting from dir '+startPath+'/');

    var filenames = [];

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            fromDir(filename,filter); //recurse
        }
        else if (filename.indexOf(filter)>=0) {
            console.log('-- found: ',filename);
            filenames.push(filename)
        };
    };

    return filenames;
};

module.exports = {

  /**
   * @description returns a list of countries
   */
  list: function(req, res) {
    // Song.create(
    //   { fileName: 'fileName', filePath: 'filePath', name: 'name', author: 'author', imgUrl: 'imgUrl' },
    // )
    //var path = './';

    // fs.readdir(path, function(err, items) {
    //   console.log(items);
    //
    //   for (var i=0; i<items.length; i++) {
    //       console.log(items[i]);
    //   }
    // });
    // .then(song => {
    //   console.log(song);
    // })
    // .catch(err => {
    //   console.log('err', err);
    // })
    // .then(() => {
    //   return Song.find()
    // })
    var result = fromDir('/Users/enrico/Downloads', '.mp3')
    console.log(result);
    let tags = NodeID3.read(result[0])
    console.log(tags);
    return Song.find()
    .then(function(songs) {
      res.status(200).json(songs)
    });
  }
};
