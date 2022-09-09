import React ,{Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation.js';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition.js';
import Logo from './Components/Logo/Logo.js';
import Signin from './Components/signin/Signin.js';
import Register from './Components/Register/Register.js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm.js';
import Rank from './Components/Rank/Rank.js';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const initialState={
    input :'',
    imageurl :'',
    box:{},
    route:'signin',
    isSignedIn: false,
    user:{
      id : '',
      name: '',
      email: '',
      entries: 0,
      joined: ''

    }
}

const Particleoption ={
  
                particles: {
                number:{
                  value:100,
                   density:{
                    enable:true,
                    value_area:700
                   }
                }
            }}

const app = new Clarifai.App({
 apiKey: 'b91443ef9fc1445d95ead9abd4ae289e'
});


class App extends  Component {

 constructor() {
  super();
  this.state = initialState;
 }

  loadUser = (data) => {
    this.setState({user: {
      id : data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

 displayFaceBox = (box) =>{
  this.setState({box:box});
 }

 onInputChange = (event) => {

  this.setState({input: event.target.value});
 }

 onButtonSubmit = () => {
  this.setState({imageurl: this.state.input});
  app.models
.predict(
    Clarifai.FACE_DETECT_MODEL,
    this.state.input)
    .then(response => {
      if(response){
        fetch('http://localhost:3001/image',{
        method: 'put',
        headers: { 'Content-Type':'application/json'},
        body: JSON.stringify({
        id: this.state.user.id
      })
    })
        .then(response => response.json())
        .then(count => {
         this.setState(Object.assign(this.state.user, {entries : count}))
        })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
 }

 onRouteChange = (route) =>{
  if(route=== 'signin'){
    this.setState(initialState)
  }
  else if(route==='home')
  {
    this.setState({isSignedIn: true})
  }
  this.setState({route: route});
 }

  render(){
    return (
   <div>
        <Particles className='particles'
                params={Particleoption} />
       <div className="App bg-light-red" style={{ display:'flex' ,justifyContent: 'space-between' }}> 
         <Logo />
         <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
       </div>
        {  this.state.route==='home' 
          ? <div>
           <Rank name={this.state.user.name} entries={this.state.user.entries}/>
           <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
           <FaceRecognition box={this.state.box} imageurl={this.state.imageurl}/>
           </div>
           :(this.state.route==='signin'
            ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )}
   </div>
  );
  }
  
}

export default App;
