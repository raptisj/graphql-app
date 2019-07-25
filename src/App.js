import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import './App.scss';
import Names from './Names';
import AddNames from './Form';

const client = new ApolloClient({
	// uri: 'http://192.168.99.100:8080/v1alpha1/graphql', // docker local server
	uri: 'https://ql-endpoint.herokuapp.com/v1/graphql' 
})

const App = () => (
	<ApolloProvider client={client}>
		<div className="wrapper">
			<header className="wrapper__header">
				<h1>The Famous To-Do App</h1>
				<span>With React, GraphQL and Hasura</span>
			</header>
			<AddNames />
			<Names />
		</div>
	</ApolloProvider>
	)

export default App;
