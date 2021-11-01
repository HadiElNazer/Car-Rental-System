import Category from '../models/category.js'; //eslint-disable-line
import Car from '../models/car.js';
import Schema from '../helpers/validationSchema.js'
const { categorySchema } = Schema;
class category {


    async addCategory(req, res, next) {
        const valid = await categorySchema.validateAsync(req.body);
        const { name, description } = valid;
        const category = new Category({
            name,
            description,
        });
        const result = await category.save();
        return result;
    }

    async updateCategory(req, res, next) {

        const valid = await categorySchema.validateAsync(req.body);
        const { categoryId } = req.params;
        const { description, name } = valid;
        const category = await Category.findById(categoryId);

        if (!category) {
            const error = new Error('Could not find categpry.');
            error.statusCode = 404;
            throw error;
        }

        await Category.updateOne(
            { _id: categoryId },
            { $set: { name: name, description: description } }
        );

    }

    async findCategory(req, res, next) {

        const { categoryId } = req.body;
        const category = await Category.findById(categoryId);
        if (!category) {
            const error = new Error('Could not find category.');
            error.statusCode = 404;
            throw error;
        }
        return category;
    }

    async findAll(req, res, next) {
        const categorys = await Category.find();
        return categorys;
    }

    async deleteCategory(req, res, next) {

        const { categoryId } = req.params;

        const category = await Category.findById(categoryId);

        if (!category) {
            const error = new Error('Could not find category.');
            error.statusCode = 404;
            throw error;
        }

        const car = await Car.findOne({ CATEGORY: categoryId });

        if (!car) {

            const category = await Category.deleteOne({ _id: categoryId });

        } else {
            const error = new Error('Could not delete category  relation car .');
            error.statusCode = 404;
            throw error;

        }
    }

}


const instance = new category();
export default instance;