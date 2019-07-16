import requests
import discord
from bs4 import BeautifulSoup
page = requests.get("http://dataquestio.github.io/web-scraping-pages/simple.html")
page2 = BeautifulSoup(page.content,'html.parser')
print(list(page2.children))