import { Mongo } from 'meteor/mongo';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
// import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

export const Proficiencies = new Mongo.Collection('proficiencies');

if (Meteor.isServer) {
  Meteor.publish('proficiencies', function proficienciesPublication () {
    return Proficiencies.find();
  });
}

export const insertProficiency = new ValidatedMethod({
  name: 'Proficiencies.method.insert',
  // update with actual validation
  validate: null, /* new SimpleSchema({
    _id: { type: String },
    name: { type: String },
    ability_name: { type: String },
    desc: { type: String }
  }).validator(), */

  run (input) {
    try {
      const result = Proficiencies.insert(input);
      return result;
    } catch (err) {
      throw new Meteor.Error(err);
    }
  }
});

export const deleteProficiency = new ValidatedMethod({
  name: 'Proficiencies.method.delete',
  validate: null, /* new SimpleSchema({
    skillId: { type: String }
  }).validator(), */

  run (proficiencyId) {
    try {
      const result = Proficiencies.remove(proficiencyId);
      return result;
    } catch (err) {
      throw new Meteor.Error(err);
    }
  }
});
