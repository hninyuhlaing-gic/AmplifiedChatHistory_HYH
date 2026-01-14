import json
import boto3
from datetime import datetime  
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('dynamo_table_testing')

def lambda_handler(event, context):
    action = event.get("action")
    item_id = event.get("id")
    created_at = datetime.utcnow().isoformat()
    if action == "put":
        item = {
            "id": item_id,
            "created_at": created_at,
            "name": event.get("name"),
            "age": event.get("age")
        }

        table.put_item(Item=item)

        return {
            "statusCode": 200,
            "body": "Item inserted successfully"
        }

    elif action == "get":
        response = table.get_item(
            Key={"id": item_id,"created_at": str(created_at)}
        )

        if "Item" in response:
            return {
                "statusCode": 200,
                "body": response["Item"]
            }
        else:
            return {
                "statusCode": 404,
                "body": "Item not found"
            }

    else:
        return {
            "statusCode": 400,
            "body": "Invalid action"
        }
