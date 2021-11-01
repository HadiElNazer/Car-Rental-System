import { randomBytes } from 'crypto';
import  Schema from '../helpers/validationSchema.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createTransport } from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';
import User from '../models/user.js'; //eslint-disable-line

const {userSchema} =Schema;

const transporter = createTransport(
    sendgridTransport({
        auth: {
            api_key: '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'
        },
    }),
);


class user {


    async signup(req, res, next) {
        
        const valid =  await userSchema.validateAsync(req.body);
        const {name,email,password} = valid;
        const registrationDate = Date.now();

        const userExist = await User.findOne({ email });
        if (userExist) {
            const error = new Error('Al ready exist');
            error.statusCode = 406;
            throw error;
        }

        const hashedPw = await bcrypt.hash(password, 12);
        const user = new User({
            name,
            email,
            password: hashedPw,
            registrationDate

        });
        const result = await user.save();


        await transporter.sendMail({
            to: email,
            from: 'hadielnazertesting97@gmail.com',
            subject: "welcom " + name,
            html: '<h1>You successfully signed up!</h1>',
        });

        return result;


    }


    async login(req, res, next) {

        const valid =  await userSchema.validateAsync({email:req.body.email,password:req.body.password});
        const { email, password } = valid;

        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id.toString(),
            },
            'somesupersecretsecret',
            { expiresIn: '1h' },
        );
      return({token ,user})
    }


}

const instance = new user();
export default instance;