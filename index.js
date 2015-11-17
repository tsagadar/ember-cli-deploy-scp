/* jshint node: true */

var Promise = require('ember-cli/lib/ext/promise');
var DeployPluginBase = require('ember-cli-deploy-plugin');
var SilentError = require('silent-error');

module.exports = {
  name: 'ember-cli-deploy-scp',

  createDeployPlugin: function (options) {
    var DeployPlugin = DeployPluginBase.extend({
      name: options.name,
      defaultConfig: {
        distDir: function (context) {
          return context.distDir;
        },

        didDeployMessage: function (context) {
          var revisionKey = context.revisionData && context.revisionData.revisionKey;
          if (revisionKey) {
            return "Copied revision " + revisionKey + ".";
          }
        }
      },
      requiredConfig: ['destDir', 'host', 'user'],

      upload: function (/* context */) {
        var distDir = this.readConfig('distDir');
        var destDir = this.readConfig('destDir');
        var host = this.readConfig('host');
        var user = this.readConfig('user');

        const that = this;
        return new Promise(function (resolve, reject) {
          var spawn = require('child_process').spawn;
          var cmd = "scp -r " + distDir + '/* ' + user + '@' + host + ':' + destDir;
          that.log('Uploading assets using command: ' + cmd);
          var executor = spawn('/bin/sh', ['-c', cmd]);

          executor.on('close', function(code) {
            if (code === 0) {
              that.log('Successfully upload!');
              resolve();
            } else {
              that.log('Failed: ' + code);
              return reject(new SilentError('Could not copy files'));
            }
          });
        });
      },
      didDeploy: function (/* context */) {
        var didDeployMessage = this.readConfig('didDeployMessage');
        if (didDeployMessage) {
          this.log(didDeployMessage);
        }
      }
    });
    return new DeployPlugin();
  }
};
