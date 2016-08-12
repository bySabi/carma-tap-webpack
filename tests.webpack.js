const context = require.context('./spec', true, /_spec\.jsx$|\.js$/);
context.keys().forEach(context);
