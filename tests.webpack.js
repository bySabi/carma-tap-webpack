const context = require.context(global.__TEST_DIR__, true, global.__TEST_REGX__);
context.keys().forEach(context);
