import tweepy
import csv
import os
import default
from datetime import datetime, timedelta


csvFilePath = default.get("apiMethods/data.json").csvPath
jsonFilePath = default.get("apiMethods/data.json").jsonPath


def getTodayTweets(screen_name):
    auth = tweepy.OAuthHandler(os.environ.get(
        'TWITTER_CONSUMER_KEY'), os.environ.get('TWITTER_CONSUMER_SECRET'))
    auth.set_access_token(os.environ.get(
        'TWITTER_ACCESS_KEY'), os.environ.get('TWITTER_ACCESS_SECRET'))
    api = tweepy.API(auth)

    startDate = (datetime.today() - timedelta(days=2)
                 ).replace(hour=0, minute=0, second=0)
    endDate = (datetime.today() - timedelta(days=1)
               ).replace(hour=0, minute=0, second=0)

    tweets = []

    tmpTweets = api.user_timeline(screen_name, tweet_mode="extended")
    for tweet in tmpTweets:
        if tweet.created_at < endDate and tweet.created_at > startDate:
            tweets.append(tweet)
    print(tmpTweets)
    if(len(tmpTweets) > 1):
        while (tmpTweets[-1].created_at > startDate):
            tmpTweets = api.user_timeline(
                screen_name, max_id=tmpTweets[-1].id, tweet_mode="extended")
            for tweet in tmpTweets:
                if tweet.created_at < endDate and tweet.created_at > startDate:
                    tweets.append(tweet)
    else:
        return

    outtweets = [[tweet.id_str, tweet.created_at, tweet.full_text]
                 for tweet in tweets]

#     file = open(f'{csvFilePath}{screen_name}_tweets.csv', "w+")

    shouldRow = False
    with open(f'{csvFilePath}{screen_name}_tweets.csv', 'r') as check:
        char = check.read(1)
        if not char:
            shouldRow = True

    if(shouldRow):
        f = open(f'{csvFilePath}{screen_name}_tweets.csv', 'w')
        f.write("id|created at|tweet\n")
        f.close()

    with open(f'{csvFilePath}{screen_name}_tweets.csv', 'a', encoding='utf-8') as csvFile:
        writer = csv.writer(csvFile, delimiter='|')
        writer.writerows(outtweets)

    # file = open(f'{jsonFilePath}{screen_name}_tweets.json', "w+")

    pass


accountHandles = default.get("apiMethods/data.json").twitterHandles
for x in accountHandles:
    getTodayTweets(x)
