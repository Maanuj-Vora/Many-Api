import os
import csv
import json

import default

csvList = []
jsonList = []

csvFilePath = default.get("apiMethods/data.json").csvPath
jsonFilePath = default.get("apiMethods/data.json").jsonPath

for file in os.listdir(csvFilePath):
    if file.endswith(".csv"):
        csvList.append(f"{csvFilePath}{str(file)}")
        jsonList.append(f"{jsonFilePath}{str(file[:-4])}.json")

index = 0
while index < len(csvList):
    data = {}
    with open(csvList[index], encoding='utf-8') as openCSV:
        csvReader = csv.DictReader(openCSV, delimiter="|")
        lineIndex = 1
        for item in csvReader:
            data[str(lineIndex)] = item
            lineIndex+=1

    # os.mknod(jsonList[index])

    # # try:
    # #     f = open(jsonList[index], "w")
    # # except Exception as e:
    # #     f = open(jsonList[index], "x") 
        
    with open(jsonList[index], 'w', encoding='utf-8') as openJSON:
        openJSON.write(json.dumps(data, indent=4, ensure_ascii=False))

    index+=1