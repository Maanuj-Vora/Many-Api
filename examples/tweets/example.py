import requests

baseUrl = 'https://many-api.vercel.app/tweets'


def getRandomTweet(accountHandle):
    response = requests.get(f'{baseUrl}/random?account={accountHandle}')
    json = response.json()
    return json


def getRandomAmount(numOfTweets, accountHandle):
    response = requests.get(
        f'{baseUrl}/amount?amount={numOfTweets}&account={accountHandle}')
    json = response.json()
    return json


def getAccountHandles():
    response = requests.get(f'{baseUrl}')
    json = response.json()
    return json['currently supported handles']


# print(getRandomTweet('realDonaldTrump'))
# print(getRandomAmount(10, 'realDonaldTrump'))
# print(getAccountHandles())
