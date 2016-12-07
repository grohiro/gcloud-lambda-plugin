'use strict';

const path = require('path');
const execFile = require('child_process').execFile;

const NODE_PRE_GYP = './node_modules/.bin/node-pre-gyp';

/**
 * Using google-cloud npm module on AWS Lambda
 */
class GcloudLambdaPlugin {

  constructor(serverless) {
    let grpcModulePath = path.join(
      serverless.config.servicePath,
      'node_modules',
      'google-cloud',
      'node_modules',
      'grpc'
    );

    let params = {
      grpcModulePath: grpcModulePath,
      installArgs: [ // reinstall grpc_node for AWS
        'reinstall',
        '--target_arch=x64',
        '--target_platform=linux',
      ],
      reinstallArgs: [ // reinstall grpc_node for your environment
        'reinstall',
      ],
    };

    this.commands = {
      deploy: {
        lifecycleEvents: [
          'deploy:createDeploymentArtifacts',
        ],
      },
    };

    this.hooks = {
      'before:deploy:createDeploymentArtifacts': ()=> this.installGrpcModuleForAWS(params),
      'after:deploy:createDeploymentArtifacts': ()=> this.restoreGrpcModule(params),
    };
  }

  installGrpcModuleForAWS(params) {
    try {
      let opts = { cwd: params.grpcModulePath };
      let callback = (error, stdout, stderr) => {
        // console.log(error, stdout, stderr); // debug
      };
      execFile(NODE_PRE_GYP, params.installArgs, opts, callback);
    } catch (e) {
      // ignore
    }
  }

  restoreGrpcModule(params) {
    try {
      let opts = { cwd: params.grpcModulePath };
      let callback = (error, stdout, stderr) => {
        // console.log(error, stdout, stderr); // debug
      };
      execFile(NODE_PRE_GYP, params.reinstallArgs, opts, callback);
    } catch (e) {
      // ignore
    }
  }
}

module.exports = GcloudLambdaPlugin;

