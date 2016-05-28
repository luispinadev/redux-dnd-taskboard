import React from 'react'
import { shallow } from 'enzyme'

import CreateBoardControl from 'views/components/CreateBoardControl/CreateBoardControl.js'
import styles from 'views/components/CreateBoardControl/createBoardControl.styl'

describe('Components:: CreateBoardControl', function(){

  it('is a wrapper div', function(){
    const wrapper = shallow(<CreateBoardControl onClick={a => a}/>)
    expect( wrapper.hasClass(styles.wrapper) ).to.be.true
  })

  it('renders container div', function(){
    const wrapper = shallow(<CreateBoardControl onClick={a => a}/>)
    expect( wrapper.find('.'+styles.container) ).to.have.length(1)
  })

  it('renders clickable area', function(){
    const wrapper = shallow(<CreateBoardControl onClick={a => a}/>)
    expect( wrapper.find('.'+styles.clickArea) ).to.have.length(1)
  })

  it('triggers creatBoard handler on click', function(){
    const handler = sinon.spy()
    const wrapper = shallow(<CreateBoardControl onClick={handler} />)
    wrapper.find('.'+styles.clickArea).simulate('click')
    
    expect( handler.called ).to.be.true
  })


})

