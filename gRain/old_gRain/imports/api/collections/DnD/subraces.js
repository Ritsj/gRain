import { Mongo } from 'meteor/mongo';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
// import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

export const Subraces = new Mongo.Collection('subraces');

if (Meteor.isServer) {
  Meteor.publish('subraces', function subracesPublication () {
    return Subraces.find();
  });
}

export const insertSubrace = new ValidatedMethod({
  name: 'Subraces.method.insert',
  // update with actual validation
  validate: null, /* new SimpleSchema({
    _id: { type: String },
    name: { type: String },
    ability_name: { type: String },
    desc: { type: String }
  }).validator(), */

  run (input) {
    try {
      const result = Subraces.insert(input);
      return result;
    } catch (err) {
      throw new Meteor.Error(err);
    }
  }
});

export const deleteSubrace = new ValidatedMethod({
  name: 'Subraces.method.delete',
  validate: null, /* new SimpleSchema({
    skillId: { type: String }
  }).validator(), */

  run (subraceId) {
    try {
      const result = Subraces.remove(subraceId);
      return result;
    } catch (err) {
      throw new Meteor.Error(err);
    }
  }
});
