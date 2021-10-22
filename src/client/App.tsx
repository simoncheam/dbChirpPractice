import * as React from 'react';
import { useState, useEffect } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import NotFound from './views/NotFound';
import UserOverview from './views/UserOverview';
import UserDetails from './views/UserDetails';
import ChirpDetail from './views/ChirpDetail';
import Edit from './views/Edit';
import Create from './views/Create';
import CreateUser from './views/CreateUser';


const App = ()=> {

	return(

		<BrowserRouter>
			{/* insert navbar */}
			<Navbar />

			<div className="container">
				<Switch>
					{/* route to Home, list all chirps */}
					<Route exact path="/">
						<Home/>
					</Route>


					{/* timeline of all chirps */}
					<Route exact path="/overview">
						<UserOverview/>


					</Route>

					{/* Single Chirp Detail Page */}
					<Route exact path="/chirps/:chirp_id"> 
						<ChirpDetail/>

					</Route>

					{/* Create Chirp  Page */}
					<Route exact path="/create"> 
						<Create/>
					</Route>

					{/* Create User  Page */}
					<Route exact path="/createUser"> 
						<CreateUser/>
					</Route>


						
				
					{/* Edit Chirp by ID */}
					<Route exact path="/chirps/:chirp_id/edit"> 
						<Edit/>
					</Route>

					{/* Single User Detail Page */}
					<Route exact path="/users/:user_id"> 
						<UserDetails/>

					</Route>



					<Route  path = "*">
						<NotFound/>
									
					</Route>

				</Switch>
			</div>
		
		</BrowserRouter>





	)
}




export default App;
