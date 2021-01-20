from urllib.request import urlopen
from bs4 import BeautifulSoup
import default
import csv
import datetime
import requests
import shutil
from datetime import datetime as dt
import os

baseComicUrl = "https://www.gocomics.com/garfield/"

folderPath = 'data/img/comics/garfield'

if not os.path.exists(folderPath):
    os.makedirs(folderPath)

date = datetime.datetime(1978, 6, 19, 0, 0, 0)

while date.date() != dt.today().date():
    urlEnd = f'{date.year}/{date.month}/{date.day}'
    fileEnd = f'{date.year}-{date.month}-{date.day}'
    tempBaseComicUrl = f'{baseComicUrl}{urlEnd}'
    html = urlopen(tempBaseComicUrl).read()
    soup = BeautifulSoup(html, 'html.parser')
    picTag = soup.find('picture', attrs={'class': 'item-comic-image'})
    tag = picTag.find('img', attrs={'class': 'lazyload img-fluid'})
    imgUrl = tag.get('src')
    r = requests.get(imgUrl, stream=True)
    if r.status_code == 200:
        r.raw.decode_content = True
        with open(f'{folderPath}/{fileEnd}.jpg', 'wb') as f:
            shutil.copyfileobj(r.raw, f)
        print('Image sucessfully Downloaded: ', f'{fileEnd}.jpg')
    else:
        print('Image Couldn\'t be retreived: ', f'{fileEnd}')

    date += datetime.timedelta(days=1)
