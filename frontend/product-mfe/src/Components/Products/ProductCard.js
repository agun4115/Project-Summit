import { Card, Typography, Button } from '@sysco/ui-utility';
import { UNIT_TYPES } from '../../Constants/enums';
import { useCart, useAuth } from '@sysco/shared-utility';

const { Title, Text } = Typography;

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { user } = useAuth();

    const handleAddToCart = async () => {
        try {
            if (!user) {
                window.location.href = '/auth/login';
            }
            addToCart(product, 1);
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100%', width: '100%' }}>
            <div style={{ background: '#f9fafb', borderRadius: 12, padding: 16 }}>
                <Card
                    hoverable
                    cover={
                        <img
                            alt={product.title}
                            src={product.images[0] || 'https://via.placeholder.com/300x200?text=No+Image'}
                            style={{ height: 200, objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                        />
                    }
                    style={{ marginBottom: '16px', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}
                    bodyStyle={{ background: '#fff', borderRadius: 12 }}
                >
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                        <Title level={2} style={{ margin: 0, color: '#1a237e' }}>
                            {product.title}
                        </Title>
                    </div>
                    <div style={{ marginBottom: 8, textAlign: 'center' }}>
                        <Text style={{ fontSize: 12, color: '#388e3c' }}>
                            {product.pricePerUnit ? `Rs. ${product.pricePerUnit} per ${UNIT_TYPES[product.amountType]}` : 'Price N/A'}
                        </Text>
                    </div>
                </Card>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 8 }}>
                    <Button
                        onClick={handleAddToCart}
                        style={{ background: '#1976d2', color: '#fff', borderRadius: 8 }}
                    >
                        {user ? 'Add to Cart' : 'Login to Add'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
