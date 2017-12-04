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
      myIndicators: [],
      values: []
    }

    this.getRegions = this.getRegions.bind(this);
    this.getSceCollections = this.getSceCollections.bind(this);
    this.setRegion = this.setRegion.bind(this);
    this.setSceCollection = this.setSceCollection.bind(this);
    this.getScenarios = this.getScenarios.bind(this);
    this.setScenario = this.setScenario.bind(this);
    this.setPeriod = this.setPeriod.bind(this);
    this.setIndicator = this.setIndicator.bind(this);
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
   * @param {*} regLevelId 
   */
  getRegions(regLevelId)
  {
    restData.getRegions(regLevelId).then(regs => {

      for(let i in this.state.regionLevels){
        
        if(this.state.regionLevels[i].id === regLevelId ){
          this.setState({regionLevel : this.state.regionLevels[i]});
          break;
        }
      }
      this.setState({ regions: regs });
      this.forceUpdate();
    })
    .catch(error => {
      console.log("getRegions error: " + error);
    });
    
  }

  /**
   * setRegion
   * @param {*} regionId 
   */
  setRegion(regionId)
  {

    
    let myRegion;
    for(let i in this.state.regions){
      if(this.state.regions[i].id === regionId ){
        myRegion =  this.state.regions[i];
        break;
      }
    }
    this.setState({region : myRegion});
    this.forceUpdate();
  }

  /**
   * getSceCollections
   * Returns scenario collections under selected region
   */
  getSceCollections()
  {
     return this.state.region.scenarioCollections;
  }

  /**
   * setSceCollection
   * @param {*} collectionId 
   */
  setSceCollection(collectionId)
  {
   let myCollection;
   for(let i in this.state.region.scenarioCollections){
      if(this.state.region.scenarioCollections[i].id === collectionId ){
        myCollection =  this.state.region.scenarioCollections[i];
        break;
      }
    }
    this.setState({scenarioCollection : myCollection});
    this.getScenarios(myCollection);
    this.forceUpdate();
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
    
    this.forceUpdate();
    
  }

  /**
   * setScenario
   * @param {*} scenarioId 
   */
  setScenario(scenarioSelects)
  {
    this.setState({myScenarios : scenarioSelects});
    
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
    this.forceUpdate();
  }

  /**
   * setIndicator
   * @param {*} selectedIndicator 
   * @param {*} selectedCategory 
   */
  setIndicator(selectedIndicator, selectedCategory)
  {
    
    //console.log("myIndicators.selectedCategory:"+selectedCategory);
    let indArray = this.state.myIndicators.slice();
    indArray.push({cat: selectedCategory, ind:selectedIndicator});
    this.setState({myIndicators: indArray});
    
    this.forceUpdate();
  }

  /**
   * render()
   */
  render(){    
    return (
      <div className="App">
        <Header />
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
        />

      <div>Test lines for testing scroll event</div>

    <MainContent
      region = {this.state.region}  
      period = {this.state.period}
      values = {this.state.values}
      myIndicators = {this.state.myIndicators}
      myScenarios = {this.state.myScenarios}
    />

       
      </div>
    );
  }
}

export default App;
