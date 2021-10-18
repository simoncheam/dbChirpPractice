import * as React from 'react';
import { useState, useEffect } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Overview from './views/Overview';
import Navbar from './components/Navbar';
import OverviewDetails from './views/OverviewDetails';
import Home from './views/Home';
import NotFound from './views/NotFound';



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
						<Overview />


					</Route>

					{/* list all chirps from user_id */}
					<Route exact path="/overview/:user_id"> 
					<OverviewDetails />

					</Route>

					<Route exact path="/overview/:user_id/edit"> 

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
