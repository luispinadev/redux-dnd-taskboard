import React from 'react'
import { shallow, mount } from 'enzyme'

import CreateCardControl from 'views/components/CreateCardControl/CreateCardControl'
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

  it('triggers "startCreate" on click', function(){
    const handler = sinon.spy()
    const wrapper = shallow(<CreateCardControl {...props} startCreate={handler} />)
    wrapper.find('.'+styles.createButton).simulate('click')

    expect( handler.called ).to.be.true
  })

  it('Renders a modal wrapped EditingCard component when "isCreating" === true', function(){

    const wrapper = mount(<CreateCardControl {...props} isCreating={true} />)

    expect( wrapper.find('.'+styles.cardInput) ).to.have.length(1)
  })


})

