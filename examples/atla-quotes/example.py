import requests

baseUrl = 'https://many-api.vercel.app/atla-quote'


def getAll():
    response = requests.get(f'{baseUrl}')
    json = response.json()
    return json


def getRandom():
    response = requests.get(f'{baseUrl}/random')
    json = response.json()
    return json


def getAmount(amount):
    response = requests.get(f'{baseUrl}/amount?amount={str(amount)}')
    json = response.json()
    return json


def getAuthors():
    response = requests.get(f'{baseUrl}/author')
    json = response.json()
    return json


def getSpecificAuthor(author):
    response = requests.get(f'{baseUrl}/author?author={author}')
    json = response.json()
    return json


print(getAll())
print(getRandom())
print(getAmount(10))
print(getAuthors())
print(getSpecificAuthor('iroh'))
