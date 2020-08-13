import requests

baseUrl = 'https://many-api.vercel.app/jokes'


def getRandom():
    response = requests.get(f'{baseUrl}/random')
    json = response.json()
    return json


def getAmount(amount):
    response = requests.get(f'{baseUrl}/amount?amount={str(amount)}')
    json = response.json()
    return json


print(getRandom())
print(getAmount(10))

