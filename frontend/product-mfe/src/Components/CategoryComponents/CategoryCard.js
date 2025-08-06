import React from 'react';
import { Card } from '@sysco/ui-utility';
import { Link } from 'react-router-dom';

const CategoryItem = ({ category }) => {
    if (!category) return null;

    const { id, name, description, imageUrl } = category;
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <Link to={`/search?category=${encodeURIComponent(id)}`} aria-label={`View products in ${name}`} style={{ textDecoration: 'none' }}>
                <Card
                    style={{ maxWidth: 400, margin: 'auto', textAlign: 'center' }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: 200,
                            overflow: 'hidden',
                            borderRadius: 16,
                            background: '#f0f0f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            src={imageUrl}
                            alt={name}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: 16,
                                opacity: 0.7,
                                transition: 'transform 0.3s, opacity 0.3s',
                                transform: isHovered ? 'scale(1.07)' : 'scale(1)',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                zIndex: 1,
                            }}
                        />
                        <div
                            style={{
                                position: 'relative',
                                zIndex: 2,
                                background: 'rgba(255,255,255,0.7)',
                                fontWeight: 'bold',
                                fontSize: 20,
                                color: '#222',
                                borderRadius: 12,
                                padding: '12px 24px',
                                display: 'inline-block',
                            }}
                        >
                            {name}
                        </div>
                    </div>
                </Card>
        </Link>
    );
};

export default CategoryItem;
