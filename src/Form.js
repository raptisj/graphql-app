import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
// import uuid from 'uuid/v1';

const POST_NAME = gql`
mutation insert_profile (
$name: String
) {
	insert_profile(
	objects: [
	{
		name: $name
	}
	]
	) {
		returning {
			name
		}
	}
}
`

class AddNames extends Component {

	state = {
		name: ''
	}

	render() {
		const { name } = this.state
		return (
			<div>
			<input
			value={name}
			onChange={e => this.setState({ name: e.target.value })}
			type="text"
			placeholder="add name"
			/>
			<Mutation mutation={POST_NAME} variables={{ name }}>
			{postName => (
				<button onClick={postName}>
				Submit
				</button>
				)}
			</Mutation>
			</div>
		)
	}
}

export default AddNames;