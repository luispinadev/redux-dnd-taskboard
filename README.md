## Basic trello-like task board app with drag and drop interface. 

The purpose of this project is to explore some nifty libs from the react/redux ecosystem (recompose, react-dnd, etc..) and practice writing some automated tests.
Used post-css/stylus/css-modules for styles.  
The async processes are handled by a redux-saga middleware, communicating with a dummy api.  

The test stack is karma+mocha+chai+sinon+enzyme, and I'm using webpack as bundling tool.


### Running the project:
Install modules with 'npm i', then:  

* 'npm run start' will start dev server and webpack autobuild  
* 'npm run test' will run karma test suite  
* 'npm run build' will run webpack static build  


### ToDo:  
* set drop area below last card to update hover index on board enter (edge case bug fix)
* controls for board edit title / create / delete
* write some more tests / explore managing multi-HOC situations in tests
* write async processes for Boards: create / delete / title edit, with blocking calls
* css fine-tunings


