-- Sample data for cart (optional - for testing)
INSERT INTO cart (user_id, product_id, count) VALUES ('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440005', 3) ON CONFLICT (user_id, product_id) DO NOTHING;
INSERT INTO cart (user_id, product_id, count) VALUES ('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440005', 5) ON CONFLICT (user_id, product_id) DO NOTHING;
INSERT INTO cart (user_id, product_id, count) VALUES ('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440005', 2) ON CONFLICT (user_id, product_id) DO NOTHING;
INSERT INTO cart (user_id, product_id, count) VALUES ('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440005', 4) ON CONFLICT (user_id, product_id) DO NOTHING;
