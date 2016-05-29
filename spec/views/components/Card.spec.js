import React from 'react'
import { shallow } from 'enzyme'
// import { List } from 'immutable'

import Card from 'views/components/Card/Card'
import styles from 'views/components/Card/Card.styl'

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
    onInputChange: f => f,
    inputText: 'Lorem to the ipsum',
    onDelete: f => f
  }

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

  describe('Edit text process', function(){

    it('"onEdit" is called when edit button is clicked', function(){
      const handler = sinon.spy()
      const wrapper = shallow(<Card {...props} onEdit={handler}/>)
      wrapper.find('.fa-pencil').simulate('click')

      expect( handler.called ).to.be.true
    })

    it('"onInputChange" is called when edit button is clicked', function(){
      const handler = sinon.spy()
      const wrapper = shallow(<Card {...props} isEditing={true} onInputChange={handler}/>)
      wrapper.find('input').simulate('change')

      expect( handler.called ).to.be.true
    })

    it('"onSave" is called when save button is clicked while editing', function(){
      const handler = sinon.spy()
      const wrapper = shallow(<Card {...props} isEditing={true} onSave={handler}/>)
      wrapper.find('.fa-check').simulate('click')

      expect( handler.called ).to.be.true
    })

    it('"onCancel" is called when cancel button is clicked while editing', function(){
      const handler = sinon.spy()
      const wrapper = shallow(<Card {...props} isEditing={true} onCancel={handler}/>)
      wrapper.find('.fa-times').simulate('click')

      expect( handler.called ).to.be.true
    })

  })  

})

