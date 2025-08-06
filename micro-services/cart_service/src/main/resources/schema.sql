DROP TABLE IF EXISTS cart;
CREATE TABLE IF NOT EXISTS cart (
    id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    product_id BIGINT NOT NULL,
    count INTEGER NOT NULL CHECK (count > 0),
    UNIQUE(user_id, product_id)
);
