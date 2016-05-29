import React from 'react'
import { shallow } from 'enzyme'

import CreateCardControl from 'views/components/CreateCardControl/CreateCardControl'
import Card from 'views/components/Card/Card'
import styles from 'views/components/CreateCardControl/createCardControl.styl'

describe('Components:: CreateCardControl', function(){

  const props = {
    createCard: f => f,
    startCreate: f => f,
    stopCreate: f => f,
    setInputText: f => f,
    isCreating: false,
    inputText: '',
    onSave: f => f,
    onCancel: f => f
  }

  // it('is a ... div', function(){
  //   const wrapper = shallow(<CreateCardControl onClick={a => a}/>)
  //   expect( wrapper.hasClass(styles.wrapper) ).to.be.true
  // })

  it('triggers "startCreate" on click', function(){
    const handler = sinon.spy()
    const wrapper = shallow(<CreateCardControl {...props} startCreate={handler} />)
    wrapper.find('.'+styles.createButton).simulate('click')

    expect( handler.called ).to.be.true
  })

  it('Shows a Card component in editing state when "isCreating" === true', function(){
    const wrapper = shallow(<CreateCardControl {...props} isCreating={true} />)
    expect( wrapper.find(Card) ).to.have.length(1)
  })

  // it('triggers creatCard handler on click', function(){
  //   const handler = sinon.spy()
  //   const wrapper = shallow(<CreateCardControl onClick={handler} />)
  //   wrapper.find('.'+styles.clickArea).simulate('click')
    
  //   expect( handler.called ).to.be.true
  // })


})

