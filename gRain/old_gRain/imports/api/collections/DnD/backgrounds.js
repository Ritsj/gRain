import { Mongo } from 'meteor/mongo';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
// import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

export const Backgrounds = new Mongo.Collection('backgrounds');

if (Meteor.isServer) {
  Meteor.publish('backgrounds', function backgroundsPublication () {
    return Backgrounds.find();
  });
}

export const insertBackground = new ValidatedMethod({
  name: 'Backgrounds.method.insert',
  // update with actual validation
  validate: null, /* new SimpleSchema({
    _id: { type: String },
    name: { type: String },
    ability_name: { type: String },
    desc: { type: String }
  }).validator(), */

  run (input) {
    try {
      const result = Backgrounds.insert(input);
      return result;
    } catch (err) {
      throw new Meteor.Error(err);
    }
  }
});

export const deleteBackground = new ValidatedMethod({
  name: 'Backgrounds.method.delete',
  validate: null, /* new SimpleSchema({
    skillId: { type: String }
  }).validator(), */

  run (backgroundId) {
    try {
      const result = Backgrounds.remove(backgroundId);
      return result;
    } catch (err) {
      throw new Meteor.Error(err);
    }
  }
});
