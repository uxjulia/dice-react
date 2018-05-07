const rewireMobX = require('react-app-rewire-mobx');
const rewireProvidePlugin = require('react-app-rewire-provide-plugin');

module.exports = function override(config, env) {
  config = rewireMobX(config, env)
  config = rewireProvidePlugin(config, env, {
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery'
  })
  return config;
}
