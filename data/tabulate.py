import os
import csv
import json
import fileinput

import pandas as pd

import default


csvList = []
jsonList = []

csvFilePath = default.get("apiMethods/data.json").csvPath
jsonFilePath = default.get("apiMethods/data.json").jsonPath
noConversion = list(default.get("apiMethods/data.json").noConversion)

for file in os.listdir(csvFilePath):
    if file.endswith(".csv") and not noConversion.__contains__(file):
        csvList.append(f"{csvFilePath}{str(file)}")
        jsonList.append(f"{jsonFilePath}{str(file[:-4])}.json")

index = 0
while index < len(csvList):
    data = {}
    with open(csvList[index], encoding='utf-8') as openCSV:
        csvReader = csv.DictReader(openCSV, delimiter="|")
        lineIndex = 1
        for item in csvReader:
            print(item)
            for key, value in item.items():
                if value != None and value.__contains__("[[["):
                    valueSplit = value.split("[[[")
                    tempDict = {}
                    dictIndex = 0
                    while dictIndex < len(valueSplit) and len(valueSplit) % 2 == 0:
                        tempDict.update(
                            {valueSplit[dictIndex]: valueSplit[dictIndex+1]})
                        dictIndex += 2
                    item[key] = tempDict
            data[str(lineIndex)] = item
            lineIndex += 1

    file = open(f'{jsonList[index]}', "w+")

    with open(jsonList[index], 'w', encoding='utf-8') as openJSON:
        openJSON.write(json.dumps(data, indent=4, ensure_ascii=False))

    index += 1
