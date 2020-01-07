import { Mongo } from 'meteor/mongo';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
// import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

export const Classes = new Mongo.Collection('classes');

if (Meteor.isServer) {
  Meteor.publish('classes', function classesPublication () {
    return Classes.find();
  });
}

export const insertClass = new ValidatedMethod({
  name: 'Classes.method.insert',
  // update with actual validation
  validate: null, /* new SimpleSchema({
    _id: { type: String },
    name: { type: String },
    ability_name: { type: String },
    desc: { type: String }
  }).validator(), */

  run (input) {
    try {
      const result = Classes.insert(input);
      return result;
    } catch (err) {
      throw new Meteor.Error(err);
    }
  }
});

export const deleteClass = new ValidatedMethod({
  name: 'Classes.method.delete',
  validate: null, /* new SimpleSchema({
    skillId: { type: String }
  }).validator(), */

  run (classId) {
    try {
      const result = Classes.remove(classId);
      return result;
    } catch (err) {
      throw new Meteor.Error(err);
    }
  }
});
