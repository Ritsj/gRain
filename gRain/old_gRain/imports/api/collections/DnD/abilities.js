import { Mongo } from 'meteor/mongo';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
// import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

export const Abilities = new Mongo.Collection('abilities');

if (Meteor.isServer) {
  Meteor.publish('abilities', function abilitiesPublication () {
    return Abilities.find();
  });
}

export const insertAbility = new ValidatedMethod({
  name: 'Abilities.method.insert',
  // update with actual validation
  validate: null, /* new SimpleSchema({
    _id: { type: String },
    name: { type: String },
    ability_name: { type: String },
    desc: { type: String }
  }).validator(), */

  run (input) {
    try {
      const result = Abilities.insert(input);
      return result;
    } catch (err) {
      throw new Meteor.Error(err);
    }
  }
});

export const deleteAbility = new ValidatedMethod({
  name: 'Abilities.method.delete',
  validate: null, /* new SimpleSchema({
    skillId: { type: String }
  }).validator(), */

  run (abilityId) {
    try {
      const result = Abilities.remove(abilityId);
      return result;
    } catch (err) {
      throw new Meteor.Error(err);
    }
  }
});
