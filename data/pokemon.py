import pandas as pd
import requests

page = requests.get("https://pokemondb.net/pokedex/all")

dex = pd.read_html(page.text, attrs={'id': 'pokedex'}, index_col='#')

dex[0].to_csv(r"data/csv/pokemon.csv", sep="|", encoding='utf-8')
