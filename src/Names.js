import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import DeleteProfile from './DeleteProfile';
// const DELETE_PROFILE = gql`
// mutation deleteName($itemId: ID) {
// 	delete_profile(where: { id: { _eq: $itemId } }) {
// 		affected_rows
// 	}
// }
// `

// const handleDel = (deleteName, id, e) => {
// 	console.log(id);
// }

const Names = () => (
	<Query
	query={gql`
		{
			profile {
				id
				name
			}
		}
		`}
		>
		{({ loading, error, data }) => {
			if (loading) return <p>Wait for it....</p>
				if (error) return <p>Something went wrong...</p>
					return (
						<div>
						{data.profile.map((dat) => {
							return <p key={dat.id}>{dat.name}
							<DeleteProfile itemId={dat.id} />
							</p>
							// <Mutation mutation={DELETE_PROFILE} variable={ dat.id }>
							 // {deleteName => (
							// 	<button onClick={deleteName}>
							// 	(Delete)</button>
								// <button onClick={handleDel.bind(this, deleteName, dat.id)}>(delete)</button>
							// 	)}
							// </Mutation>
						})}
						</div>
						)
			}}
			</Query>
			)

export default Names;