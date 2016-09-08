//const context = require.context('../../test', true, /_spec\.jsx$|\.js$/);
//const context = require.context('../..', true, /_spec\.jsx$|\.js$/);
//
//const context = require.context('./test', true, /(?!^.+\.webpack\.)(^.+\.(js|jsx)+$)/g);
//const context = require.context('.', true, /^test\/[(?!^.+\.webpack\.)(^.+\.(js|jsx)+$)]+/g);
const context = require.context(__TEST_DIR__, true, /^.+\.(js|jsx)+$/g);
context.keys().forEach(context);
