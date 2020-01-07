import { Mongo } from 'meteor/mongo';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
// import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

export const Skills = new Mongo.Collection('skills');

if (Meteor.isServer) {
  Meteor.publish('skills', function skillsPublication () {
    return Skills.find();
  });
}

export const insertSkill = new ValidatedMethod({
  name: 'Skills.method.insert',
  // update with actual validation
  validate: null, /* new SimpleSchema({
    _id: { type: String },
    name: { type: String },
    ability_name: { type: String },
    desc: { type: String }
  }).validator(), */

  run (input) {
    try {
      const result = Skills.insert(input);
      return result;
    } catch (err) {
      throw new Meteor.Error(err);
    }
  }
});

export const deleteSkill = new ValidatedMethod({
  name: 'Skills.method.delete',
  validate: null, /* new SimpleSchema({
    skillId: { type: String }
  }).validator(), */

  run (skillId) {
    try {
      const result = Skills.remove(skillId);
      return result;
    } catch (err) {
      throw new Meteor.Error(err);
    }
  }
});
