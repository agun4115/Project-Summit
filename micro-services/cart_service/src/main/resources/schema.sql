CREATE TABLE IF NOT EXISTS cart (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(255) NOT NULL,
    product_id BIGINT NOT NULL,
    count INTEGER NOT NULL CHECK (count > 0),
    UNIQUE(user_id, product_id)
);
