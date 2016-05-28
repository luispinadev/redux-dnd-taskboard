import React from 'react'
import { shallow } from 'enzyme'
import { List } from 'immutable'

import CardList from 'views/components/CardList/CardList'
import styles from 'views/components/CardList/CardList.styl'

describe('Components:: CardList', function(){

  it('is a container div', function(){
    const wrapper = shallow(<CardList cards={List()} boardID="123" />)
    expect( wrapper.hasClass(styles.container) ).to.be.true
  })

  // it('renders card components', function(){
  //   const props = {
  //     cards: List([ 'boardID1', 'boardID2' ])
  //   }
  //   const wrapper = shallow(<CardList {...props}/>)
  //   expect( wrapper.find(Card) ).to.have.length(2)
  // })

})

