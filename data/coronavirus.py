import requests
import csv
import json
import os
import default

url = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv'
jsonUrl = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.json'
csvFilePath = default.get("apiMethods/data.json").csvPath
jsonFilePath = default.get("apiMethods/data.json").jsonPath

with requests.Session() as s:
    download = s.get(url)
    decodedContent = download.content.decode('utf-8')
    cr = csv.reader(decodedContent.splitlines(), delimiter=',')
    listForm = list(cr)
    index = 0
    with open(f'{csvFilePath}coronavirus.csv', 'a', encoding='utf-8') as csvFile:
        writer = csv.writer(csvFile, delimiter='|')
        writer.writerows(listForm)

with requests.Session() as s:
    download = s.get(jsonUrl)
    decodedContent = download.content.decode('utf-8')
    with open(f"{jsonFilePath}coronavirus.json", "w") as jFile:
        jFile.write(decodedContent)