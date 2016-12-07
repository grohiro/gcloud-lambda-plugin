# GcloudLambdaPlugin

google-cloud NPM モジュールを AWS Lambda で使用するための serverless framework plugin です。

The serverless framework plugin for using the google-cloud NPM module with AWS Lambda.

## Install

- Clone the plugin into `/path/to/project/.serverless_plugin/`
- Add `plugins` section to the `serverless.yml`

serverless.yml

```
service: your-project-name
plugins:
  - gcloud-lambda-plugin
```

