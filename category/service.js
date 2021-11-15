import Category from './model.js'; //eslint-disable-line
import Car from '../car/model.js';
import CategoryException from './exception.js'

class category {

    async addCategory(body) {
        const { name, description } = body;
        const date = new Date();
        const category = new Category({
            name,
            description,
            createdAt: date,
            updatedAt: date
        });
        const result = await category.save();
        return await result;
    }

    async updateCategory(body, params) {
        const { categoryId } = params;
        const { description, name } = body;
        const category = await Category.findById(categoryId);
        if (!category) {
           throw new CategoryException(404,'notFound');
        }
        const date = new Date();
        await Category.updateOne(
            { _id: categoryId },
            { $set: { name: name, description: description, updatedAt: date } }
        );
    }

    async findCategory(body) {
        const { categoryId } = body;
        const category = await Category.findById(categoryId);
        if (!category) {
           throw new CategoryException(404,'notFound')
        }
        return await category;
    }

    async findAll() {
        const categorys = await Category.find();
        return await categorys;
    }

    async deleteCategory(params) {
        const { categoryId } = params;
        const category = await Category.findById(categoryId);
        if (!category) {
            throw new CategoryException(404,'notFound')
        }
        const car = await Car.findOne({ Category: categoryId });
        if (!car) {
            await Category.deleteOne({ _id: categoryId });
        } else {
           throw new CategoryException(460,'brandRelationCar')
        }
    }

}


export default category;