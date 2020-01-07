/*******
 * Input should be object with data from calls + endpoint
 * Correct structure depending on endpoint
 * Convert data before sending to Collection
 * Call collection insert
 */

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { insertSkill } from '../collections/DnD/skills';
import { insertAbility } from '../collections/DnD/abilities';
import { insertLanguage } from '../collections/DnD/languages';
import { insertProficiency } from '../collections/DnD/proficiencies';
import { insertClass } from '../collections/DnD/classes';
import { insertSubclass } from '../collections/DnD/subclasses';

export const collectionMiddle = new ValidatedMethod({
  name: 'Collection.method.DataConversion',
  validate: null,

  async run (endPoData) {
    const endPoint = endPoData.endPoint;
    const documentObjects = endPoData.documentObjects;
    // handle the data object depending on the endpoint
    const handleData = (endPoint, item) => {
      const refinedObj = {};
      let result = '';
      switch (endPoint) {
        case 'skills':
          refinedObj._id = item._id;
          refinedObj.name = item.name;
          refinedObj.ability_name = item.ability_score.name;
          refinedObj.desc = item.desc[0];
          result = insertSkill.call(refinedObj);
          return result;
        case 'ability-scores':
          refinedObj._id = item._id;
          refinedObj.name = item.name;
          refinedObj.full_name = item.full_name;
          refinedObj.desc = item.desc[0];
          refinedObj.skills = item.skills.map(entry => entry.name);
          result = insertAbility.call(refinedObj);
          return result;
        case 'proficiencies':
          refinedObj._id = item._id;
          refinedObj.name = item.name;
          refinedObj.type = item.type;
          refinedObj.classes = item.classes.map(entry => entry.name);
          refinedObj.races = item.races.map(entry => entry.races);
          result = insertProficiency.call(refinedObj);
          return result;
        case 'languages':
          refinedObj._id = item._id;
          refinedObj.name = item.name;
          refinedObj.type = item.type;
          refinedObj.type = item.typical_speakers.map(entry => entry.typical_speakers);
          refinedObj.script = item.script;
          result = insertLanguage.call(refinedObj);
          return result;
        case 'classes':
          refinedObj._id = item._id;
          refinedObj.name = item.name;
          refinedObj.hit_die = item.hit_die;
          refinedObj.prof_choice = {};
          refinedObj.prof_choice.from = item.proficiency_choices.map(
            entry => entry.from.map(element => element.name));
          refinedObj.prof_choice.amount = item.proficiency_choices.map(entry => entry.choose);
          refinedObj.proficiencies = item.proficiencies.map(entry => entry.name);
          refinedObj.saving_throws = item.saving_throws.map(entry => entry.name);
          refinedObj.starting_equipment = item.starting_equipment.class;
          refinedObj.class_levels = item.class_levels.class;
          refinedObj.subclasses = item.subclasses.map(entry => entry.name);
          const undefindedTest = item.spellcasting;
          if (typeof undefindedTest !== 'undefined') {
            // refinedObj.spellcasting = item.spellcasting.map(entry => entry.class);
            refinedObj.spellcasting = item.spellcasting.class;
          }
          result = insertClass.call(refinedObj);
          return result;
        case 'subclasses':
          refinedObj._id = item._id;
          refinedObj.name = item.name;
          refinedObj.class = item.class.name;
          refinedObj.subclass_flavor = item.subclass_flavor;
          refinedObj.desc = item.desc[0];
          refinedObj.features = item.features.map(entry => entry.name);
          result = insertSubclass.call(refinedObj);
          return result;
      }
    };
    // set datafields on the objects passed into map
    const result = await documentObjects.map((item) => handleData(endPoint, item));
    return result;
  }
});
