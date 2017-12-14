import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Selections from './components/Selections';
import restData from './data/restData';
import MainContent from './components/MainContent';  

/**
 * App
 * Created:     2017-11-25 (Jarno Mattila)
 * Modified:    2017-11-27 (Jarno Mattila)
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

  //states to keep in save
  this.state = {
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
    chartType : 'polar',
    selectionsCollapse : false,
    typesCollapse : false,
  }

  this.getRegions = this.getRegions.bind(this);
  this.getSceCollections = this.getSceCollections.bind(this);
  this.setRegion = this.setRegion.bind(this);
  this.setSceCollection = this.setSceCollection.bind(this);
  this.getScenarios = this.getScenarios.bind(this);
  this.setScenario = this.setScenario.bind(this);
  this.setPeriod = this.setPeriod.bind(this);
  this.setIndicator = this.setIndicator.bind(this);
  this.setChartType = this.setChartType.bind(this);
  this.toggleCollapse = this.toggleCollapse.bind(this);
}

setChartType(type){
  this.setState({chartType : type})
}

toggleCollapse(target){
  let collapse = null;
  let show = null;
  let hide = null;

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
  //get all regionlevele for ListRegLevel object
  restData.getRegionLevels().then(regLevels => {
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
    
    const regLevelId = regLevel.value;
    restData.getRegions(regLevelId).then(regs => {
      
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
  } catch (e) {
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
 */
setSceCollection(collection)
{
  try {
    
    let myCollection;
    for(let i in this.state.region.scenarioCollections){
      if(this.state.region.scenarioCollections[i].id === collection.value ){
        myCollection =  this.state.region.scenarioCollections[i];
        break;
      }
    }
    this.setState({scenarioCollection : myCollection});
    this.getScenarios(myCollection);

  } catch (error) {

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
 * 
 */
getScenarios(scenarioCollection)
{
  restData.getScenarios(this.state.region.id, scenarioCollection.id)
  .then(scens => {

    this.setState({ scenarios: scens[0].scenarios });
    this.setState({ timePeriods: scens[0].timePeriods });
    this.setState({ indicatorCategories: scens[0].indicatorCategories });
    this.setState({ values: scens[0].values });
    
  })
  .catch(error => {
    console.log("getScenarios error: " + error);
  });
  
  //this.forceUpdate();
  
}

/**
 * setScenario
 * @param {*} scenarioId 
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
 // this.forceUpdate();
}

/**
 * setIndicator
 * @param {*} selectedIndicator 
 * @param {*} selectedCategory 
 */
setIndicator(selectedIndicators, selectedCategory)
{
  
  /*let indArray = this.state.myIndicators.slice();
  indArray.push({cat: selectedCategory, ind:selectedIndicator});
  this.setState({myIndicators: indArray});*/
  
  let newArray = [];
  let trigger = false;
  try {
    this.state.myIndicators.forEach(element => {
      if(element.cat === parseInt(selectedCategory, 10)){
        newArray.push({
          cat : selectedCategory,
          ind : selectedIndicators
        });
        trigger = true;
      } else {
        newArray.push(element);
        
      }
    });
    if(!trigger){
      newArray.push({
        cat : selectedCategory,
        ind : selectedIndicators
      });
    }
  } catch (error) {
    newArray.push({
      cat : selectedCategory,
      ind : selectedIndicators
    });
  }
  
  
  
  
  this.setState({myIndicators : newArray});
  
}

/**
 * render()
 */
render(){    
  return (
    <div className="App">
    <Header 
       toggleCollapse = {this.toggleCollapse}
       setChartType = {this.setChartType}
       typesCollapse = {this.state.typesCollapse}
       
    />
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
        />
        
        <MainContent
          region = {this.state.region}  
          period = {this.state.period}
          values = {this.state.values}
          myIndicators = {this.state.myIndicators}
          myScenarios = {this.state.myScenarios}
          chartType = {this.state.chartType}
        />
      </div>

    );
  }
}

export default App;
