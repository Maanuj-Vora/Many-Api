import os
import requests
import pickle
import html5lib
from bs4 import BeautifulSoup
import pandas as pd
import urllib.request


BASE_URL = 'https://pokemondb.net'
file_name = 'scraped_pokemon_page.pickle'

gameList = ['FireRed', 'LeafGreen', 'Omega Ruby', 'Alpha Sapphire',
            "Let's Go Pikachu", "Let's Go Eevee", 'HeartGold', 'SoulSilver', 'Black 2', 'White 2', 'Ultra Sun', 'Ultra Moon', 'Diamond', 'Pearl', 'Platinum',
            'Sapphire', 'Ruby', 'Emerald', 'Crystal', 'Gold', 'Silver', 'Black', 'White', 'Sun', 'Moon', 'Sword', 'Shield', 'Yellow', 'Red', 'Blue', 'X', 'Y']


def scrape_general_page(base_url):
    if not os.path.exists(file_name):
        result = requests.get(base_url + "/pokedex/national")
        assert result.status_code == 200, print(
            f'Attempt to retrieve web page failed - result code {result.status_code}')
        with open(file_name, 'wb') as f:
            pickle.dump(result, f)
    else:
        with open(file_name, 'rb') as f:
            result = pickle.load(f)
    return result


def create_bs4_object(result):
    return BeautifulSoup(result.content, 'html5lib')


def get_gen_infos(ic):
    id_nb = ic.small.get_text()
    name = ic.find_all('a')[0].get_text()
    link = ic.find_all('a')[0]['href']

    types_list = ic.find_all('a')
    if len(types_list) == 2:
        type_1, type_2 = ic.find_all('a')[1].get_text(), 'Nan'
    elif len(types_list) == 3:
        type_1, type_2 = ic.find_all('a')[1].get_text(), ic.find_all('a')[
            2].get_text()
    return id_nb, name, type_1, type_2, link


def get_stats(soup):
    species = soup.find(
        "th", text="Species").next_sibling.next_sibling.string
    height = soup.find(
        "th", text="Height").next_sibling.next_sibling.string.split()[0]
    weight = soup.find(
        "th", text="Weight").next_sibling.next_sibling.string.split()[0]
    abilities = soup.find(
        "th", text="Abilities").next_sibling.next_sibling.a.text
    catch_rate = soup.find(
        "th", text="Catch rate").next_sibling.next_sibling.text.split()[0]
    base_exp = soup.find(
        "th", text="Base Exp.").next_sibling.next_sibling.text
    growth_rate = soup.find(
        "th", text="Growth Rate").next_sibling.next_sibling.text
    breeding_gender = soup.find(
        "th", text="Gender").next_sibling.next_sibling.text
    hp = soup.find("th", text="HP").next_sibling.next_sibling.text
    attack = soup.find(
        "th", text="Attack").next_sibling.next_sibling.text
    defense = soup.find(
        "th", text="Defense").next_sibling.next_sibling.text
    sp_atk = soup.find(
        "th", text="Sp. Atk").next_sibling.next_sibling.text
    sp_def = soup.find(
        "th", text="Sp. Def").next_sibling.next_sibling.text
    speed = soup.find("th", text="Speed").next_sibling.next_sibling.text
    total = soup.find("th", text="Total").next_sibling.next_sibling.text

    return species, height, weight, abilities, catch_rate, base_exp, growth_rate, breeding_gender, hp, attack, defense, sp_atk, sp_def, speed, total


def get_description(url):
    data = pd.read_html(requests.get(url,
                                     headers={'User-Agent': 'Mozilla/5.0'}).text)

    def find_desc_index():
        for x in range(len(data)):
            dfList = data[x].values.tolist()
            for game in gameList:
                if (str(dfList[0][0])).__contains__(game):
                    return x

    correctIndex = find_desc_index()

    descriptionListClean = []

    dataframe = data[correctIndex].values.tolist()

    for index in range(len(dataframe)):
        tempDesc = dataframe[index][1]
        gameTitles = dataframe[index][0]

        for game in gameList:
            if gameTitles.__contains__(game):
                descriptionListClean.append([game, tempDesc])
                gameTitles = gameTitles.replace(game, '')

    df = pd.DataFrame(descriptionListClean, columns=['game', 'description'])
    description = ""
    description = [
        f"{x}[[[{y}" for x, y in zip(df['game'], df['description'])]
    returnString = '[[['.join(description)
    return returnString


