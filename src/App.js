import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import './App.css';
import Names from './Names';
import AddNames from './Form';

const client = new ApolloClient({
	uri: 'http://192.168.99.100:8080/v1alpha1/graphql',
})

const App = () => (
	<ApolloProvider client={client}>
		<div className="App">
			<header className="App-header">
				<h1>Greetings from ...</h1>
				<Names />
				<AddNames />
			</header>
		</div>
	</ApolloProvider>
)

export default App;
