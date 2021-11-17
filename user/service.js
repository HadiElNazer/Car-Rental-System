import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createTransport } from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';
import User from './model.js'; 
import UserException from './exception.js'
import config from '../config.js'

const transporter = createTransport(
    sendgridTransport({
        auth: {
            api_key: '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'
        },
    }),
);

class user {

    async signup(body) {
        const { name, email, password } = body;
        const registrationDate = new Date();
        const userExist = await User.findOne({ email });
        if (userExist) {
            throw new UserException(409,'alreadyExist');
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
        return await result;
    }

    async login(body) {
        const { email, password } = body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new UserException(404,'notFound');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new UserException(403,'wrongPass');
        }
        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id.toString(),
            },
            config.SECRET,
            { expiresIn: '1h' },
        );
        return await ({ token, user })
    }
}

export default user;