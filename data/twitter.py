import tweepy
import csv
import os
import default
from datetime import datetime, timedelta


csvFilePath = default.get("apiMethods/data.json").csvPath


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

    tmpTweets = api.user_timeline(screen_name)
    for tweet in tmpTweets:
        if tweet.created_at < endDate and tweet.created_at > startDate:
            tweets.append(tweet)

    while (tmpTweets[-1].created_at > startDate):
        tmpTweets = api.user_timeline(screen_name, max_id=tmpTweets[-1].id)
        for tweet in tmpTweets:
            if tweet.created_at < endDate and tweet.created_at > startDate:
                tweets.append(tweet)

    outtweets = [[tweet.id_str, tweet.created_at, tweet.text]
                 for tweet in tweets]

    with open(f'{csvFilePath}{screen_name}_tweets.csv', 'a', encoding='utf-8') as csvFile:
        writer = csv.writer(csvFile, delimiter='|')
        # writer.writerow(["id", "created at", "tweet"])
        writer.writerows(outtweets)

    pass


getTodayTweets("realDonaldTrump")
