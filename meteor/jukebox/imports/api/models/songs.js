import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Songs = new Mongo.Collection('songs');

if (Meteor.isServer) {
  // This code only runs on the server
  console.log('server');

  Meteor.publish('songs', function songsPublication() {
    return Songs.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
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
  'songs.setChecked'(songId, setChecked) {
    console.log('song', songId, setChecked);
    check(songId, String);
    check(setChecked, Boolean);

    Songs.update(songId, { $set: { checked: setChecked } });
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
});
