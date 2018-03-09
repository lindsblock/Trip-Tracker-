import React, { Component } from 'react';
import axios from 'axios'
import TripForm from './components/TripForm';
import TripList from './components/TripList';

class App extends Component {
  state = { trips: [],
            locations: [],
          }

  componentDidMount(){
    axios.get('/api/trips')
    .then(res => {
      this.setState({ trips: res.data })
    })
  }
//PROPS are here they go to trip list as ...props
  showTrip = (id) => {
    axios.get(`/api/trips/${id}/locations`)
    .then( res =>{
      this.setState({locations: res.data })
    })
  }

  addTrip = (name) => {
    let trip = {name}
    axios.post('/api/trips', trip)
    .then( res => {
    this.setState({ trips: [res.data, ...this.state.trips] })
    })
  }

  updateTrip = (id, name) => {
    let trip = {name}
    axios.put(`/api/trips/${id}`, trip)
    .then(res => {
      let trips = this.state.trips.map( t => {
        if (t.id === id)
          return res.data
        return t
      })
      this.setState({ trips })
    })
  }

  deleteTrip = (id) => {
    const {trips} = this.state;
    axios.delete(`/api/trips/${id}`)
    .then (res => {
      console.log(res)
      this.setState({ trips: trips.filter( t => t.id !== id)})
    })

  }

  addLocation = (location) => {

  }

  updateLocation =  (location) => {

  }

  deleteLocation = (trip_id, id) => {
    const { locations } = this.state;
    axios.delete(`/api/trips/${trip_id}/locations/${id}`)
    .then (res => {console.log(res)
    this.setState({locations: locations.filter(t => t.id !== id )})
  })
  }

  render() {
    return (
      <div className="container">
        <TripForm addTrip ={this.addTrip} />
        <TripList
          trips= {this.state.trips}
          locations={this.state.locations}
          updateTrip={this.updateTrip}
          deleteTrip={this.deleteTrip}
          showTrip ={this.showTrip}
          deleteLocation={this.deleteLocation}
          updateLocation={this.updateLocation}
          addLocation={this.addLocation}
        />
      </div>

    );
  }
}

export default App
