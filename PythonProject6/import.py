import json
import pymongo
import os
from dotenv import load_dotenv

# Загружаем переменные из .env файла
load_dotenv(".env")
MONGO_URI = os.getenv("MONGO_URI")

# Подключаемся к MongoDB
client = pymongo.MongoClient(MONGO_URI)
db = client["Assign4"]  # База данных
collection = db["shop"]  # Коллекция

# Загружаем данные из shop.json
with open("shop.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Проверяем формат данных
if isinstance(data, dict):
    data = [data]  # Превращаем в список

if isinstance(data, list) and len(data) > 0:
    collection.insert_many(data)
    print(f"✅ Загружено {len(data)} товаров в MongoDB Atlas!")
else:
    print("❌ Ошибка: Данные в shop.json пустые или неверного формата!")
