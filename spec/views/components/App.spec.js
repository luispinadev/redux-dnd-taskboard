import React from 'react'
import { shallow } from 'enzyme'
import { List } from 'immutable'

import App from 'views/components/App/App'
import Board from 'views/components/Board'
import CreateBoardControl from 'views/components/CreateBoardControl'

import styles from 'views/components/App/App.styl'

describe('Components:: App', function(){

  it('is a container div', function(){
    const wrapper = shallow(<App dashboard={List()} />)
    expect( wrapper.hasClass(styles.container) ).to.be.true
  })

  it('renders header div', function(){
    const wrapper = shallow(<App dashboard={List()} />)
    expect( wrapper.find('.'+styles.header) ).to.have.length(1)
  })

  it('renders container for boards', function(){
    const wrapper = shallow(<App dashboard={List()} />)
    expect( wrapper.find('.'+styles.boardsContainer) ).to.have.length(1)
  })

  it('renders Board components', function(){
    const props = {
      dashboard: List([ 'boardID1', 'boardID2' ])
    }
    const wrapper = shallow(<App {...props}/>)
    expect( wrapper.find(Board) ).to.have.length(2)
  })

  it('renders a CreateBoard control', function(){
    const wrapper = shallow(<App dashboard={List()} />)
    expect( wrapper.find(CreateBoardControl) ).to.have.length(1)
  })
  // it('renders an "app loading" message if appLoading')
    

})

