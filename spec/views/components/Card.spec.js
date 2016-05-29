import React from 'react'
import { shallow } from 'enzyme'
// import { List } from 'immutable'

import Card from 'views/components/Card/Card'
import styles from 'views/components/Card/Card.styl'

describe('Components:: Card', function(){
  const props = { 
    cardID: 'ID',
    boardID: 'boardID',
    text: 'Lorem to the ipsum',
    setText: f => f,
    startEdit: f => f,
    stopEdit: f => f,
    isEditing: false,
    onEdit: f => f,
    onSave: f => f,
    onCancel: f => f
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

})

