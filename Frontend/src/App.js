import { Checkbox, TextInputMain } from './components/Inputs';
import Todolist from './pages/Todolist';
import Login from './pages/Login';
import ErrorBoundary from './pages/ErrorBoundary';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './pages/Register';
import { useEffect, useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
const { Button, AddButton, RoundButton } = require('./components/Buttons');

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	useEffect(() => {
		fetch('/api/user/current').then((resp) => {
			if (!resp.ok) {
				setLoggedIn(false);
			} else {
				setLoggedIn(true);
			}
		});
	}, []);
	return (
		<div className='App'>
			<ErrorBoundary>
				{/* We could protect the route by storing a value in the localStorage or isLogged in. 
                This will not add more security to the app but for UX purpose,the user will not see the 
                Page title if he/she can't access to it  */}
				{/* <Route path="/todolist" exact component={isAuth ? <Todolist /> : <Redirect path="/" />} ></Route> */}

				<Router>
					<Switch>
						<ProtectedRoute
							path='/'
							exact
							component={Todolist}
							user={loggedIn}
						/>
						<Route path='/login' exact component={Login} />
						<Route path='/register' exact component={Register} />
					</Switch>
				</Router>
			</ErrorBoundary>
			{/* <Login /> */}
		</div>
	);
}

export default App;
