import React, { Component } from 'react';
import contactPic from './Images/contactimage.jpg';
import danny from './headshots/danny.jpg';
import gilbert from './headshots/gilbert.jpg';
import ryan from './headshots/ryan.jpg';
import sarahrose from './headshots/sarahrose.jpg';
import logan from './headshots/logan.jpg';



export default class ContactPage extends Component {
      render() {
        return (
          <div>
            <div className="contactContainer">
              <div className="contactInfo">
              <h2>Discover our team</h2>
            </div>
            <div className="office">
              <h3>Danny Locke</h3>
              <img className="headshot" src={danny}></img>
              <p>Future Back End Developer</p>
              <a href="https://github.com/DannyLocke">GitHub</a><br/>
              <a href="https://www.linkedin.com/in/dannylocke">LinkedIn</a>
            </div>
            <div className="office">
              <h3>Gilbert Akpan</h3>
              <img className="headshot" src={gilbert}></img>
              <p>Future Back End Developer</p>
              <a href="https://github.com/gilbertojnr">GitHub</a><br/>
              <a href="https://www.linkedin.com/in/gilbert-akpan-a672b7115">LinkedIn</a>
            </div>
            <div className="office">
              <h3>Ryan Kielty</h3>
              <img className="headshot" src={ryan}></img>
              <p>Future Back End Developer</p>
              <a href="https://github.com/ryankielty">GitHub</a><br/>
              <a href="https://www.linkedin.com/in/rpkielty">LinkedIn</a>
            </div>
            <div className="office">
              <h3>Sarah Rose Battles</h3>
              <img className="headshot" src={sarahrose}></img>
              <p>Future Front End Developer</p>
              <a href="https://github.com/srosebattles">GitHub</a><br/>
              <a href="https://www.linkedin.com/in/sarah-rose-battles-b9333773">LinkedIn</a>
            </div>
            <div className="office">
              <h3>Logan Hussung</h3>
              <img className="headshot" src={logan}></img>
              <p>Future Java Developer</p>
              <a href="https://github.com/LoganHussung">GitHub</a><br/>
              <a href="https://www.linkedin.com/in/logan-hussung">LinkedIn</a>
            </div>
            <img className="contactImage" role="presentation" src={contactPic} />
          </div>
        </div>
        );
      }
    }
