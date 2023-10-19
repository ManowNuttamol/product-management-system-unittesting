const supertest = require('supertest');

const request = supertest.agent('localhost:5000');

describe('Products', () => {
    describe('Show Products', () => {
        it('show all products', () => {
            return request.get('/products')
            .expect(200);
        });
        it('show product by id', async () => {
            return request.get('/products/1')
            .expect(200)
            .then(response => {
                expect(response.body[0]['name'])
                .toEqual('Laptop')
            });
        });
        it('no products found to show', async () => {
            return request.get('/products/9999999999')
            .expect(404);
        });
    });

    describe('Create Product', () => {
        it('create new product', () => {
            return request.post('/products')
            .send({
                name: 'Keyboard',
                category: 'Electronics',
                price: 700,
                stock: 5
            })
            .expect(201);
        });
        it('create new product from some data', () => {
            return request.post('/products')
            .send({
                name: 'Mouse',
                price: 200
            })
            .expect(201);
        });
        it('create new product without data', () => {
            return request.post('/products')
            .send({})
            .expect(500);
        });
        it('create new product from wrong data', () => {
            return request.post('/products')
            .send({
                type: 'Furniture'
            })
            .expect(500);
        });
    });

    describe('Update Product', () => {
        it('update product name', () => {
            return request.put('/products/3')
            .send({
                name: 'Notebook'
            })
            .expect(200);
        });
        it('update product stock', () => {
            return request.put('/products/4')
            .send({
                stock: 10
            })
            .expect(200);
        });
        it('update product without data', () => {
            return request.put('/products/3')
            .send({})
            .expect(200);
        });
        it('update product from wrong data', () => {
            return request.put('/products/4')
            .send({
                type: 'Furniture'
            })
            .expect(200);
        });
        it('no products found to update', () => {
            return request.put('/products/9999999999')
            .send({})
            .expect(404);
        });
    });

    describe('Delete Product', () => {
        it('delete product', () => {
            return request.delete('/products/1')
            .expect(204);
        });
        it('no products found to delete', () => {
            return request.delete('/products/9999999999')
            .expect(404);
        });
    });
});