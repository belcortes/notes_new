import React from 'react';
// import { Mongo } from 'meteor/mongo';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';

import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem'

export const NoteList = (props) => {

	return (
		<div className='item-list'>
			<p>note list {props.notes.length}</p>
			<NoteListHeader />
			{ props.notes.length === 0 ? <NoteListEmptyItem /> : undefined }
			{	props.notes.map((note) => {
				return <NoteListItem key={note._id} note={note} />
			}) }
		</div>
		
	)
}

export default createContainer(() => {
	const selectedNoteId = Session.get('selectedNoteId')
  Meteor.subscribe('notes');

  return {
  	notes: Notes.find({}, {sort: {updatedAt: -1}}).fetch().map((note) => {
  		return  {
  			...note,
  			selected: note._id === selectedNoteId
  		}
  	})
  }
}, NoteList);

NoteList.propTypes = {
	notes: PropTypes.array.isRequired
}