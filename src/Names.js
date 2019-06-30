import React, { useState, Fragment, useEffect } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import EditItem from './Edit';

const DELETE_PROFILE = gql`
mutation deleteName($id: Int) {
	delete_profile(where: { id: { _eq: $id } }) {
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
	const [newName, setNewName] = useState();

	const handleEdit = (id, edit) => {
		newName.map(o => {
			if(o.id === id) {
				o.editing = !o.editing;
			}
		}); 
		setEdit(true);
		setNewName(newName);
	}

	useEffect(() => {
		setEdit(false);
	},[edit])

	return (
		<Query query={query}>
		{({ loading, error, data }) => {
			if (loading) return <p>Wait for it....</p>
				if (error) return <p>Something went wrong...</p>
					setNewName(data.profile);
				return (
					<div className="w-100">
					<div className="items">
					{data.profile.map((dat, index) => {
						return (
							<div className="items__each" key={dat.id}>
							{dat.editing ? (

								<Fragment>
								<EditItem dat={dat.id} datEdit={dat} />
								</Fragment>

								) : (
								<Fragment>
								<p>{dat.name}</p>
									<Mutation mutation={DELETE_PROFILE}>
									{deleteName => (
										<div className="delete__outer-btn">
										<button className="delete__btn"
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
										Delete
										</button>
										</div>
										)}
									</Mutation>
								</Fragment>
								)}
									<div className="edit__outer-btn">
										<button className="edit__btn" onClick={handleEdit.bind(this, dat.id, dat.editing)}>
										{dat.editing ? <span>Cancel</span> : <span>Edit</span>}
										</button>
									</div>
								</div>
							);
					})}
					</div>
					</div>
				)
			}}
			</Query>
		);
}

export default Names;




