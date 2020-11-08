import os
import urllib
from bs4 import BeautifulSoup
import csv


def get_images(pokemon):

    pokemon = pokemon.lower()

    if not os.path.exists(f'data/img/pokemon/artwork/{pokemon}'):
        os.makedirs(f'data/img/pokemon/artwork/{pokemon}')
    if not os.path.exists(f'data/img/pokemon/sprites/{pokemon}'):
        os.makedirs(f'data/img/pokemon/sprites/{pokemon}')

    req = urllib.request.Request(
        f'https://pokemondb.net/pokedex/{pokemon}', headers={'User-agent': 'Mozilla/5.0'})
    website = (urllib.request.urlopen(req)).read()
    websoup = BeautifulSoup(website, "lxml")
    artUrl = websoup.find("meta", property="og:image")

    opener = urllib.request.build_opener()
    opener.addheaders = [('User-agent', 'Mozilla/5.0')]
    urllib.request.install_opener(opener)
    #urllib.request.urlretrieve(f"https://img.pokemondb.net/sprites/sword-shield/normal/{pokemon.lower()}.png", f"data/img/pokemon/sprites/{pokemon.lower()}/{pokemon.lower()}.png")

    urllib.request.urlretrieve(
        f"{artUrl['content']}", f"data/img/pokemon/artwork/{pokemon.lower()}/{pokemon.lower()}.png")


def read_csv():
    data = []
    with open('data/csv/pokemon.csv', encoding="utf-8") as csvDataFile:
        data = [row for row in csv.reader(csvDataFile, delimiter="|")]
    index = data[0].index('link')
    for item in data:
        nameLink = item[index]
        try:
            name = nameLink[nameLink.rindex('/')+1:]
            get_images(name)
            print(name)
        except:
            print("Error on string: " + nameLink)

read_csv()