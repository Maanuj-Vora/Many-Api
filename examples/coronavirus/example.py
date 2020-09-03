import requests

baseUrl = 'https://many-api.vercel.app/coronavirus'


def getAll():
    response = requests.get(f'{baseUrl}/all')
    json = response.json()
    return json


def getISO(iso):
    # A List of ISO Codes are available at 'https://many-api.vercel.app/coronavirus/getISO'
    response = requests.get(f'{baseUrl}/getISO?iso={iso}')
    json = response.json()
    return json

def getCurrentData():
    response = requests.get(f'{baseUrl}/getData')
    json = response.json()
    return json


print(getAll())
print(getISO('USA'))
print(getCurrentData())
