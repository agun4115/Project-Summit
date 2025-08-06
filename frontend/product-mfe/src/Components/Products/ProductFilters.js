import React, { useState, useEffect } from 'react';
import { Card, Select, InputNumber, Button, Space, Typography, Divider } from '@sysco/ui-utility';
import { UNIT_TYPES } from '../../Constants/enums';
import { fetchCategoriesForFilter } from 'APIs/categoryApis.js';

const { Title, Text } = Typography;
const { Option } = Select;

const ProductFilters = ({ filters, onFilterChange, onClearFilters, loading }) => {
    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [initialCategoryVal, setinitialCategoryVal] = useState("")

    useEffect(() => {
        const loadCategories = async () => {
            try {
                setCategoriesLoading(true);
                const categoryData = await fetchCategoriesForFilter();
                setCategories(categoryData);
            } catch (error) {
                console.error('Failed to load categories:', error);
                setCategories([]);
            } finally {
                setCategoriesLoading(false);
            }
        };

        loadCategories();
    }, []);

    useEffect(() => {
        if (categories.length > 0 && filters.category) {
            const initialCategory = categories.find(c => c.value == filters.category);
            if (initialCategory) {
                setinitialCategoryVal(initialCategory.label);
            } else {
                setinitialCategoryVal("");
            }
        } else {
            setinitialCategoryVal("");
        }
    }, [categories, filters.category]);

    const handleFilterUpdate = (field, value) => {
        const newFilters = { ...filters, [field]: value };
        onFilterChange(newFilters);
    };

    const hasActiveFilters = filters.category || filters.minPrice || filters.maxPrice || filters.unitType;

    return (
        <Card
            title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Title level={4} style={{ margin: 0 }}>Filters</Title>
                    {hasActiveFilters && (
                        <Button 
                            type="link" 
                            size="small" 
                            onClick={onClearFilters}
                            disabled={loading}
                        >
                            Clear All
                        </Button>
                    )}
                </div>
            }
            style={{ position: 'sticky', top: '24px' }}
        >
            <Space direction="vertical" style={{ width: '100%' }} size="large">
                {/* Category Filter */}
                <div>
                    <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                        Category
                    </Text>
                    
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Select category"
                        value={initialCategoryVal || undefined}
                        onChange={(value) => handleFilterUpdate('category', value)}
                        allowClear
                        disabled={loading || categoriesLoading}
                        loading={categoriesLoading}
                    >
                        {categories.map(category => (
                            <Option key={category.value} value={category.value}>
                                {category.label}
                            </Option>
                        ))}
                    </Select>
                </div>

                <Divider style={{ margin: '8px 0' }} />

                {/* Unit Type Filter */}
                <div>
                    <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                        Unit Type
                    </Text>
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Select unit type"
                        value={filters.unitType || undefined}
                        onChange={(value) => handleFilterUpdate('unitType', value)}
                        allowClear
                        disabled={loading}
                    >
                        {Object.entries(UNIT_TYPES).map(([key, value]) => (
                            <Option key={key} value={key}>
                                {value}
                            </Option>
                        ))}
                    </Select>
                </div>

                <Divider style={{ margin: '8px 0' }} />

                {/* Price Range Filter */}
                <div>
                    <Text strong style={{ display: 'block', marginBottom: '12px' }}>
                        Price Range
                    </Text>
                    
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <div>
                            <Text style={{ fontSize: '12px' }}>Min Price ($)</Text>
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder="0.00"
                                min={0}
                                precision={2}
                                value={filters.minPrice || undefined}
                                onChange={(value) => handleFilterUpdate('minPrice', value)}
                                disabled={loading}
                            />
                        </div>
                        
                        <div>
                            <Text style={{ fontSize: '12px' }}>Max Price ($)</Text>
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder="999.99"
                                min={0}
                                precision={2}
                                value={filters.maxPrice || undefined}
                                onChange={(value) => handleFilterUpdate('maxPrice', value)}
                                disabled={loading}
                            />
                        </div>
                    </Space>
                </div>

                {/* Active Filters Summary */}
                {hasActiveFilters && (
                    <>
                        <Divider style={{ margin: '8px 0' }} />
                        <div>
                            <Text style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>
                                Active Filters:
                            </Text>
                            <Space direction="vertical" size="small">
                                {filters.category && (
                                    <Text style={{ fontSize: '12px' }}>
                                        Category: <strong>{categories.find(c => c.value === filters.category)?.label}</strong>
                                    </Text>
                                )}
                                {filters.unitType && (
                                    <Text style={{ fontSize: '12px' }}>
                                        Unit Type: <strong>{UNIT_TYPES[filters.unitType]}</strong>
                                    </Text>
                                )}
                                {filters.minPrice && (
                                    <Text style={{ fontSize: '12px' }}>
                                        Min Price: <strong>${filters.minPrice}</strong>
                                    </Text>
                                )}
                                {filters.maxPrice && (
                                    <Text style={{ fontSize: '12px' }}>
                                        Max Price: <strong>${filters.maxPrice}</strong>
                                    </Text>
                                )}
                            </Space>
                        </div>
                    </>
                )}
            </Space>
        </Card>
    );
};

export default ProductFilters;
