import { Mongo } from 'meteor/mongo';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
// import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

export const Races = new Mongo.Collection('races');

if (Meteor.isServer) {
  Meteor.publish('races', function racesPublication () {
    return Races.find();
  });
}

export const insertRace = new ValidatedMethod({
  name: 'Races.method.insert',
  // update with actual validation
  validate: null, /* new SimpleSchema({
    _id: { type: String },
    name: { type: String },
    ability_name: { type: String },
    desc: { type: String }
  }).validator(), */

  run (input) {
    try {
      const result = Races.insert(input);
      return result;
    } catch (err) {
      throw new Meteor.Error(err);
    }
  }
});

export const deleteRace = new ValidatedMethod({
  name: 'Races.method.delete',
  validate: null, /* new SimpleSchema({
    skillId: { type: String }
  }).validator(), */

  run (raceId) {
    try {
      const result = Races.remove(raceId);
      return result;
    } catch (err) {
      throw new Meteor.Error(err);
    }
  }
});
