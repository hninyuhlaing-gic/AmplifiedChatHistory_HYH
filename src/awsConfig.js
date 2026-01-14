import AWS from 'aws-sdk';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

export const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
};

export const UserPool = new CognitoUserPool(poolData);

AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

export const dynamodb = new AWS.DynamoDB.DocumentClient();
export const USERS_TABLE = process.env.REACT_APP_DYNAMODB_TABLE;
