import React, {Component} from 'react';
import logo from './GloboLogo.png';
import './main-page.css';
import Header from './header';
import FeaturedHouse from './featured-house';
import HouseFilter from './house-filter';
import SearchResults from '../search-results';
import HouseDetail from '../house';

class App extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }
  state = {}

  componentDidMount() {
    this.fetchHouses();
  }

  fetchHouses = () => {
    fetch('./houses.json')
    .then(rsp => rsp.json())
    .then(allHouses => {
      this.allHouses = allHouses;
      this.determineFeaturedHouse();
      this.determineUniqueCountries();
    })
  }

  determineFeaturedHouse = () => {
    if (this.allHouses) {
      const randomIndex = Math.floor(Math.random() * this.allHouses.length);
      const featuredHouse =  this.allHouses[randomIndex];
      this.setState({ featuredHouse });
    };
  }

  determineUniqueCountries = () => {
    const countries = this.allHouses 
      ? Array.from(new Set(this.allHouses.map(h => h.country))) 
      : [];
    countries.unshift(null);
    this.setState({countries});  
  }

  filterHouses = (country) => {
    this.setState({ activeHouse: null });
    const filteredHouses = this.allHouses.filter((h) => h.country === country);
    this.setState({ filteredHouses });
    this.setState({ country });
  }

  setActiveHouse = (house) => {
    this.setState({ activeHouse: house });
  }

  render() {
    let activeHouseComponent = null;
    if (this.state.country)
      activeHouseComponent = <SearchResults country={this.state.country} 
      filteredHouses={this.state.filteredHouses} setActiveHouse={this.setActiveHouse} />;
    if (this.state.activeHouse)
      activeHouseComponent = <HouseDetail house={this.state.activeHouse}/>;
    if (!activeHouseComponent)
      activeHouseComponent = <FeaturedHouse house={this.state.featuredHouse} />;
    return (
      <div className="container">
        <Header subtitle="Providing house all over the world"/>
        <HouseFilter countries={this.state.countries} filterHouses={this.filterHouses}/>
        {activeHouseComponent}
      </div>
    );
  }
}

export default App;
