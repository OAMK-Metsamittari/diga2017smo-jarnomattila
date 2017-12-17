import axios from 'axios';
import config  from '../config/config.js'

/**
 * Functions for getting data from REST interface
 */


//config
  
const restUrl = config.restAPI.url;
const regionLevels =  config.restAPI.regionLevels;



/**
 * getRegionLevels
 */
function getRegionLevels(lang)
{
    const remote = axios.create({
        baseURL: restUrl,
        headers: {'Accept-Language': lang} 
    });
    return new Promise((resolve, reject) => {
    
        //get from REST API
        remote.get(restUrl + regionLevels).then(response =>{
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
function getRegions(regLevelId, lang)
{
    const remote = axios.create({
        baseURL: restUrl,
        headers: {'Accept-Language': lang} 
    });
    let rlId = parseInt(regLevelId, 10);
    return new Promise((resolve, reject) => {
    const sourceUrl =  regionLevels + '/' + rlId + '/regions';

        //get from REST API
        remote.get(restUrl + sourceUrl).then(response =>{
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
function getScenarios(regionId, sceCollectionId, lang)
{
    const remote = axios.create({
        baseURL: restUrl,
        headers: {'Accept-Language': lang} 
    });
    let regId = parseInt(regionId, 10);
    let sceColId = parseInt(sceCollectionId, 10);
    return new Promise((resolve, reject) => {
    const sourceUrl =  '/scenarioCollection/' + sceColId + '/region/' + regId;

        //get from REST API
        remote.get(restUrl + sourceUrl).then(response =>{
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
