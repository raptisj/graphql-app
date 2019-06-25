import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const DELETE_PROFILE = gql`
mutation DeleteProfile($itemId: ID) {
	delete_profile(where: { id: { _eq: $itemId } }) {
		affected_rows
	}
}
`

class DeleteProfile extends Component {
	render() {
		return (
		<Mutation mutation={DELETE_PROFILE}>
		 {delete_profile => (
			<button onClick={() => {
				delete_profile({ 
					variables: { itemId: this.props.itemId }
				})
			}}>
			(Delete)</button>
			)}
		</Mutation>
		);
	}
}

export default DeleteProfile;