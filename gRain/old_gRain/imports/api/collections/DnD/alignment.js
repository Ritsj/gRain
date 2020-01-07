import { Mongo } from 'meteor/mongo';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
// import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

export const Alignment = new Mongo.Collection('alignment');

if (Meteor.isServer) {
  Meteor.publish('alignment', function alignmentPublication () {
    return Alignment.find();
  });
}

export const insertSubclass = new ValidatedMethod({
  name: 'Alignment.method.insert',
  // update with actual validation
  validate: null, /* new SimpleSchema({
    _id: { type: String },
    name: { type: String },
    ability_name: { type: String },
    desc: { type: String }
  }).validator(), */

  run (input) {
    try {
      const result = Alignment.insert(input);
      return result;
    } catch (err) {
      throw new Meteor.Error(err);
    }
  }
});

export const deleteAlignment = new ValidatedMethod({
  name: 'Alignment.method.delete',
  validate: null, /* new SimpleSchema({
    skillId: { type: String }
  }).validator(), */

  run (alignmentId) {
    try {
      const result = Alignment.remove(alignmentId);
      return result;
    } catch (err) {
      throw new Meteor.Error(err);
    }
  }
});
