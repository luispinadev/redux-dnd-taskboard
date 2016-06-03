import React from 'react'
import { shallow } from 'enzyme'

import CreateBoardControl from 'views/components/CreateBoardControl/CreateBoardControl.js'
import styles from 'views/components/CreateBoardControl/createBoardControl.styl'

describe('Components:: CreateBoardControl', function(){

  it('renders container div', function(){
    const wrapper = shallow(<CreateBoardControl onClick={a => a}/>)
    expect( wrapper.is('.'+styles.container) ).to.be.true
  })

  it('triggers creatBoard handler on click', function(){
    const handler = sinon.spy()
    const wrapper = shallow(<CreateBoardControl onClick={handler} />)
    wrapper.find('.'+styles.container).simulate('click')
    
    expect( handler.called ).to.be.true
  })

})

