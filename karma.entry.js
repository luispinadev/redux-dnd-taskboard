import 'babel-polyfill'
import chai, { expect } from 'chai'
import chaiImmutable from 'chai-immutable'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'

// Note: beware, chai-immutable has some issues with nested objects
// ref: https://github.com/astorije/chai-immutable/issues/34)

global.sinon = sinon
global.expect = expect

chai.use(chaiImmutable)
chai.use(chaiAsPromised)
// chai.config.truncateThreshold = 0 // deep object diff to console

const context = require.context('./spec', true, /\.spec\.js$/)
context.keys().forEach(context)
