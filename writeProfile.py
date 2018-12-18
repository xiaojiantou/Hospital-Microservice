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
    print("Response = ", rsp)
    return rsp


def lambda_handler(event, context):
    '''Demonstrates a simple HTTP endpoint using API Gateway. You have full
    access to the request and response payload, including headers and
    status code.'''

    print("event = ", json.dumps(event, indent=2))
    response = {"msg": "You called POST"}
    # event = json.dumps(event, indent=2)
    if response:
        print(event)
        # data = json.loads(event['body'])
        # email = data["email"]
        # firstName = data['firstName']
        # lastName = data["lastName"]
        # gender = data["gender"]
        # address = data["address"]

        data = event['body'].split(',')
        email = data[0]
        firstName = data[1]
        lastName = data[2]
        gender = data[3]
        address = data[4]

        response["email"] = email

        response["body"] = {}
        response["body"]["firstName"] = firstName
        response["body"]["lastName"] = lastName
        response["body"]["gender"] = gender
        response["body"]["address"] = address

        body = response["body"]

        response, signal = put_dynamo_stuff(email, body)
        if signal:
            return respond(None, response)
        else:
            return respond(e, None)


def put_dynamo_stuff(email, body):
    # Get the service resource.

    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Doctors')
    print('Start input')
    try:
        response = table.put_item(
            Item={'DoctorId': email, 'body': body}
        )
        return response, True
    except Exception as e:
        print("Exception e = ", e)
        return e, False