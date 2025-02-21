import json
import urllib3
from bs4 import BeautifulSoup

http = urllib3.PoolManager()
BASE_URL = "https://shop.kz/offers/nastolnye-kompyutery/"


def get_total_pages():
    response = http.request('GET', BASE_URL)
    if response.status != 200:
        print(f"Error loading page: {response.status}")
        return 1

    soup = BeautifulSoup(response.data, 'html.parser')
    pagination = soup.find("div", class_="nums")

    if pagination:
        last_page_link = pagination.find_all("a")[-1]
        if last_page_link and last_page_link.text.isdigit():
            return int(last_page_link.text)

    return 1


def get_products(page):
    url = f"{BASE_URL}?PAGEN_1={page}"
    response = http.request('GET', url)

    if response.status != 200:
        print(f"Error loading page {page}: {response.status}")
        return []

    soup = BeautifulSoup(response.data, 'html.parser')
    products = []

    for item in soup.find_all("div", class_="bx_catalog_item"):
        title_tag = item.find("h4", class_="bx_catalog_item_title_text")
        title = title_tag.text.strip() if title_tag else "Title not found"

        link_tag = item.find("a", href=True)
        link = "https://shop.kz" + link_tag["href"] if link_tag else "Link not found"

        price_tag = item.find("div", class_="bx_catalog_item_price")
        price = None
        if price_tag:
            prices = [p.strip() for p in price_tag.text.split("\n") if "Цена по прайсу" in p]
            if prices:
                price = "".join(filter(str.isdigit, prices[0]))

        stock_tag = item.find("div", class_="product_available")
        stock = stock_tag.text.strip() if stock_tag else "Stock information not found"

        products.append({
            "title": title,
            "link": link,
            "price": price if price else "Price not found",
            "stock": stock
        })

    return products


if __name__ == "__main__":
    total_pages = get_total_pages()
    print(f"Total pages found: {total_pages}")

    all_products = []
    for page in range(1, total_pages + 1):
        print(f"Loading page {page} of {total_pages}")
        all_products.extend(get_products(page))

    with open("shop.json", "w", encoding="utf-8") as f:
        json.dump(all_products, f, ensure_ascii=False, indent=4)

    print(f"Saved {len(all_products)} products to shop.json")
