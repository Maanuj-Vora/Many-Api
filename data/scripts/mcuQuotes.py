from urllib.request import urlopen
from bs4 import BeautifulSoup
import re
import default
import csv

csvFilePath = default.get("apiMethods/data.json").csvPath

quoteArr = []
marvelCharacterUrl = "https://marvelcinematicuniverse.fandom.com/wiki/Category:Characters"
baseUrl = "https://marvelcinematicuniverse.fandom.com"
quoteUrlArr = []

while marvelCharacterUrl != '':
    html = urlopen(marvelCharacterUrl).read()
    soup = BeautifulSoup(html, 'html.parser')
    tag = soup.findAll('a', attrs={'class': 'category-page__member-link'})
    for a in tag:
        quoteUrlArr.append(f"{baseUrl}{a.get('href')}/Quote")
    try:
        marvelCharacterUrl = soup.find(
            'link', attrs={'rel': 'next'}).get('href')
    except:
        break

for url in quoteUrlArr:
    try:
        html = urlopen(url).read()
        soup = BeautifulSoup(html, 'html.parser')
        tag = soup.findAll('div', attrs={'class': 'quote'})

        for item in tag:
            dd = item.findAll('dd')
            quote = dd[0].find('i').get_text()
            movie = item.findAll('a')[-1].get('title')
            authors = (((str(dd[-1].get_text()))[1:]
                        ).replace('[src]', '')).strip()
            quoteArr.append([movie, authors, quote])
            print(quote)
    except:
        pass


with open(f'{csvFilePath}marvel-quotes.csv', 'w+', encoding='utf-8') as f:
    writer = csv.writer(f, delimiter='|', quotechar='"',
                        quoting=csv.QUOTE_MINIMAL)
    writer.writerow(['movie', 'author', 'quote'])
    writer.writerows(quoteArr)
