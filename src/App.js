import React, { Component, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'


const CardList = (props) => {
  return (
    <>
      <div className="card">
        {props.profiles.map(profile => <Card key={profile.id} {...profile} />)}
         <hr className="break"></hr>
      </div>
    </>
  )
}

class Card extends Component {
  render() { 
    const profile = this.props;
    return ( 
      <div className="profile_card">
        <div className="card"
          style={{width: "18rem"}}
          >
          <img className="card-img-top" src = {profile.avatar_url} />
        </div>
        
        <div className="info card">
          <div className="name"><h4>{profile.name}</h4></div>
          <div className="company">{profile.company}</div>
          <div className="email">Repositories: {profile.public_repos}</div>
          <div className="email">Followers: {profile.followers}</div>
          <div className="email">Following: {profile.following}</div>
          <div className="bio">{profile.bio}</div>
          <div className="push">Last Updated: { profile.updated_at}</div>
        </div>
      </div>
     );
  }
}
 
class Form extends Component {
  state = {
    userName: '',
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(resp.data);
    console.log(resp.data);
    this.setState({ userName: '' });
  }
  render() { 
    return ( 
      <form className="form" onSubmit={this.handleSubmit}>
        <input type="text"
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          placeholder="Enter github username"
          required
        />

        <button>Add card</button>

      </form>
     );
  }
}
 
class Profile extends Component {
  state = { 
     profiles: [],
  }
  
  addNewProfile = (profiledata) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profiledata]
    }));
  };

  render() { 
    return ( 
       <div className="git_profile">
      <div className="header">
          <h2>Github Profiles</h2>
          <Form onSubmit={this.addNewProfile} />
          <CardList profiles={this.state.profiles}/>
      </div>
    </div>
     );
  }
}

export default function App() {
  return (
    <Profile />
  );
}
