import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Character from '../../Layouts/Character.js';

import { Abilities } from '../../../api/collections/DnD/abilities.js';
import { Classes } from '../../../api/collections/DnD/classes.js';
import { Subclasses } from '../../../api/collections/DnD/subclasses.js';
import { Alignment } from '../../../api/collections/DnD/alignment.js';
import { Races } from '../../../api/collections/DnD/races.js';
import { Subraces } from '../../../api/collections/DnD/subraces.js';
import { Backgrounds } from '../../../api/collections/DnD/backgrounds.js';

export default withTracker(() => {
  const handles = [
    Meteor.subscribe('abilities'),
    Meteor.subscribe('classes'),
    Meteor.subscribe('alignment'),
    Meteor.subscribe('races'),
    Meteor.subscribe('subraces'),
    Meteor.subscribe('backgrounds'),
    Meteor.subscribe('subclasses')

  ];
  const loading = handles.some(handle => !handle.ready());
  const races = !loading ? Races.find({}).fetch() : [];
  const raceOptions = races.map(item => {
    return (
      {
        key: item._id,
        value: item.name,
        text: item.name
      }
    );
  });
  const subRaces = !loading ? Subraces.find({}).fetch() : [];
  const alignment = !loading ? Alignment.find({}).fetch() : [];
  const alignmentOptions = alignment.map(item => {
    return (
      {
        key: item._id,
        value: item.name,
        text: item.full_name
      }
    );
  });
  const classes = !loading ? Classes.find({}).fetch() : [];
  const classOptions = classes.map(item => {
    return (
      {
        key: item._id,
        value: item.name,
        text: item.name
      }
    );
  });
  const subClasses = !loading ? Subclasses.find({}).fetch() : [];
  const backgrounds = !loading ? Backgrounds.find({}).fetch() : [];
  const backgroundOptions = backgrounds.map(item => {
    return (
      {
        key: item._id,
        value: item.name,
        text: item.name
      }
    );
  });

  return {
    loading,
    abilities: !loading ? Abilities.find({}).fetch() : [],
    classOptions,
    classes,
    alignmentOptions,
    raceOptions,
    races,
    subRaces,
    backgroundOptions,
    backgrounds,
    subClasses
  };
})(Character);
