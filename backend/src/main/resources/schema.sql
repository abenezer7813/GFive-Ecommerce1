CREATE TABLE users (
                       id BIGINT PRIMARY KEY AUTO_INCREMENT,
                       email VARCHAR(100) NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       enabled BOOLEAN NOT NULL DEFAULT TRUE,
                       first_name VARCHAR(100),
                       last_name VARCHAR(100),
                       age INT,
                       gender VARCHAR(20),
                       created_at TIMESTAMP,
                       updated_at TIMESTAMP
);

CREATE TABLE roles (
                       id BIGINT PRIMARY KEY AUTO_INCREMENT,
                       name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE user_roles (
                            user_id BIGINT NOT NULL,
                            role_id BIGINT NOT NULL,
                            PRIMARY KEY (user_id, role_id),
                            CONSTRAINT fk_user_roles_user
                                FOREIGN KEY (user_id) REFERENCES users(id),
                            CONSTRAINT fk_user_roles_role
                                FOREIGN KEY (role_id) REFERENCES roles(id)
);
CREATE TABLE categories (
                            id BIGINT PRIMARY KEY AUTO_INCREMENT,
                            name VARCHAR(100) NOT NULL UNIQUE,
                            description TEXT
);

CREATE TABLE products (
                          id BIGINT PRIMARY KEY AUTO_INCREMENT,
                          name VARCHAR(150) NOT NULL,
                          description TEXT,
                          price DECIMAL(10,2) NOT NULL,
                          stock_quantity INT NOT NULL,
                          image_url VARCHAR(255),
                          category_id BIGINT,
                          created_at TIMESTAMP,
                          CONSTRAINT fk_product_category
                              FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE carts (
                       id BIGINT PRIMARY KEY AUTO_INCREMENT,
                       user_id BIGINT UNIQUE,
                       CONSTRAINT fk_cart_user
                           FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE cart_items (
                            id BIGINT PRIMARY KEY AUTO_INCREMENT,
                            cart_id BIGINT NOT NULL,
                            product_id BIGINT NOT NULL,
                            quantity INT NOT NULL,
                            CONSTRAINT fk_cart_item_cart
                                FOREIGN KEY (cart_id) REFERENCES carts(id),
                            CONSTRAINT fk_cart_item_product
                                FOREIGN KEY (product_id) REFERENCES products(id)
);
CREATE TABLE orders (
                        id BIGINT PRIMARY KEY AUTO_INCREMENT,
                        user_id BIGINT NOT NULL,
                        status VARCHAR(50) NOT NULL,
                        total_price DECIMAL(10,2) NOT NULL,
                        created_at TIMESTAMP,
                        CONSTRAINT fk_order_user
                            FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE order_items (
                             id BIGINT PRIMARY KEY AUTO_INCREMENT,
                             order_id BIGINT NOT NULL,
                             product_id BIGINT NOT NULL,
                             quantity INT NOT NULL,
                             price_at_purchase DECIMAL(10,2) NOT NULL,
                             CONSTRAINT fk_order_item_order
                                 FOREIGN KEY (order_id) REFERENCES orders(id),
                             CONSTRAINT fk_order_item_product
                                 FOREIGN KEY (product_id) REFERENCES products(id)
);
