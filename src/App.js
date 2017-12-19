import React, { Component } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Selections from './components/Selections';
import restData from './data/restData';
import MainContent from './components/MainContent';  
import config from './config/config'

/**
 * App
 * Created:     2017-11-25 (Jarno Mattila)
 * Modified:    2017-12-19   (Jarno Mattila)
 * Description: Main class 
 */

class App extends Component {

/**
 * Class contructor
 * @param {*} props 
 */
constructor(props)
{
  super(props);

  /**
   * state variables
   */
  this.state = {
    regionLevels : [],        //all regionlevels
    regionLevel : {},         //selected region level
    regions :  [],            //all regions under selected level
    region: {},               //selected region
    scenarioCollection: {},   //available scenario collections for region
    scenarios: [],            //senarios under selecte collection
    myScenarios: [],          //selected scenarios
    timePeriods: [],          //available time periods
    period: {},               //selected perios
    indicatorCategories: [],  //indicator cats based on selections above
    myIndicators: null,       //selected indicators
    values: [],               //all values, based on selections above
    chartType : 'polar',      //default chat type
    chartView : 'single',     //default chart view single/multi
    selectionsCollapse : false, //selection menu visibility default (unvisible)
    typesCollapse : true,     //chart menu visibility default (visible)
    lang : 'fi',              //default language
    page : 'frontpage'        //default start page
  }

  /**
   * Methods
   */
  this.getRegions = this.getRegions.bind(this);
  this.getSceCollections = this.getSceCollections.bind(this);
  this.setRegion = this.setRegion.bind(this);
  this.setSceCollection = this.setSceCollection.bind(this);
  this.getScenarios = this.getScenarios.bind(this);
  this.setScenario = this.setScenario.bind(this);
  this.setPeriod = this.setPeriod.bind(this);
  this.setIndicator = this.setIndicator.bind(this);
  this.setChartType = this.setChartType.bind(this);
  this.setChartView = this.setChartView.bind(this);
  this.toggleCollapse = this.toggleCollapse.bind(this);
  this.melaLink = this.melaLink.bind(this);
  this.setLang = this.setLang.bind(this);
  this.setActivePage = this.setActivePage.bind(this);
  this.setResponsiveValues = this.setResponsiveValues.bind(this);
  
}

setResponsiveValues(){
  if(window.innerWidth > 750){
    this.setState({
      selectionsCollapse : true,
      typesCollapse : true
    });
  } else {
    this.setState({
      selectionsCollapse : false,
      typesCollapse : false
    });
  }

}

/**
 * setLang
 * @param {*} myLang 
 * 
 * set selected language 
 */
setLang(myLang){

  // reset state vars that are affected by this change
  this.setState({
    regionLevels : [],
    regionLevel : {},
    regions :  [],
    region: {},
    scenarioCollection: {},
    scenarios: [],
    myScenarios: [],
    timePeriods: [],
    period: {},
    indicatorCategories: [],
    myIndicators: null,
    values: [],
    lang:myLang
  })
  //get all regionlevels for ListRegLevel object
  //has to be after resetting state
  restData.getRegionLevels(myLang).then(regLevels => {
    this.setState({regionLevels: regLevels});
  })
  .catch(error => {
    console.log("regionLevels error: " + error);
  })  
}

/**
 * setActivePage
 * @param {*} mypage 
 * sets the static page if not chat view
 */
setActivePage(mypage){
  this.setState({page:mypage});
}

/**
 * melaLink
 * @param {*} singleScenario 
 * Returns MELA TuPa link with 
 * required parameters
 */
melaLink(singleScenario){

  // init scenario string
  let scenarios = "";

  // checking link type (single/multi)
  if(singleScenario){
    scenarios = singleScenario;

  }
  //if multi, loop scenarios and build 
  //a comma separated string of scenario ids
  else  {
    this.state.myScenarios.forEach(sce => {
      scenarios = scenarios.concat(sce.value).concat(',');
    });
    //remove redudant comma
    scenarios = scenarios.slice(0,-1);
  }  

  //the same as above for indicators
  let indicators = "";
  this.state.myIndicators.forEach(category => {
      category.ind.forEach(indicator => {
        indicators = indicators.concat(indicator.value).concat(',');
      });
  });
  indicators = indicators.slice(0,-1);

  //return link as a string
  return (
    config.links.melatupa + 
    "?lk=" + this.state.scenarioCollection.id +
    "&ko=" + this.state.region.id +
    "&ty=" + scenarios +
    "&ka=" + this.state.period.id +
    "&mj=" + indicators
  )
    
}

/**
 * setChartType
 * @param {*} type 
 * Sets the selected chart type
 * (column, polar etc.)
 */
setChartType(type){
  this.setState({chartType : type})
}

/**
 * setChartView
 * @param {*} view 
 * Sets the selected view
 * (single, multi)
 */
setChartView(view){
  this.setState({chartView : view})
}

/**
 * toggleCollapse
 * @param {*} target 
 * Toggle chart menu visibility
 */
toggleCollapse(target){

  //init values
  let collapse = null;
  let show = null;
  let hide = null;

  //set values
  switch(target){
    case "types":
      collapse =  !this.state.typesCollapse;
      show = "typesCollapse";
      hide = "selectionsCollapse";
      break;
    default:
      collapse =  !this.state.selectionsCollapse;
      show = "selectionsCollapse";
      hide = "typesCollapse";
  }
    // show or hide selected menu and hide other one
    this.setState({[show] : collapse});  
    this.setState({[hide] : false});  

}

/**
 * componentDidMount
 * Task to do in the beginning
 */
componentDidMount()
{

  //responsive layout
  this.setResponsiveValues();



  //get all regionlevele for ListRegLevel object
  restData.getRegionLevels(this.state.lang).then(regLevels => {
    this.setState({regionLevels: regLevels});
  })
  .catch(error => {
    console.log("regionLevels error: " + error);
  })
}

/**
 * getRegions
 * @param {*} regLevel
 */
getRegions(regLevel)
{
  try{
    const regLevelId = regLevel.value ? regLevel.value : regLevel;

    restData.getRegions(regLevelId, this.state.lang).then(regs => {
      
      for(let i in this.state.regionLevels){
        
        if(this.state.regionLevels[i].id === regLevelId ){
          this.setState({regionLevel : this.state.regionLevels[i]});
          break;
        }
      }
      this.setState({ regions: regs });
    })
    .catch(error => {
      console.log("getRegions error: " + error);
    });
  
  //if not region level reset selections
  } catch (e) {
    console.log("getRegions error:" + e.message);
    this.setState({
      regionLevel : {},
      regions : [],
      scenarioCollection: {},
      scenarios: [],
      myScenarios: [],
      timePeriods: [],
      period: {},
      indicatorCategories: [],
      myIndicators: [],
      values: []
    })
  }
}

/**
 * setRegion
 * @param {*} regData 
 * set selected region in state var
 */
setRegion(regData)
{
  try{
    let myRegion;
    for(let i in this.state.regions){
      if(this.state.regions[i].id === regData.value ){
        myRegion =  this.state.regions[i];
        break;
      }
    }
    this.setState({region : myRegion});
  } 
  //if not selected, reset the state
  catch (e) {
    console.log("setRegion error:" + e.message);
    this.setState({region :{}});
  }
 
}

/**
 * getSceCollections
 * Returns scenario collections under selected region
 */
getSceCollections()
{
  try {
    return  this.state.region.scenarioCollections;
  } catch (error) {
    console.log("getSceCollections error:" + error.message);
  }  
}

/**
 * setSceCollection
 * @param {*} collection
 * Sets stae of selected scenario collection
 */
setSceCollection(collection)
{
  try {

    //loop collections and pick uo the selected one
    let myCollection;
    for(let i in this.state.region.scenarioCollections){
      if(this.state.region.scenarioCollections[i].id === collection.value ){
        myCollection =  this.state.region.scenarioCollections[i];
        break;
      }
    }
    //save collections in state and call 
    // get scenarios for it
    this.setState({scenarioCollection : myCollection});
    this.getScenarios(myCollection);

  } 
  // if no collections, reset state
  catch (error) {

    console.log("setSceCollection error:" + error.message);
    this.setState({
      scenarioCollection: {},
      scenarios: [],
      myScenarios: [],
      timePeriods: [],
      period: {},
      indicatorCategories: [],
      myIndicators: [],
      values: []
    });
  }
}

/**
 * getScenarios
 * @param {*} scenarioCollection 
 * Gets scenarios under selected collection
 */
getScenarios(scenarioCollection)
{
  restData.getScenarios(this.state.region.id, scenarioCollection.id, this.state.lang)
  .then(scens => {

    this.setState({ scenarios: scens[0].scenarios });
    this.setState({ timePeriods: scens[0].timePeriods });
    this.setState({ indicatorCategories: scens[0].indicatorCategories });
    this.setState({ values: scens[0].values });
    
  })
  .catch(error => {
    console.log("getScenarios error: " + error);
  }); 
}

/**
 * setScenario
 * @param {*} scenarioSelects 
 * Set selected scenario in state
 */
setScenario(scenarioSelects)
{
  this.setState({myScenarios : scenarioSelects});

  //if empty, reset indcators
  if(scenarioSelects.length === 0){
    
    this.setState({
      timePeriods: [],
      period: {},
      myIndicators: [],
      values: []
    }) 
  }
}

/**
 * setPeriod
 * @param {*} selectedPeriod 
 * Sets time period in state
 */
setPeriod(selectedPeriod)
{
  let myPeriod;
  for(let i in this.state.timePeriods){
    if(this.state.timePeriods[i].id === parseInt(selectedPeriod, 10)){
      myPeriod =  this.state.timePeriods[i];   
      break;
    }
  }
  this.setState({period: myPeriod});
}

/**
 * setIndicator
 * @param {*} selectedIndicator 
 * @param {*} selectedCategory 
 * Adds selected indicator in the selected indicator array
 */
setIndicator(selectedIndicators, selectedCategory)
{
  
  //helper array for temp saving
  let newArray = [];

  //trigger for passing evaluation value out of the loop
  let trigger = false;

  //loop selected indicators
  try {
    this.state.myIndicators.forEach(element => {

      //if selected category exists, add new indicator under the category
      if(element.cat === parseInt(selectedCategory, 10)){
        newArray.push({
          cat : selectedCategory,
          ind : selectedIndicators
        });
        //set trigger
        trigger = true;
      } 
      // if not exists, keep the old one
      else {
        newArray.push(element);
      }
    });

    //if no trigger add new indicator
    if(!trigger){
      newArray.push({
        cat : selectedCategory,
        ind : selectedIndicators
      });
    }
  } 
  //in error case, add the ne one
  catch (error) {
    newArray.push({
      cat : selectedCategory,
      ind : selectedIndicators
    });
  }
  
  //save in state
  this.setState({myIndicators : newArray});
}

/**
 * render()
 */
render(){    

  return (
    <div className="App">

    {/*Top header with title, lang menu, menu toggle and about*/}
    <Header 
       toggleCollapse = {this.toggleCollapse}
       setChartType = {this.setChartType}
       setChartView = {this.setChartView}
       chartType = {this.state.chartType}
       chartView = {this.state.chartView}
       typesCollapse = {this.state.typesCollapse}
       setLang = {this.setLang}
       lang = {this.state.lang}
       setActivePage = {this.setActivePage}
       {...config}
       
    />

    {/*wrapper*/}
    <div id="outer-container">

      {/*indicator selection menu*/}
      <Selections 
        regionLevels = {this.state.regionLevels}
        regions = {this.state.regions}
        regionLevel = {this.state.regionLevel}
        region = {this.state.region}
        getRegions = {this.getRegions}
        setRegion = {this.setRegion}
        getSceCollections = {this.getSceCollections}
        setSceCollection = {this.setSceCollection}
        scenarioCollection = {this.state.scenarioCollection}
        scenarios = {this.state.scenarios}
        myScenarios = {this.state.myScenarios}
        setScenario = {this.setScenario}
        timePeriods = {this.state.timePeriods}
        setPeriod = {this.setPeriod}
        period = {this.state.period}
        indicatorCategories = {this.state.indicatorCategories}
        myIndicators = {this.state.myIndicators}
        setIndicator = {this.setIndicator}
        isCollapsed = {this.state.selectionsCollapse}
        toggleCollapse = {this.toggleCollapse}
        lang = {this.state.lang}
      />

      {/*Main content wrapper*/}
      <div id="page-wrap">

        {/*Main contet (static pages, charts etc.*/}
        <MainContent
          region = {this.state.region}  
          period = {this.state.period}
          values = {this.state.values}
          myIndicators = {this.state.myIndicators}
          myScenarios = {this.state.myScenarios}
          chartType = {this.state.chartType}
          chartView = {this.state.chartView}
          scenarioCollection = {this.state.scenarioCollection}
          indicatorCategories = {this.state.indicatorCategories}
          melaLink = {this.melaLink}
          lang = {this.state.lang}
          page = {this.state.page}
          {...config}
        />
        </div>
      </div>
    </div>
    );
  }
}

export default App;
