import React from 'react'
import { shallow } from 'enzyme'
import { List } from 'immutable'

import styles from 'views/components/CardList/CardList.styl'
import CardList from 'views/components/CardList/CardList'
import Card from 'views/components/Card'

describe('Components:: CardList', function(){

  const props = {
    boardID: 'boardID',
    cards: List(),
    deleteCard: f => f
  }

  it('is a container div', function(){
    const wrapper = shallow(<CardList {...props} />)
    expect( wrapper.hasClass(styles.container) ).to.be.true
  })

  it('renders card components', function(){
    const cards = List([ 'cardID1', 'cardID2' ])
    const wrapper = shallow(<CardList {...props} cards={cards} />)

    expect( wrapper.find(Card) ).to.have.length(2)
  })

})

