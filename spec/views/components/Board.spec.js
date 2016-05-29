import React from 'react'
import { shallow } from 'enzyme'
// import { List } from 'immutable'

import Board from 'views/components/Board/Board'
import CreateCardControl from 'views/components/CreateCardControl'
import styles from 'views/components/Board/Board.styl'

describe('Components:: Board', function(){
  const props = { boardID: 'boardID', title: 'title', createCard: f => f }

  it('renders a wrapper div', function(){
    const wrapper = shallow(<Board {...props} />)
    expect( wrapper.hasClass(styles.wrapper) ).to.be.true
  })

  it('renders a container div', function(){
    const wrapper = shallow(<Board {...props} />)
    expect( wrapper.find('.'+styles.container) ).to.have.length(1)
  })

  it('renders header div with title', function(){
    const wrapper = shallow(<Board {...props} />)
    const header = wrapper.find('.'+styles.header) 

    expect(header).to.have.length(1)
    expect(header.text()).to.equal(props.title)
  })

  it('renders cards container block', function(){
    const wrapper = shallow(<Board {...props} />)
    expect( wrapper.find('.'+styles.cardsBlock) ).to.have.length(1)
  })

  it('renders an "add card" control', function(){
    const wrapper = shallow(<Board {...props} />)
    expect( wrapper.find(CreateCardControl) ).to.have.length(1)
  })

})

