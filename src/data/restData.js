import axios from 'axios';

/**
 * Functions for getting data from REST interface
 */


/*restUrl commented out because of Cross-Origin issue (CORS)
  Using nodejs server as proxy to solve this.
  Use commented restUri if you don't use proxy
  See proxy field in package.json.*/
  
//const restUrl = 'http://melatupa.azurewebsites.net';
const restUrl = "";

/**
 * getRegionLevels
 */
function getRegionLevels()
{
    return new Promise((resolve, reject) => {
    const sourceUrl =  '/regionLevels';

        //get from REST API
        axios.get(restUrl + sourceUrl).then(response =>{
            resolve(response.data);
        })
        .catch(error =>{
            console.log("Error:getRegionLevels: " + error);
            reject(error);
        });
    });
}

/**
 * getRegions
 */
function getRegions(regLevelId)
{
    let rlId = parseInt(regLevelId, 10);
    return new Promise((resolve, reject) => {
    const sourceUrl =  '/regionLevels/' + rlId + '/regions';

        //get from REST API
        axios.get(restUrl + sourceUrl).then(response =>{
            resolve(response.data);
        })
        .catch(error =>{
            console.log("Error:getRegionLevels: " + error);
            reject(error);
        });
    });
}

/**
 * getScenarios
 */
function getScenarios(regionId, sceCollectionId)
{
    let regId = parseInt(regionId, 10);
    let sceColId = parseInt(sceCollectionId, 10);
    return new Promise((resolve, reject) => {
    const sourceUrl =  '/scenarioCollection/' + sceColId + '/region/' + regId;

        //get from REST API
        axios.get(restUrl + sourceUrl).then(response =>{
            resolve(response.data);
        })
        .catch(error =>{
            console.log("Error:getRegionLevels: " + error);
            reject(error);
        });
    });
}

export default {
    getRegionLevels,
    getRegions,
    getScenarios
}
