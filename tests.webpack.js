const context = require.context(__TEST_DIR__, true, /^.+\.(js|jsx)+$/g);
context.keys().forEach(context);
