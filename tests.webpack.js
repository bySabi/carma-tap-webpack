const context = require.context(__TEST_DIR__, true, __TEST_REGX__);
context.keys().forEach(context);
