import React, { useState, Fragment, useEffect } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const DELETE_PROFILE = gql`
mutation deleteName($id: Int) {
	delete_profile(where: { id: { _eq: $id } }) {
		affected_rows
	}
}
`

const UPDATE_PROFILE = gql`
mutation updateName($id: Int, $name: String) {
	update_profile(where: {id: {_eq: $id}},
	_set: {
		name: $name
	}) {
		affected_rows
	}
}
`

export const query = gql`
{
	profile {
		id
		name
		editing
	}
}
`;

const Names = () => {
	const [edit, setEdit] = useState(false);
	const [newName, setNewName] = useState('');

	const handleEdit = (index) => {
		const test = [...newName];
		test[index].editing = true;
		// return test;
		console.log(test);
	}

useEffect(() => {
console.log('update update');
})

	return (
		<Query query={query}>
		{({ loading, error, data }) => {
			if (loading) return <p>Wait for it....</p>
				if (error) return <p>Something went wrong...</p>
					setNewName(data.profile);
				return (
					<div>
					{data.profile.map((dat, index) => {
						return (
							<div key={dat.id}>
							{dat.editing ? (
								<Fragment>
								<form>
								<input type="text" />
								</form>
								<Mutation mutation={UPDATE_PROFILE}>
								{updateName => (
									<button 
									onClick={updateName({
										variables: {
											name: newName,
											id: dat.id
										},
										update: (store, { data }) => {
											const stored = store.readQuery({
												query
											});

											store.writeQuery({ 
												query,
												data: {
													profile: console.log(newName)
												} 
											});
										}
									})}>
									Update</button>
									)}
								</Mutation>
								</Fragment>
								) : (
								<Fragment>
								<span>{dat.name}</span>
								<Mutation mutation={DELETE_PROFILE}>
								{deleteName => (
									<button
									onClick={() => {
										deleteName({
											variables: {
												id: dat.id
											},
											update: (store, { data }) => {
												const stored = store.readQuery({
													query
												});
												store.writeQuery({ 
													query,
													data: {
														...stored,
														profile: stored.profile.filter(
															p => p.id !== dat.id
															)
													} 
												});
											}
										});
									}}>
									(Delete)
									</button>
									)}
								</Mutation>

								<button onClick={handleEdit.bind(this, index)}>
								Edit
								</button>
								</Fragment>
								)}


								</div>
								);
					})}
					</div>
					)
			}}
			</Query>
			);
}

export default Names;




