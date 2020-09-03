import requests
import csv
import os
import default

url = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv'
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