def get_images(pokemon):

    pokemon = pokemon.lower()

    if not os.path.exists(f'data/img/pokemon/artwork/{pokemon}'):
        os.makedirs(f'data/img/pokemon/artwork/{pokemon}')
    if not os.path.exists(f'data/img/pokemon/sprites/{pokemon}'):
        os.makedirs(f'data/img/pokemon/sprites/{pokemon}')

    opener = urllib.request.build_opener()
    opener.addheaders = [('User-agent', 'Mozilla/5.0')]
    urllib.request.install_opener(opener)
    try:
        urllib.request.urlretrieve(
            f"https://img.pokemondb.net/sprites/sword-shield/normal/{pokemon.lower()}.png", f"data/img/pokemon/sprites/{pokemon.lower()}/{pokemon.lower()}.png")
    except:
        try:
            urllib.request.urlretrieve(
                f"https://img.pokemondb.net/sprites/lets-go-pikachu-eevee/normal/{pokemon.lower()}.png", f"data/img/pokemon/sprites/{pokemon.lower()}/{pokemon.lower()}.png")
        except:
            try:
                urllib.request.urlretrieve(
                    f"https://img.pokemondb.net/sprites/x-y/normal/{pokemon.lower()}.png", f"data/img/pokemon/sprites/{pokemon.lower()}/{pokemon.lower()}.png")
            except:
                try:
                    urllib.request.urlretrieve(
                        f"https://img.pokemondb.net/sprites/black-white/normal/{pokemon.lower()}.png", f"data/img/pokemon/sprites/{pokemon.lower()}/{pokemon.lower()}.png")
                except:
                    try:
                        urllib.request.urlretrieve(
                            f"https://img.pokemondb.net/sprites/diamond-pearl/normal/{pokemon.lower()}.png", f"data/img/pokemon/sprites/{pokemon.lower()}/{pokemon.lower()}.png")
                    except:
                        try:
                            urllib.request.urlretrieve(
                                f"https://img.pokemondb.net/sprites/ruby-sapphire/normal/{pokemon.lower()}.png", f"data/img/pokemon/sprites/{pokemon.lower()}/{pokemon.lower()}.png")
                        except:
                            try:
                                urllib.request.urlretrieve(
                                    f"https://img.pokemondb.net/sprites/silver/normal/{pokemon.lower()}.png", f"data/img/pokemon/sprites/{pokemon.lower()}/{pokemon.lower()}.png")
                            except:
                                try:
                                    urllib.request.urlretrieve(
                                        f"https://img.pokemondb.net/sprites/red-blue/normal/{pokemon.lower()}.png", f"data/img/pokemon/sprites/{pokemon.lower()}/{pokemon.lower()}.png")
                                except:
                                    print(
                                        f'Could not retrieve {pokemon.lower()} sprite')

    urllib.request.urlretrieve(
        f"https://img.pokemondb.net/artwork/{pokemon.lower()}.jpg", f"data/img/pokemon/artwork/{pokemon.lower()}/{pokemon.lower()}.png")


def parse_infocards(soup, pokemon_infos):
    infocards = soup.find_all("span", class_="infocard-lg-data text-muted")

    with open('data/csv/pokemon.csv', 'w') as f:
        f.write(pokemon_infos)

    with open('data/csv/pokemon.csv', 'a', encoding="utf-8") as f:
        for ic in infocards:
            gen_infos_list = list(get_gen_infos(ic))
            ic_infos = "\n" + "|".join(gen_infos_list)

            r = requests.get(BASE_URL + gen_infos_list[-1])

            description = get_description(BASE_URL + gen_infos_list[-1])

            temp_gen_infos_list = gen_infos_list
            get_images((temp_gen_infos_list[-1])
                       [(temp_gen_infos_list[-1]).rindex('/')+1:])

            if r.status_code != 200:
                ic_infos += "|Nan" * (len(pokemon_infos) - len(gen_infos_list))
            else:
                other_soup = BeautifulSoup(r.content, 'html5lib')
                stats = list(get_stats(other_soup))
                ic_infos += "|" + "|".join(stats)

            ic_infos += "|" + description

            print(ic_infos)

            f.writelines(ic_infos)

    os.remove(file_name)


result = scrape_general_page(BASE_URL)
soup = create_bs4_object(result)

pokemon_infos = """number|name|type_1|type_2|link|species|height|weight|abilities|catch_rate|base_exp|growth_rate|breeding_gender|hp|attack|defense|sp_atk|sp_def|speed|total|description"""

parse_infocards(soup, pokemon_infos)
