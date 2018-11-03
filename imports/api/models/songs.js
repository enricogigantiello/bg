import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Songs = new Mongo.Collection('songs');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('songs', function songsPublication() {
    return Songs.find({});
  });

  var fs = Npm.require('fs');
  var path = Npm.require('path');

  function fromDir(startPath,filter){
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
        filenames.push(filename)
      };
    };
    return filenames;
  };

  Meteor.methods({
    'songs.read'() {
      const pathToFile = Meteor.rootPath + '/../../../../../public';
      var filenames = fromDir(pathToFile, '.mp3');
      var fileImages = fromDir(pathToFile, '.jpg');
      Songs.remove({});
      var newsongs = [];
      filenames.map((filename, idx) => {
        var song = {};
        song.path = filename;
        song.name = filename.split('\\').pop().split('/').pop();
        song.fullTitle = song.name.split('.')[0];
        song.fullTitleStartsWith = song.fullTitle ? song.fullTitle[0].toUpperCase() : '';
        song.title = song.fullTitle.split('-')[1];
        song.titleStartsWith = song.title ? song.title[0].toUpperCase() : '';
        song.artist = song.fullTitle.split('-')[0];
        song.artistStartsWith = song.artist ? song.artist[0].toUpperCase() : '';
        song.requestCount = 0;
        song.lastRequest = '';
        song.createdAt = new Date();
        var image = '';
        fileImages.forEach(path => {
          var imageTitle = path.split('\\').pop().split('/').pop().split('.')[0];
          if (imageTitle === song.fullTitle) image = imageTitle;
        })
        song.imageUrl = image !== '' ? `/${image}.jpg`: '/bg.jpg';
        image = image.replace("%20", " ");

        newsongs.push(song);
      });
      newsongs.forEach(song => {
        Songs.insert(song);
      })

    },

    'songs.createMock'() {
      var newsongs = [];
      var fake = []
      var artistidx = 1;
      var songidx = 1;

      for (artistidx = 1; artistidx <= 4; artistidx ++){
        for (songidx = 1; songidx <= 4; songidx ++){
          var artist = `bartist${artistidx}`;
          var title = `bsong${songidx}`;
          var song = {};
          song.path = `./${artist}-${title}.mp3`;
          song.name = `${artist}-${title}.mp3`;
          song.fullTitle = `${artist}-${title}`;
          song.fullTitleStartsWith = song.fullTitle ? song.fullTitle[0].toUpperCase() : '';
          song.title = title;
          song.titleStartsWith = song.title ? song.title[0].toUpperCase() : '';
          song.artist = artist
          song.artistStartsWith = song.artist ? song.artist[0].toUpperCase() : '';
          song.requestCount = 0;
          song.lastRequest = '';
          song.createdAt = new Date();
          song.imageUrl = '/bg.jpg';
          newsongs.push(song);
          }
        }
      newsongs.forEach(fakesong => {
        Songs.insert(fakesong);
      })
    },
  });
}


Meteor.methods({
  'songs.insert'(title) {
    check(title, String);
    // Make sure the user is logged in before inserting a song
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Songs.insert({
      title,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },



  'songs.remove'(songId) {
    check(songId, String);
    const song = Songs.findOne(songId);
    if (song.private && song.owner !== this.userId) {
     // If the song is private, make sure only the owner can delete it
     throw new Meteor.Error('not-authorized');
    }
    Songs.remove(songId);
  },


  'songs.request'(songId, count) {
    console.log('songs.request', songId);
    Songs.update(songId, { $set: { requestCount: count + 1 } });
  },



  'songs.setPrivate'(songId, setToPrivate) {
    check(songId, String);
    check(setToPrivate, Boolean);
    const song = Songs.findOne(songId);
    // Make sure only the song owner can make a song private
    if (song.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Songs.update(songId, { $set: { private: setToPrivate } });
  },

  'songs.titleStartsWith'(startingLetter) {
    check(startingLetter, String);
    const song = Songs.findOne(songId);
    // Make sure only the song owner can make a song private
    if (song.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Songs.update(songId, { $set: { private: setToPrivate } });
  },
});
