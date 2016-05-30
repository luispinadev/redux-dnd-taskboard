import React from 'react'
import { shallow } from 'enzyme'

import modal from 'views/enhancers/modal'
import styles from 'views/enhancers/modal/modal.styl'

describe('Enhancers:: modal', function(){

  // NOT WORKING, ReactShallowRenderer considers WrappedComp invalid :S
  it('renders backdrop div', function(){
    
    const WrappedComp = modal(
      () => <div>dummy</div>,
      { }
    )
    
    const wrapper = shallow( WrappedComp )
    
    expect( wrapper.find('.'+styles.backdrop) ).to.have.length(1)

  })

})

