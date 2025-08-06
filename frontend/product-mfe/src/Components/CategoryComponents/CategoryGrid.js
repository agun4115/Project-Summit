import { Row, Col } from '@sysco/ui-utility';
import CategoryItem from '@/CategoryComponents/CategoryCard';
import WelcomeBanner from "@/CategoryComponents/WelcomeBanner"

const CategoryGrid = ({ categories }) => {
    return (
        <div>
            <WelcomeBanner />
            <div className="category-list">
                <Row gutter={[16, 16]}>
                    {categories.map((cat) => (
                        <Col key={cat.id} xs={24} sm={12} md={8} lg={6}>
                            <CategoryItem category={cat} />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default CategoryGrid;