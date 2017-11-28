import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Selections from './components/Selections';
import restData from './data/restData';

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
      region: {}
    }

    this.getRegions = this.getRegions.bind(this);
    this.getSceCollections = this.getSceCollections.bind(this);
    this.setRegion = this.setRegion.bind(this);
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
   * 
   */
  getSceCollections()
  {
    for(let i in this.state.region){
      console.log("i:"+i);
      if(i === "scenarioCollections")return this.state.region[i];
    }
    
    //return this.state.region.scenarioCollections;
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
        />

      <div>Test lines for testing scroll event</div>

      <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eleifend tempus massa, vitae imperdiet purus suscipit commodo. Donec pellentesque vehicula libero vitae vulputate. Proin ligula metus, rutrum a commodo a, vulputate nec eros. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut sapien ligula, lacinia eget faucibus eu, posuere eu elit. Maecenas non eros dapibus, commodo arcu nec, dictum est. Phasellus at risus ultrices, lobortis erat ac, posuere sem. Suspendisse nec lectus dictum, fermentum nunc in, viverra ex. Aliquam porta, nibh vitae rutrum cursus, dui tortor sodales dui, sed lacinia sapien neque sit amet neque. Fusce ligula quam, tempus ut eros id, iaculis commodo lorem. Vivamus in elit posuere, porttitor purus non, faucibus nulla. Maecenas maximus vestibulum odio sed tincidunt. Nunc ut mattis dolor.
      </p>
      <p>
      Aenean in risus in odio facilisis feugiat. In porta nisi eget lacus egestas interdum. Mauris in posuere turpis. Maecenas sit amet congue nibh. Sed risus nisl, maximus a ex scelerisque, finibus viverra sapien. Aenean id augue justo. Integer imperdiet urna sit amet eleifend semper. Duis mi eros, pulvinar vel molestie vel, auctor a erat. Suspendisse potenti. Donec et faucibus purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam dapibus massa sit amet velit facilisis, non pellentesque elit varius. Vivamus eu nibh imperdiet, pharetra arcu et, faucibus risus. Pellentesque ut est nec nibh porta malesuada. Nulla eleifend sapien quis varius molestie.
      </p>
      <p>
      Proin sodales lacinia ligula ac imperdiet. In sollicitudin, dolor quis venenatis faucibus, neque quam molestie libero, vel ullamcorper velit neque ac nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec purus elit, gravida at dignissim eu, placerat sit amet libero. Nullam fringilla gravida magna sed scelerisque. Nulla pellentesque sed mauris luctus blandit. Phasellus condimentum pharetra diam et volutpat. Aliquam rhoncus ultricies arcu elementum euismod. Sed viverra dignissim dui, quis malesuada leo ullamcorper sit amet. Curabitur scelerisque ipsum turpis, iaculis tempus felis aliquet ac. Mauris dapibus, diam ut dapibus dignissim, leo turpis sagittis felis, nec ultricies ex mi ut nunc. Morbi ultrices a sem a vulputate. Morbi pulvinar porttitor elit, at varius dolor accumsan gravida. Ut facilisis justo eu lectus elementum, in varius nulla faucibus. Nunc vel ipsum ut leo scelerisque porta eu sed nisl.
      </p>
      <p>
      Fusce bibendum eget erat eu tempus. Donec nec commodo mauris. Mauris sit amet diam eu est malesuada imperdiet. Nam dictum, nisi quis semper feugiat, ligula metus efficitur mauris, quis condimentum quam ipsum vitae velit. Cras vel eros quis mauris maximus imperdiet. Nunc quis neque eget ligula imperdiet finibus. Donec urna elit, facilisis sit amet felis in, imperdiet suscipit dolor. Nunc malesuada rhoncus interdum. Maecenas a elit nec leo semper dictum.
      </p>
      <p>
      Nam id eros et odio vulputate mollis id eu ligula. Nam nec tincidunt odio, et vehicula velit. Fusce vehicula vel massa ut tristique. Curabitur sollicitudin augue porta elit fringilla, vel dignissim quam imperdiet. In dapibus cursus est sit amet maximus. Duis eros ex, tristique sit amet nulla vel, facilisis consectetur massa. Cras ac nisl sit amet nunc porta suscipit. Donec ut pellentesque lorem. In aliquam enim ut libero gravida, eget gravida odio rutrum. Integer eu enim ut justo dictum feugiat non quis sem. Donec risus ex, posuere rutrum sollicitudin vel, imperdiet id arcu. Vestibulum dapibus purus at tortor tempus cursus. Cras aliquet sapien nec posuere porta.
      </p>

       
      </div>
    );
  }
}

export default App;
