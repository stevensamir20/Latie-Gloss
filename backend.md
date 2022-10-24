### Authentication (ADMIN ONLY)

- POST `/api/auth/admin/login` - body: `{ username, email, password }` - returns a JWT token
  (and password can be changed)

### Products

- GET `/api/products` - get all products
- GET `/api/products/:id` - get a product by id

- POST `/api/products` - [admin token] body: `{ id(number), title(string), type(string), price(number),color(string), description(string), image1(string), image2(string), image3(string) }` - creates a new product
- PUT `/api/products/:id` - [admin token] body: `{ id(number), title(string), type(string), price(number),color(string), description(string), image1(string), image2(string), image3(string) }` - updates a product
- DELETE `/api/products/:id` - [admin token] - deletes a product

### Orders

- POST `/api/orders` - body: `{ userData: [{}] items: [{ productId(number), amount(number), price(number), title(string), type(string), image(string) }] }` - creates a new order and calculates prices, amount and total prices (also sends an email with that order information)

- GET `/api/orders` - [admin token] - get all orders
- GET `/api/orders/:id` - [admin token] - get an order by id
- DELETE `/api/orders/:id` - [admin token] - deletes an order
