const User = require('../../models/User');
const { ApolloError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    Mutation: {
        async registerUser(_, {registerInput: {name, email, password} }) {
        
        // check if user already exists
            const oldUser = await User.findOne({ email });
        // throw error if user already exists
            if (oldUser) {
                throw new ApolloError(`You're already in the club, ${email}!`, 'USER_ALREADY_EXISTS');
            }
        // encrypt password
            const encryptedPassword = await bcrypt.hash(password, 10);
        // mongoose model to create user
            const newUser = new User({
                // _id: null,
                name: name,
                email: email.toLowerCase(),
                password: encryptedPassword
            })
        // create JWT token
            const token = jwt.sign(
                { user_id: newUser._id, email, name }, 
                process.env.JWT_SECRET,
                {
                    expiresIn: 3600
                }
            )
            newUser.token = token;
        // save user to database
        const res = await newUser.save();

        return {
            id: res.id,
            ...res._doc
        }

        },
        async loginUser(_, { loginInput: { email, password } }) {
        // check if user already exists
        const user = await User.findOne({ email });

        // check if password is correct
            if (user && (await bcrypt.compare(password, user.password))) {
            // create JWT token
            const token = jwt.sign(
                { user_id: user._id, email, name: user.name }, 
                process.env.JWT_SECRET,
                {
                    expiresIn: 3600
                }
            )
            user.token = token;
            return {
                id: user.id,
              ...user._doc
            } 
            
        } else {
            // if user doesn't exist, throw error
            throw new ApolloError("You have entered invalid information. It doesn't mean that you as a person are invalid, just that you *did* something invalid. There's a difference, don't feel too bad. Maybe just try entering something that is actually valid.", 'INVALID_CREDENTIALS');
        }
        
        }
    },
    Query: {
        getUserByEmail: async (_, {email}) => {
            const user = await User.findOne({email: email})
            return user
        },
        getUserById: async (_, {id}) => {
            const user = await User.findOne({_id: id})
            return user
        }
    }
}