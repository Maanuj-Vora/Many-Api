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


def getDateData(date):
    # Date should be in format 'YYYY-MM-DD'
    response = requests.get(f'{baseUrl}/getData?date={date}')
    json = response.json()
    return json


def getISOCurrentData(date):
    # Date should be in format 'YYYY-MM-DD'
    response = requests.get(f'{baseUrl}/getData?iso={date}')
    json = response.json()
    return json


def getISODateData(date, iso):
    # Date should be in format 'YYYY-MM-DD'
    response = requests.get(f'{baseUrl}/getData?date={date}&iso={iso}')
    json = response.json()
    return json


# print(getAll())
# print(getISO('USA'))
# print(getCurrentData())
# print(getDateData('2020-06-30'))
# print(getISODateData('2020-06-30', 'USA'))
