import json
import os
from smartystreets_python_sdk import StaticCredentials, exceptions, ClientBuilder
from smartystreets_python_sdk.us_street import Lookup

def run(body):
    auth_id = "c6b4fe82-9b40-0e75-dc42-03ba711ed547"
    auth_token = "ubhM4BV9r3Rvw1kliSgI"
    info = body.split(',');
    credentials = StaticCredentials(auth_id, auth_token)

    client = ClientBuilder(credentials).build_us_street_api_client()
    # client = ClientBuilder(credentials).with_proxy('localhost:8080', 'user', 'password').build_us_street_api_client()
    # Uncomment the line above to try it with a proxy instead

    lookup = Lookup()
    lookup.street = info[0]
    lookup.city = info[1]
    lookup.state = info[2]

    try:
        client.send_lookup(lookup)
    except exceptions.SmartyException as err:
        print(err)
        return

    result = lookup.result

    if not result:
        
        return "No candidates. This means the address is not valid."

    first_candidate = result[0]
    if (first_candidate.components.zipcode == '10036') :
        return "Address is valid"
    else :
        return "Zipcode is not valid"
    

def lambda_handler(event, context):
    response = {}
    response["res"] = run(event["body"])
    rsp = {
        'statusCode':  '200',
        'body': response,
        'headers': {
            'Content-Type': 'application/json',
        },
    }
    return rsp
    
    
