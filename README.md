Project Name
My WEB Page

Installation
Ensure you have Python and node.js installed

Clone the repository:
git clone https://github.com/nukenov2006/NoSql.git
cd ../NoSqlProj

Install dependencies:
npm install


Running the Project
Start the application:
node server.js

to collect enother data you need open the PythonProject6/main.py , install additional libraries , change the url to every page of shop.kz and start the main.py.
After that you need to upload shop.json to mongodb atlas Assign4/shop
The project will be available at https://github.com/nukenov2006/NoSql.git

Project Structure
server.js – Main server file.
package.json – Dependencies and scripts.
routes/ – API endpoints.
models/ – Database models.
config/ – Configuration settings.
views/ – Front-end templates (if applicable).
public/ – Static assets.
.env – Environment variables.

Usage

Register using email and  go through logining

Technologies Used

Backend:  Node.js, Express.js, Python

Frontend: EJS, HTML/CSS

Database:  MongoDB

Authentication: Passport.js



auth.js – Authentication API

Handles user login, registration, and logout.
Uses passport for authentication.
Encrypts passwords with bcrypt.
catalog.js – Data Catalog API

Manages fetching and displaying stored data.
Likely interacts with MongoDB through Mongoose models.
contact.js – Contact Form API

Processes user contact requests or feedback.
May send emails or store messages in the database.
gallery.js – Image Gallery API

Manages images, likely supporting upload and retrieval.
Might use MongoDB's GridFS or store file paths.
index.js – Main Routing

Redirects to different sections (home, dashboard, etc.).
mainRoutes.js – Core Application API

Possibly handles general requests and middleware.
Author

Nukenov Daniyar

