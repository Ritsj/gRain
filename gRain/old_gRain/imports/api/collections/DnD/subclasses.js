import { Mongo } from 'meteor/mongo';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
// import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

export const Subclasses = new Mongo.Collection('subclasses');

if (Meteor.isServer) {
  Meteor.publish('subclasses', function subclassesPublication () {
    return Subclasses.find();
  });
}

export const insertSubclass = new ValidatedMethod({
  name: 'Subclasses.method.insert',
  // update with actual validation
  validate: null, /* new SimpleSchema({
    _id: { type: String },
    name: { type: String },
    ability_name: { type: String },
    desc: { type: String }
  }).validator(), */

  run (input) {
    try {
      const result = Subclasses.insert(input);
      return result;
    } catch (err) {
      throw new Meteor.Error(err);
    }
  }
});

export const deleteSubclass = new ValidatedMethod({
  name: 'Subclasses.method.delete',
  validate: null, /* new SimpleSchema({
    skillId: { type: String }
  }).validator(), */

  run (subclassId) {
    try {
      const result = Subclasses.remove(subclassId);
      return result;
    } catch (err) {
      throw new Meteor.Error(err);
    }
  }
});
