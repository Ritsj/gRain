import { HTTP } from 'meteor/http';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';
import { collectionMiddle } from '../dataHandling/collectionMiddle';

export const getDnd = new ValidatedMethod({
  name: 'getDnd',
  validate: null,
  async run () {
    const endPoints = [
      'skills',
      'ability-scores',
      'proficiencies',
      'languages',
      'classes',
      'subclasses'
    ];
    const iterateEndPoints = async (endPoint) => {
      const endPoData = {
        endPoint: null,
        documentObjects: null
      };
      const returnedData = await handleCalls(endPoint);
      // prepare data
      endPoData.endPoint = endPoint;
      endPoData.documentObjects = returnedData;
      // call collectionmiddle
      const result = await collectionMiddle.call(endPoData);
      return result;
    };

    function getCall (reqUrl) {
      return new Promise(
        (resolve, reject) => {
          // if code is run on server, make API call
          if (Meteor.isServer) {
            HTTP.get(reqUrl, {}, (err, res) => {
              if (err) {
                reject(new Meteor.Error('Something went wrong: ' + err + 'Status: ' + this.status));
              } else {
                const response = JSON.parse(res.content);
                resolve(response);
              }
            });
          }
        }
      );
    }
    const iterateResults = async (result) => {
      // take the url from each object passed into function
      // and make a new call with that URL, return result
      const newResult = await getCall(result.url);
      return newResult;
    };
    async function handleCalls (endPo) {
      try {
        // make the first call to the API
        const baseUrl = 'http://dnd5eapi.co/api/';
        const initialUrl = baseUrl + endPo;
        const initialResponse = await getCall(initialUrl);
        // Take the content of the JSON, store the "results"
        const initialResults = initialResponse.results;
        // Do the iterrating API calls with the results from the first
        // wait for all of them to be done
        return await Promise.all(initialResults.map(iterateResults));
      } catch (err) {
        console.log(err);
        return err;
      }
    }

    return Promise.all(endPoints.map(iterateEndPoints));
  }
});
