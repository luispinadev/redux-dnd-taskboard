import React from 'react'
import { shallow } from 'enzyme'

import CreateCardControl from 'views/components/CreateCardControl/CreateCardControl'
import EditingCard from 'views/components/Card/EditingCard'
// import modal from 'views/enhancers/modal'
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

  // NOT WORKING with Card wrapped by modal HOC..
  it('Renders a modal wrapped EditingCard component in editing state when "isCreating" === true', function(){
    // const ModalCard = modal(EditingCard, {})({})
    const wrapper = shallow(<CreateCardControl {...props} isCreating={true} />)

    expect( wrapper.find(EditingCard) ).to.have.length(1)
  })


})

