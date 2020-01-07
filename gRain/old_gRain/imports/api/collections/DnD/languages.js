import { Mongo } from 'meteor/mongo';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
// import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

export const Languages = new Mongo.Collection('languages');

if (Meteor.isServer) {
  Meteor.publish('languages', function languagesPublication () {
    return Languages.find();
  });
}

export const insertLanguage = new ValidatedMethod({
  name: 'Languages.method.insert',
  // update with actual validation
  validate: null, /* new SimpleSchema({
    _id: { type: String },
    name: { type: String },
    ability_name: { type: String },
    desc: { type: String }
  }).validator(), */

  run (input) {
    try {
      const result = Languages.insert(input);
      return result;
    } catch (err) {
      throw new Meteor.Error(err);
    }
  }
});

export const deleteLanguage = new ValidatedMethod({
  name: 'Languages.method.delete',
  validate: null, /* new SimpleSchema({
    skillId: { type: String }
  }).validator(), */

  run (languageId) {
    try {
      const result = Languages.remove(languageId);
      return result;
    } catch (err) {
      throw new Meteor.Error(err);
    }
  }
});
