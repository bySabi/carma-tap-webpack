const context = require.context(global.__TEST_DIR__, true, /_spec\.jsx$|\.js$/);
context.keys().forEach(context);
