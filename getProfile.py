import boto3
import json

print('Loading function')
dynamo = boto3.client('dynamodb')


def respond(err, res=None):
    print("err = ", err)
    print("rsp = ", res)
    rsp = {
        'statusCode': '400' if err else '200',
        'body': err if err else res,
        'headers': {
            'Content-Type': 'application/json',
        },
    }
    # ("Response = ", rsp)
    return rsp


def lambda_handler(event, context):
    '''Demonstrates a simple HTTP endpoint using API Gateway. You have full
    access to the request and response payload, including headers and
    status code.'''

    print("event = ", json.dumps(event, indent=2))

    response = {"msg": "You called GET"}
    error = None
    if response:
        email = event["body"]
        response['email'] = email
        response = get_dynamo_stuff(email)

    return respond(error, response)


def get_dynamo_stuff(email):
    # Get the service resource.

    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Doctors')
    print('Start input')
    try:
        response = table.get_item(Key={'DoctorId': email})
        return response
    except Exception as e:
        print("Exception e = ", e)
        return e