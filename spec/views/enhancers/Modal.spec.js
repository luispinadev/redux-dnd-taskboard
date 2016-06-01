import React from 'react'
import { shallow } from 'enzyme'

import modal from 'views/enhancers/modal'
import styles from 'views/enhancers/modal/modal.styl'

describe('Enhancers:: modal', function(){

  const genWrappedComp = (hoc, modalOptions = {}, props = {}) => 
    hoc( () => React.createElement('div'), modalOptions)(props)

  it('renders backdrop div', function(){
    const wrapper = shallow( genWrappedComp(modal) )
    expect( wrapper.find('.'+styles.backdrop) ).to.have.length(1)
  })

  // it('closes on backdrop click', function(){
  //   const wrapper = shallow( genWrappedComp(modal, {}, { modalClose: }) )
  //   expect( wrapper.find('.'+styles.backdrop) ).to.have.length(1)
  // })

  // it('closes on closeButton click', function(){
  //   const wrapper = shallow( genWrappedComp(modal, {}, { modalClose: }) )
  //   expect( wrapper.find('.'+styles.backdrop) ).to.have.length(1)
  // })

  // etc.. for other possible options
})

