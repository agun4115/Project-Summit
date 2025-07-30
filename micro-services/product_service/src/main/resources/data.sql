Select id from categories;


-- Insert 100 products with random data
INSERT INTO products (title, description, amount, amount_type, price_per_unit, category_id, status, reviewed_by, reviewed_at)
SELECT
    'Product ' || gs::text,
    'Description for product ' || gs::text,
    (random() * 10 + 1)::numeric(5,2),
    CASE 
        WHEN gs % 3 = 0 THEN 'L'
        WHEN gs % 3 = 1 THEN 'KG'
        ELSE 'ITEMS'
    END,
    (random() * 100 + 1)::numeric(5,2),
    (select id from categories ORDER BY random() LIMIT 1), 
    'PENDING',
    '1',
    NOW()
FROM generate_series(1, 100) AS gs;

-- Insert 200 images for random products
INSERT INTO product_images (product_id, image_url)
SELECT
    p.id,
    'https://www.dummyimage.com/600x400/ffffff/777dd1.jpg&' || p.id ||'=asas'
FROM
    (SELECT id FROM products ORDER BY random() LIMIT 100) AS p,
        generate_series(1, 2) AS gs;