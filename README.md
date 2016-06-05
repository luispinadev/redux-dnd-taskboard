## Basic trello-like task board app with drag and drop interface. 

The purpose is to explore some nifty libs from the react/redux ecosystem like recompose, redux, react-dnd, etc..   
Used post-css / stylus / css-modules for styles.  

The test stack is karma+mocha+chai+sinon+enzyme (note that the test coverage is far from complete, I've used this more as a playground, and this project is not meant for maintenance)


### Running the project:

* 'npm run start' will start dev server and webpack autobuild  
* 'npm run test' will run karma test suite  
* 'npm run build' will run webpack static build  


### ToDo:  
* set drop area below last card to update hover index on board enter (edge case bug fix)
* control for 'edit board title'
* write remaining async processes in sagas (Board: create / delete / title edit, with blocking sagas)
* write some more tests / explore managing multi-HOC situations in tests
* css fine-tunings


