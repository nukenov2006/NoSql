from pymongo import MongoClient
import json

# Подключение к MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['myDatabase']
collection = db['listings']

# Загружаем данные из файла JSON
with open('krisha_data.json', 'r') as file:
    data = json.load(file)

# Вставка данных в коллекцию MongoDB
collection.insert_many(data)

print("Данные успешно загружены в MongoDB")
