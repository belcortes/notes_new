import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';

export const NoteListHeader = (props) => {
	return (
		<div>
			<button onClick={ () => {
				props.meteorCall('notes.insert', (err, res) => {
					if(res) {
						props.Session.set('selectedNoteId', res)
					}
				})}
			}>New Note</button>
		</div>
	)
};

NoteListHeader.propTypes = {
	meteorCall: PropTypes.func.isRequired,
	Session: PropTypes.object.isRequired
}

export default createContainer(() => {
  return {
  	meteorCall: Meteor.call,
  	Session
  }
}, NoteListHeader);