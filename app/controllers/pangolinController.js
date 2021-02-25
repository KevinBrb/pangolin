const Pangolin = require('../models/Pangolin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailValidator = require('email-validator');
const sanitizeHtml = require('sanitize-html');

const pangolinController = {
    /**
     * @param {object} req.body.login - Login of user to check if login exists
     * @param {object} res - The response
     * @returns {object} 200 - response
     * @example
     *      pangolinController.login()
     */
    login: async (req, res) => {
        try {
            const pangolin = await Pangolin.findByLogin(req.body.login);
            if(pangolin.login === undefined) {
                res.status(403).json({message: 'Unknown user'});
            } else {
                const validPwd = await bcrypt.compare(req.body.password, pangolin.password);

                if(!validPwd) {
                    res.status(403).json({message: 'Wrong password'});
                } else {
                    let jwtToken = jwt.sign({
                        login: pangolin.login,
                        userId: pangolin._id
                    }, process.env.SECRET, {
                        expiresIn: '1h'
                    });
                    res.status(200).json({
                        token: jwtToken,
                        expiresIn: 3600,
                        _id: pangolin._id,
                        login: pangolin.login
                    });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message: error});
        }
    },

    /**
     * @param {object} req.session - Destroy session
     * @param {object} res - The response
     * @returns {object} 200 - response
     * @example
     *      pangolinController.logout()
     */
    logout: (req, res) => {
        try {                
            req.session.destroy();
            res.status(200).json({message: 'Disconnected'});
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * @param {object} req.body - New pangolin form
     * @param {object} res - The response
     * @returns {object} 200 - response
     * @example
     *      pangolinController.signup()
     */
    signup: async (req, res) => {
        try {
            // Regex for pwd
            const pwdCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

            // Clean html before stock description
            req.body['description'] = sanitizeHtml(req.body['description']);

            // Check if account already exist
            const pangolinLogin = await Pangolin.findByLogin(req.body.login);
            if (pangolinLogin.login !== undefined) {
                return res.status(400).json({message: 'Login already used'});
            }

            const pangolinEmail = await Pangolin.findByEmail(req.body.email);
            if (pangolinEmail.email !== undefined) {
                return res.status(400).json({message: 'Email already used'});
            }

            // Valid mail format
            if (!emailValidator.validate(req.body.email)) {
                return res.status(400).json({
                    message: 'Wrong email format'
                });
            }

            if(typeof req.body.age !== 'number' || req.body.age === undefined) {
                return res.status(400).json({
                    message: 'Age must be a number and is mandatory'
                });
            } else if (req.body.age < 1) {
                return res.status(400).json({
                    message: 'You must have more than 1 year to register'
                });
            }

            // Mot de passe fort
            if(!pwdCheck.exec(req.body.password)){
                return res.status(400).json({
                    message: 'Your password should contains between 6 and 20 caracters, a capital letter and a number'
                });
            }

            // le mdp et la confirmation ne correspondent pas
            if (req.body.password !== req.body.passwordConfirm) {
                return res.status(400).json({message: "password doesn\'t match"});
            }

             // 5 - On crypt
             const salt = await bcrypt.genSalt(10);
             const encryptedPassword = await bcrypt.hash(req.body.password, salt);
             req.body.password = encryptedPassword;

             delete req.body.passwordConfirm;

             req.body.friends = [];

             const newPangolin = new Pangolin(req.body);
             await newPangolin.create();

             const pangolinResult = await Pangolin.findByLogin(req.body.login);

             res.status(200).json(pangolinResult);
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * @param {object} res - The response
     * @returns {object} 200 - Pangolins list
     * @example
     *      pangolinController.allPangolins()
     */
    allPangolins: async (_, res) => {
        const pangolins = await Pangolin.findAll();

        if(pangolins.length < 1) {
            res.status(404).json({message: 'No pango in database'});
        } else {
            res.status(200).json(pangolins);
        }
    },

    signupFriend: async (req, res) => {
        const checkPangolin = await Pangolin.findById(req.body.currentId);

        if(!checkPangolin) {
            res.status(400).json({message: 'User doesn\'t exists'});
        } else {
            try {
                // Regex for pwd
                const pwdCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    
                // Clean html before stock description
                req.body['description'] = sanitizeHtml(req.body['description']);
    
                // Check if account already exist
                const pangolinLogin = await Pangolin.findByLogin(req.body.login);
                if (pangolinLogin.login !== undefined) {
                    return res.status(400).json({message: 'Login already used'});
                }
    
                const pangolinEmail = await Pangolin.findByEmail(req.body.email);
                if (pangolinEmail.email !== undefined) {
                    return res.status(400).json({message: 'Email already used'});
                }
    
                // Valid mail format
                if (!emailValidator.validate(req.body.email)) {
                    return res.status(400).json({
                        message: 'Wrong email format'
                    });
                }
    
                if(typeof req.body.age !== 'number' || req.body.age === undefined) {
                    return res.status(400).json({
                        message: 'Age must be a number and is mandatory'
                    });
                } else if (req.body.age < 1) {
                    return res.status(400).json({
                        message: 'You must have more than 1 year to register'
                    });
                }
    
                // Mot de passe fort
                if(!pwdCheck.exec(req.body.password)){
                    return res.status(400).json({
                        message: 'Your password should contains between 6 and 20 caracters, a capital letter and a number'
                    });
                }
    
                // le mdp et la confirmation ne correspondent pas
                if (req.body.password !== req.body.passwordConfirm) {
                    return res.status(400).json({message: "password doesn\'t match"});
                }
    
                 // 5 - On crypt
                 const salt = await bcrypt.genSalt(10);
                 const encryptedPassword = await bcrypt.hash(req.body.password, salt);
                 req.body.password = encryptedPassword;
                
                 const currentUserId = req.body.currentUserId;
                 delete req.body.passwordConfirm;
                 delete req.body.currentUserID;
                 delete req.body.currentUserId;
    
                 req.body.friends = [];
    
                 const newPangolin = new Pangolin(req.body);
                 const newPangolinInserted = await newPangolin.create();

                 const dataForFriendUpdate = {
                     id: newPangolinInserted._id,
                     login: newPangolinInserted.login
                 }
                 
                 const updateFriendResult = await Pangolin.findByIdAndUpdateFriend(currentUserId, dataForFriendUpdate);

                 if(updateFriendResult === 1) {
                    res.status(200).json('data updated');
                } else if(updateFriendResult === 0) {
                    res.status(400).json('Data not updated');
                } 
            } catch (error) {
                console.log(error);
            }
        }
    },

    /**
     * @param {object} req.query.id - Needed to find account in db
     * @param {object} res - The response
     * @returns {object} 200 - response
     * @example
     *      pangolinController.myAccount()
     * @example
     *      front query : /my-account?id=xxxxxxxx
     */
    myAccount: async (req, res) => {
        const pangolin = await Pangolin.findById(req.query.id);
        
        if(!pangolin) {
            res.status(404).json({message: 'No pango in database'});
        } else {
            res.status(200).json({
                _id: pangolin._id,
                login: pangolin.login,
                description: pangolin.description,
                food: pangolin.food,
                age: pangolin.age,
                race: pangolin.race,
                species: pangolin.species,
                friends: pangolin.friends,
                email: pangolin.email
            })
        }         
    },

    /**
     * @param {object} req.params.id - Needed to find account in db
     * @param {object} res - The response
     * @returns {object} 200 - success message
     * @returns {object} 400 - error message
     * @example
     *      pangolinController.updatePangolin()
     */
    updatePangolin: async (req, res) => {
        if(!req.body) {
            res.status(400).json('No data');
        } else {
            const body = req.body;
            req.body['description'] = sanitizeHtml(req.body['description']);
            const updatedPangolin = await Pangolin.findByIdAndUpdate(req.params.id, body);

            if(updatedPangolin === 1) {
                res.status(200).json('data updated');
            } else if(updatedPangolin === 0) {
                res.status(400).json('Data not updated');
            } 
    
        }
    },

    /**
     * @param {object} req.params.id - Needed to find account in db
     * @param {object} res - The response
     * @returns {object} 200 - response
     * @example
     *      pangolinController.onePangolin()
     */
    onePangolin: async (req, res) => {
        const pangolin = await Pangolin.findById(req.params.id);
        
        if(!pangolin) {
            res.status(404).json({message: 'No pango in database'});
        } else {
            res.status(200).json({
                _id: pangolin._id,
                login: pangolin.login,
                description: pangolin.description,
                food: pangolin.food,
                email: pangolin.email,
                age: pangolin.age,
                race: pangolin.race,
                species: pangolin.species,
                friends: pangolin.friends
            })
        }        
    },

    /**
     * @param {object} req.body._id - Needed to find friend in db and construct data object
     * @param {object} req.body.login - Needed to construct data object
     * @param {object} res - The response
     * @returns {object} 200 - response
     * @example
     *      pangolinController.updateFriends()
     */
    updateFriends: async (req, res) => {
        if(!req.body) {
            res.status(400).json('No data');
        } else {
            const accountID = req.body.idAccount;
            const body = {
                id: req.body._id,
                login: req.body.login
            };
            const updatedPangolin = await Pangolin.findByIdAndUpdateFriend(accountID, body);
            if(updatedPangolin === 1) {
                res.status(200).json('data updated');
            } else if(updatedPangolin === 0) {
                res.status(400).json('Data not updated');
            } 
    
        }
    },

    /**
     * @param {object} req.body._id - Needed to find friend in db and construct data object
     * @param {object} req.body.login - Needed to construct data object
     * @param {object} res - The response
     * @returns {object} 200 - response
     * @example
     *      pangolinController.updateFriends()
     */
    deleteFriends: async (req, res) => {
        if(!req.body) {
            res.status(400).json('No data');
        } else {
            const accountID = req.body.idAccount;
            const body = {
                id: req.body._id,
                login: req.body.login
            };
            const removedPangolin = await Pangolin.findByIdAndRemoveFriend(accountID, body);

            if(removedPangolin === 1) {
                res.status(200).json('data removed');
            } else if(removedPangolin === 0) {
                res.status(400).json('Data not removed');
            } 
    
        }
    }
}

module.exports = pangolinController;