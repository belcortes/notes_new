import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';

import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem'

export class NoteList extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	search: ''
    };
  }

  updateSearch(e) {
  	this.setState({search: e.target.value})
  }

	render() {
		let filteredNotes = this.props.notes.filter((note) => {
			if (note.title.indexOf(this.state.search) !== -1) {
        return note
      };
		})

		return (
			<div className='item-list'>
				<NoteListHeader />
				<div className='item-list__search'><input type='text' placeholder='Search' onChange={this.updateSearch.bind(this)} /></div>
				{ this.props.notes.length === 0 ? <NoteListEmptyItem /> : undefined }
				
				{	filteredNotes.map((note) => {
					return <NoteListItem key={note._id} note={note} />
				}) }
			</div>
		)
	}	
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