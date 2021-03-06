import React from 'react';
import './main.css';
import './forms.css';
import {putArtistogram, saveDestination} from '../actions';
import { connect } from 'react-redux';
import LogIn from './log-in';
import NavBar from './nav-bar';

export class SaveArtistogram extends React.Component {
  handleSaveArtistogram(event) {
    event.preventDefault();
    const name = this.textInput.value;
    const artistogramData = {
      username: this.props.username,
      name,
      imageUrl: this.props.focalArtist.imageUrl
    };
    this.props.dispatch(putArtistogram(artistogramData, this.props.history));
  }
  componentDidMount() {
    this.props.dispatch(saveDestination('/save-artistogram'));
  }
  render() {
    if(this.props.loggedIn) {
      const artistogramTitle = this.props.focalArtist.name;
      return (
        <section>
          <NavBar links={[]} title="" />
          <form>
            <fieldset>
              <label for="title">
                Artistogram Title
                <input
                  type="text"
                  id="title"
                  ref={input => this.textInput = input}
                  defaultValue={artistogramTitle} />
              </label>
                <button
                  onClick={event => this.handleSaveArtistogram(event)}>
                    Save Artistogram
                </button>
            </fieldset>
          </form>
        </section>
      )
    } else {
      return <LogIn />
    }
  }
}

const mapStateToProps = (state, props) => ({
  focalArtist: state.focalArtist,
  username: state.username,
  loggedIn: state.loggedIn
});

export default connect(mapStateToProps)(SaveArtistogram);
