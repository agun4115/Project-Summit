Select id from categories;


-- Insert 100 products with random data
INSERT INTO products (title, description, amount, amount_type, price_per_unit, category_id, status, reviewed_by, reviewed_at, seller_id)
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
    (FLOOR(random() * 8 + 1)), 
    CASE 
        WHEN gs % 2 = 0 THEN 'ACCEPTED'
        WHEN gs % 3 = 0 THEN 'PENDING'
        ELSE 'REJECTED'
    END,
    CASE 
        WHEN gs % 2 = 0 THEN '550e8400-e29b-41d4-a716-446655440008'
        WHEN gs % 3 = 0 THEN '550e8400-e29b-41d4-a716-446655440008'
        ELSE NULL
    END,
    NOW(),
    '550e8400-e29b-41d4-a716-446655440005'
FROM generate_series(1, 100) AS gs;

-- Insert 200 images for random products
INSERT INTO product_images (product_id, image_url)
SELECT
    p.id,
    (ARRAY[
        'https://plus.unsplash.com/premium_photo-1681302987568-327256dd90a7?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1525904097878-94fb15835963?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1675914850327-87b816de133e?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1705750627936-56f212db9c81?q=80&w=1292&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1519420573924-65fcd45245f8?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1618038263457-6f703507362f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1612192666501-023f87a85143?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1711633648859-1eac3e5969b9?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1668891296479-c88fd8a68509?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1634932515818-7f9292c4e149?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1685031508138-710e0e49b070?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1618686397306-b1a4a556f138?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1746783840967-738ea85b0f25?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

    ])[FLOOR(random() * 13 + 1)::int]
FROM
    (SELECT id FROM products ORDER BY random() LIMIT 100) AS p,
        generate_series(1, 2) AS gs;

