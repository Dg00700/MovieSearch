import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MovieRow from './MovieRow.js'
import $ from 'jquery'

class App extends Component {
  constructor(props) {
    super(props)
    this.state={} 
    
    this.performSearch("avengers")
  }

performSearch(searchTerm) {
  console.log("Perform")
  const urlString="https://api.themoviedb.org/3/search/movie?api_key=0088244b62735ee75855419c051976f5&query="+searchTerm
  $.ajax({
     url:urlString,
     success:(searchResults)=> {
        console.log("SUCESSS")
        const results=searchResults.results

        var movieRows=[]
        results.forEach((movie)=>
        { 
          console.log("SSSS"+movie.poster_path)
          movie.poster_src="https://image.tmdb.org/t/p/w185"+movie.poster_path
          const movieRow=<MovieRow key={movie.id} movie={movie}></MovieRow>
          movieRows.push(movieRow)
        })

        this.setState({rows:movieRows})
     },
     error:(xhr,status,err) =>{
      console.error("FAILED")
     }
  })
}
searchChangeHandler(event) {
  const bound=this
  const searchTerm=event.target.value
  bound.performSearch(searchTerm)
}

render() {
  return (
    <div >
      <table className="titleBar">
        <tbody>
          <tr>
            <td>
              <img alt="app icon" width="60" height="75" src={logo}></img>
            </td>
            <td width="8"></td>
            <td>
              <h1>MoviesDB search</h1>
            </td>
          </tr>
        </tbody>
      </table>
      

      <input style={{
        fontSize:24,
        display:'block',
        width:"99%",
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:16

      }} onChange={this.searchChangeHandler.bind(this)} placeholder="Enter Search "></input>
      {this.state.rows}

    </div>
  );
}
}
export default App;
