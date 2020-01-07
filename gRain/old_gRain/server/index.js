import { Meteor } from 'meteor/meteor';

// API calls
import '../imports/api/http/getDnd';

// collections
import '../imports/api/collections/DnD/skills.js';
import '../imports/api/collections/DnD/alignment.js';
import '../imports/api/collections/DnD/abilities.js';
import '../imports/api/collections/DnD/backgrounds.js';
import '../imports/api/collections/DnD/proficiencies.js';
import '../imports/api/collections/DnD/languages.js';
import '../imports/api/collections/DnD/classes.js';
import '../imports/api/collections/DnD/subclasses.js';
import '../imports/api/collections/DnD/races.js';
import '../imports/api/collections/DnD/subraces.js';
import '../imports/api/dataHandling/collectionMiddle.js';

Meteor.startup(() => {
});
