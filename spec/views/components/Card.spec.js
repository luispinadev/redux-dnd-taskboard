
import React from 'react'
import { shallow } from 'enzyme'
// import { List } from 'immutable'

import styles from 'views/components/Card/Card.styl'
import Card from 'views/components/Card/Card'
import EditingCard from 'views/components/Card/EditingCard'
import ControlledInput from 'views/components/ControlledInput'

describe('Components:: Card', function(){
  const props = { 
    cardID: 'ID',
    deleteCard: f => f,
    text: 'Lorem to the ipsum',
    setText: f => f,
    startEdit: f => f,
    stopEdit: f => f,
    isEditing: false,
    onEdit: f => f,
    onSave: f => f,
    onCancel: f => f,
    setInputText: f => f,
    inputText: 'Lorem to the ipsum',
    onDelete: f => f
  }

  describe('Card', function(){

    it('renders a wrapper div', function(){
      const wrapper = shallow(<Card {...props} />)
      expect( wrapper.hasClass(styles.wrapper) ).to.be.true
    })

    it('renders a container div', function(){
      const wrapper = shallow(<Card {...props} />)
      expect( wrapper.find('.'+styles.container) ).to.have.length(1)
    })

    it('renders task text div', function(){
      const wrapper = shallow(<Card {...props} />)
      const textDiv = wrapper.find('.'+styles.text) 

      expect(textDiv).to.have.length(1)
      expect(textDiv.text()).to.equal(props.text)
    })

    it('renders controls block', function(){
      const wrapper = shallow(<Card {...props} />)
      expect( wrapper.find('.'+styles.controlsBlock) ).to.have.length(1)
    })

    it('"onDelete" is called when delete button is clicked', function(){
      const handler = sinon.spy()
      const wrapper = shallow(<Card {...props} onDelete={handler}/>)
      wrapper.find('.fa-trash-o').simulate('click')

      expect( handler.called ).to.be.true
    })

    it('"onEdit" is called when edit button is clicked', function(){
      const handler = sinon.spy()
      const wrapper = shallow(<Card {...props} onEdit={handler}/>)
      wrapper.find('.fa-pencil').simulate('click')

      expect( handler.called ).to.be.true
    })
  })
  
  describe('EditingCard', function(){

    it('renders a wrapper div', function(){
      const wrapper = shallow(<EditingCard {...props} />)
      expect( wrapper.hasClass(styles.wrapper) ).to.be.true
    })

    it('renders a container div', function(){
      const wrapper = shallow(<EditingCard {...props} />)
      expect( wrapper.find('.'+styles.container) ).to.have.length(1)
    })

    it('renders controls block', function(){
      const wrapper = shallow(<EditingCard {...props} />)
      expect( wrapper.find('.'+styles.controlsBlock) ).to.have.length(1)
    })

    it('renders a ControlledInput when "isEditing" is true', function(){
      const wrapper = shallow(<EditingCard {...props} />)
      expect( wrapper.find(ControlledInput) ).to.have.length(1)
    })

    it('"onSave" is called when save button is clicked while editing', function(){
      const handler = sinon.spy()
      const wrapper = shallow(<EditingCard {...props} onSave={handler}/>)
      wrapper.find('.fa-check').simulate('click')

      expect( handler.called ).to.be.true
    })

    it('"onCancel" is called when cancel button is clicked while editing', function(){
      const handler = sinon.spy()
      const wrapper = shallow(<EditingCard {...props} onCancel={handler}/>)
      wrapper.find('.fa-times').simulate('click')

      expect( handler.called ).to.be.true
    })

  })

  describe('dndCardHOC',function(){

    describe('drag source',function(){
      it('handles beginDrag')
      it('handles isDragging')
      it('handles endDrag')
    })

    describe('drop target',function(){
      it('handles hover')
      it('handles drop')
    })

  })


})

