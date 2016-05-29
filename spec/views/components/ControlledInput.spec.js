import React from 'react'
import { shallow } from 'enzyme'

import ControlledInput from 'views/components/ControlledInput/ControlledInput.js'

describe('Components:: ControlledInput', function(){

  const props = {
    placeholder: '',
    className: '',
    value: '',
    initVal: '',
    onChange: f => f,
    changeHandler: f => f,
    setVal: f => f
  }

  it('renders an input', function(){
    const wrapper = shallow(<ControlledInput {...props} />)
    expect( wrapper.is('input') ).to.be.true
  })

  it('triggers onChange', function(){
    const handler = sinon.spy()
    const wrapper = shallow(<ControlledInput {...props} onChange={handler} />)
    wrapper.simulate('change')

    expect( handler.called ).to.be.true
  })

  it('assigns className', function(){
    const wrapper = shallow(<ControlledInput {...props} className={'myClass'} />)
    expect( wrapper.hasClass('myClass') ).to.be.true
  })

})

