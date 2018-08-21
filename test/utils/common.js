const LinterConstructor = require("eslint").Linter;

const commonParserConfig = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 7,
    sourceType: "module"
  }
};

const defaultRuleFixer = (sourceCode, rule, ruleConfig) => {
  const Linter = new LinterConstructor();
  const ruleName = Object.keys(ruleConfig)[0];

  Linter.defineRule(ruleName, rule);

  return Linter.verifyAndFix(
    sourceCode,
    {
      rules: ruleConfig,
      ...commonParserConfig
    }, {
      fix: true
    }
  );
};

module.exports = {
  commonParserConfig,
  defaultRuleFixer
};
