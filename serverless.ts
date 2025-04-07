import type { AWS } from '@serverless/typescript';
import { createExpressServer } from './src/infrastructure/server/express';
import { createDynamoDBClient } from './src/infrastructure/aws/dynamodb-client';

const serverlessConfiguration: AWS = {
  service: 'orders-api',
  frameworkVersion: '3',
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    environment: {
      ORDERS_TABLE: '${self:service}-${sls:stage}',
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    iam: {
      role: {
        statements: [{
          Effect: 'Allow',
          Action: ['dynamodb:*'],
          Resource: 'arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self:provider.environment.ORDERS_TABLE}',
        }],
      },
    },
  },
  functions: {
    api: {
      handler: 'src/infrastructure/server/handler.handler',
      events: [
        { http: { path: '/orders', method: 'post' } },
        { http: { path: '/orders/{id}', method: 'get' } },
      ],
    },
  },
  resources: {
    Resources: {
      OrdersTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:provider.environment.ORDERS_TABLE}',
          AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
          KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
          BillingMode: 'PAY_PER_REQUEST',
        },
      },
    },
  },
  plugins: ['serverless-offline', 'serverless-plugin-typescript'],
};

module.exports = serverlessConfiguration;