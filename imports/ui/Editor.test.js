import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Editor } from './Editor';
import { notes } from '../fixtures/fixtures'

if (Meteor.isClient) {
  describe('Editor', function () {
    let browserHistory;
    let call;

    beforeEach( function() {
      call = expect.createSpy();
      browserHistory = {
        push: expect.createSpy()
      }
    })

    describe('render', function() {
      it('should render pick note message', function () {
        const wrapper = mount(<Editor call={call} browserHistory={browserHistory} />);

        expect(wrapper.find('p').text()).toBe('Pick or create a note to get started')
      });

      it('should render note not found message', function() {
        const wrapper = mount(<Editor call={call} browserHistory={browserHistory} selectedNoteId={notes[0]._id} />);

        expect(wrapper.find('p').text()).toBe('Note not found')
      });
    })
    
    describe('remove', function() {
      it('should remove note', function() {
        const wrapper = mount(<Editor call={call} browserHistory={browserHistory} note={notes[0]} selectedNoteId={notes[0]._id} />);

        wrapper.find('button').simulate('click');

        expect(call).toHaveBeenCalled('notes.remove', notes[0]._id)
        expect(browserHistory.push).toHaveBeenCalledWith('/dashboard')
      });
    })
    

    describe('update', function() {
      it('should update when body changes in textarea', function() {
        const newBody = 'New body testing'
        const wrapper = mount(<Editor call={call} browserHistory={browserHistory} note={notes[0]} selectedNoteId={notes[0]._id} />);

        wrapper.find('textarea').simulate('change', {
          target: {
            value: newBody
          }
        });

        expect(wrapper.state('body')).toBe(newBody);
        expect(call).toHaveBeenCalled('notes.update', notes[0]._id, {body: newBody});
      });

      it('should update when title changes in input', function() {
        const newTitle = 'New title testing'
        const wrapper = mount(<Editor call={call} browserHistory={browserHistory} note={notes[0]} selectedNoteId={notes[0]._id} />);

        wrapper.find('input').simulate('change', {
          target: {
            value: newTitle
          }
        });

        expect(wrapper.state('title')).toBe(newTitle);
        expect(call).toHaveBeenCalled('notes.update', notes[0]._id, {title: newTitle});
      })

      it('should set state for new note', function() {
        const wrapper = mount(<Editor call={call} browserHistory={browserHistory} selectedNoteId={notes[0]._id} />);
        
        wrapper.setProps({
          selectedNoteId: notes[0]._id,
          note: notes[0]
        }) 

        expect(wrapper.state('title')).toBe(notes[0].title)
        expect(wrapper.state('body')).toBe(notes[0].body)
      })

      it('should not set state if note props not provided', function() {
        const wrapper = mount(<Editor call={call} browserHistory={browserHistory} selectedNoteId={notes[0]._id} />);
        
        wrapper.setProps({
          selectedNoteId: notes[0]._id
        }) 

        expect(wrapper.state('title')).toBe('')
        expect(wrapper.state('body')).toBe('')
      })
    })
    

  });
}
