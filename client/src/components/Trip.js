import React from 'react'
import Location from './Location'

class Trip extends React.Component {
  state = {
    show: false,
    editing: false,
    name: this.props.name,
  }

  showLocations = () => {
    this.props.showTrip(this.props.id)
    this.setState({show: true})
  }

    handleChange = (e) => {
      let{ name, value}= e.target;
      this.setState({ [name]: value })

    }

    handleSubmit = (e) => {
      e.preventDefault();
      const {updateTrip, id} = this.props;
      updateTrip(id, this.state.name)
      this.setState({ editing: false})
    }

  render(){
    const {updateLocation, deleteLocation, addLocation} = this.props;
    const locationProps = {updateLocation, deleteLocation, addLocation}
    if(this.state.editing){
      return (
        <div>
          <form
            className="col s14"
            onSubmit={this.handleSubmit}
            >
            <input
              value= {this.state.name}
              onChange={this.handleChange}
              name="name"
              type= "text"
            />
          </form>
          <button onClick ={() => this.setState({editing: false})}
            >Cancel </button>
        </div>

      )
    } else {
      return (
        <div>
          <h3>{this.props.name}</h3>
          {this.state.show ?
            <ul>{this.props.locations.map(l =>
              <Location key={l.id} {...l} {...locationProps}/>
                )}
            </ul>
          :
          <div></div>

          }
          <button
            className="btn"
            onClick={this.showLocations}
            >Show Locations</button>
          <button
          className="btn"
          onClick={() => this.setState({ editing: true})}
          > Edit </button>
          <button
          className="btn"
          onClick={() => this.props.deleteTrip(this.props.id)}
          > Delete </button>
        </div>
      )
    }
  }
}

export default Trip;
