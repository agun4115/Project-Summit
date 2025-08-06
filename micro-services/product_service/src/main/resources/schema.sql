CREATE EXTENSION IF NOT EXISTS "pgcrypto";
DROP TABLE IF EXISTS product_images;
DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    amount DECIMAL(10,2) NOT NULL,
    amount_type VARCHAR(50),
    price_per_unit DECIMAL(10,2) NOT NULL,
    category_id BIGINT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'PENDING',
    seller_id VARCHAR(255) NOT NULL,
    reviewed_by VARCHAR(255),
    reviewed_at TIMESTAMP
);

CREATE TABLE product_images (
    product_id BIGINT NOT NULL,
    image_url TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
