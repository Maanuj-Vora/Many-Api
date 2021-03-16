import os
import urllib
from bs4 import BeautifulSoup
import csv
import requests
import urllib.request
import shutil
import unidecode

def format_name(name):
    return unidecode.unidecode((((((name.lower()).replace(" ", "-")).replace(".", "")).replace(":", "")).replace("♂", "-m")).replace("♀", "-f"))

def get_images(pokemon):

    pokemon = format_name(pokemon)

    if not os.path.exists(f'data/img/pokemon/artwork/{pokemon}'):
        os.makedirs(f'data/img/pokemon/artwork/{pokemon}')

    req = urllib.request.Request(
        f'https://pokemondb.net/pokedex/{pokemon}', headers={'User-agent': 'Mozilla/5.0'})
    website = (urllib.request.urlopen(req)).read()
    websoup = BeautifulSoup(website, "lxml")
    artUrl = websoup.find("meta", property="og:image")

    opener = urllib.request.build_opener()
    opener.addheaders = [('User-agent', 'Mozilla/5.0')]
    urllib.request.install_opener(opener)

    urllib.request.urlretrieve(
        f"{artUrl['content']}", f"data/img/pokemon/artwork/{pokemon}/{pokemon}.png")


def get_sprites():
    url = "https://pokemondb.net/sprites"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    spans = soup.find_all("span", class_='img-fixed icon-pkmn')
    image_info = []
    for span in spans:
        pokeName = format_name((span["data-alt"]).replace(" icon", ""))
        image_info.append(
            [pokeName, span["data-src"].replace("icon", "normal")])

    opener = urllib.request.build_opener()
    opener.addheaders = [('User-agent', 'Mozilla/5.0')]
    urllib.request.install_opener(opener)

    noValidSprites = []
    for item in image_info:
        try:
            if not os.path.exists(f'data/img/pokemon/sprites/{item[0]}'):
                os.makedirs(f'data/img/pokemon/sprites/{item[0]}')
            urllib.request.urlretrieve(
                f"{item[1]}", f"data/img/pokemon/sprites/{item[0]}/{item[0]}.png")
            print(f'Sprite Downloaded: {item[0]}')
        except:
            try:
                if not os.path.exists(f'data/img/pokemon/sprites/{item[0]}'):
                    os.makedirs(f'data/img/pokemon/sprites/{item[0]}')
                urllib.request.urlretrieve(
                    f"https://img.pokemondb.net/sprites/bank/normal/{item[0]}.png", f"data/img/pokemon/sprites/{item[0]}/{item[0]}.png")
                print(f'Sprite Downloaded: {item[0]}')
            except:
                noValidSprites.append(item[0])

    print(noValidSprites)


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
get_sprites()
