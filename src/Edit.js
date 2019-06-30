import React, { useState, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { query } from './Names';

const UPDATE_PROFILE = gql`
mutation updateName($id: Int, $name: String) {
	update_profile(where: {id: {_eq: $id}},
	_set: {
		name: $name
	}) {
			returning {
				id
				name
			}
		}
}
`


const EditItem = (props) => {
	const [singleName, setSingleName] = useState(props.datEdit.name);

		return (
			<Fragment>
			{/*<form>*/}
							<input type="text" className="edit__input" value={singleName} onChange={e => setSingleName(e.target.value)} />
							<Mutation mutation={UPDATE_PROFILE}>
							{updateName => (
								<div className="update__outer-btn">
								<button
								className="update__btn"
								onClick={() => updateName({
									variables: {
										name: singleName,
										id: props.datEdit.id
									},
									update: (store, { data }) => {
										const stored = store.readQuery({
											query
										});
										store.writeQuery({ 
											query,
											data: { 
												profile: [...stored.profile, ]
											} 
										});
									}
								})}>
								Update</button>
								</div>
								)}
							</Mutation>
							{/*</form>*/}
			</Fragment>
		)
}

export default EditItem;