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

with open(f"{jsonFilePath}coronavirus.json") as json_file:
    data = json.load(json_file)

keyso = data.keys()
index = 0
for key in keyso:
    (data[key])['iso_code'] = key
    index += 1
with open(f"{jsonFilePath}coronavirus.json", "w") as jFile:
    json.dump(data, jFile)
