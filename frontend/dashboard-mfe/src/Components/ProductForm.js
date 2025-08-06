import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Input, 
  InputNumber, 
  Select, 
  Button, 
  Upload, 
  Modal, 
  Typography,
  Space,
  Row,
  Col,
  message
} from '@sysco/ui-utility';
import { PlusOutlined, DeleteOutlined } from '@sysco/ui-utility';
import { UNIT_TYPES } from '../Constants/enums';

const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;

const ProductForm = ({ visible, onCancel, onSubmit, product = null, categories = [] }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageList, setImageList] = useState([]);

  const isEdit = !!product;

  useEffect(() => {
    if (visible && product) {
      // Populate form with existing product data
      form.setFieldsValue({
        title: product.title,
        description: product.description,
        pricePerUnit: product.pricePerUnit,
        category: product.category,
        amountType: product.amountType,
        amount: product.stock || 0
      });

      // Set existing images
      if (product.images && product.images.length > 0) {
        const existingImages = product.images.map((url, index) => ({
          uid: `-${index}`,
          name: `image-${index}`,
          status: 'done',
          url: url
        }));
        setImageList(existingImages);
      }
    } else if (visible) {
      // Reset form for new product
      form.resetFields();
      setImageList([]);
    }
  }, [visible, product, form]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      
      const productData = {
        ...values,
        images: imageList.map(img => img.url || img.response?.url).filter(Boolean)
      };

      await onSubmit(productData, isEdit ? product.id : null);
      
      form.resetFields();
      setImageList([]);
      message.success(`Product ${isEdit ? 'updated' : 'created'} successfully!`);
    } catch (error) {
      console.error('Error submitting product:', error);
      message.error(`Failed to ${isEdit ? 'update' : 'create'} product`);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = ({ fileList }) => {
    setImageList(fileList);
  };

  const handleImageRemove = (file) => {
    setImageList(prev => prev.filter(item => item.uid !== file.uid));
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Modal
      title={
        <Title level={3} style={{ margin: 0 }}>
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </Title>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
      style={{ top: 20 }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ marginTop: '20px' }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="title"
              label="Product Title"
              rules={[
                { required: true, message: 'Please enter product title' },
                { min: 3, message: 'Title must be at least 3 characters' }
              ]}
            >
              <Input placeholder="Enter product title" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: 'Please enter product description' },
                { min: 10, message: 'Description must be at least 10 characters' }
              ]}
            >
              <TextArea 
                rows={4} 
                placeholder="Enter detailed product description"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="pricePerUnit"
              label="Price per Unit (Rs.)"
              rules={[
                { required: true, message: 'Please enter price' },
                { type: 'number', min: 0.01, message: 'Price must be greater than 0' }
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="0.00"
                precision={2}
                min={0.01}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="amount"
              label="Stock Quantity"
              rules={[
                { required: true, message: 'Please enter stock quantity' },
                { type: 'number', min: 0, message: 'Stock must be 0 or greater' }
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="0"
                min={0}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="categoryId"
              label="Category"
              rules={[{ required: true, message: 'Please select a category' }]}
            >
              <Select placeholder="Select category">
                {categories.map(category => (
                  <Option key={category.id} value={category.id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="amountType"
              label="Unit Type"
              rules={[{ required: true, message: 'Please select unit type' }]}
            >
              <Select placeholder="Select unit type">
                {Object.entries(UNIT_TYPES).map(([key, value]) => (
                  <Option key={key} value={key}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              label="Product Images"
              extra="Upload up to 5 images. Supported formats: JPG, PNG (Max 2MB each)"
            >
              <Upload
                listType="picture-card"
                fileList={imageList}
                onChange={handleImageChange}
                onRemove={handleImageRemove}
                beforeUpload={() => false} // Prevent auto upload
                maxCount={5}
                multiple
              >
                {imageList.length >= 5 ? null : uploadButton}
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item style={{ marginBottom: 0, marginTop: '20px' }}>
              <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                <Button onClick={onCancel}>
                  Cancel
                </Button>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                >
                  {isEdit ? 'Update Product' : 'Create Product'}
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProductForm;
