import 'babel-polyfill'
import chai, { expect } from 'chai'
import chaiImmutable from 'chai-immutable'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'


global.sinon = sinon
global.expect = expect

chai.use(chaiImmutable)
chai.use(chaiAsPromised)
// chai.config.truncateThreshold = 0 // deep object diff to console

const context = require.context('./spec', true, /\.spec\.js$/)
context.keys().forEach(context)
