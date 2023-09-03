const Contact = require('../models/Contact');
const Image = require('../models/Image');
const Video = require('../models/Videos');

const contact = async (req, res) => {
    try {
        const { name, email, number, message } = req.body;
        const data = new Contact({ name, email, number, message });
        await data.save();
        return res.json({ "msg": "Data Inserted Successfully", "status": "success" });
    } catch (error) {
        return res.json({ "msg": error.message, "status": "failed" });
    }
};

const deleteContact = async (req, res) => {
    try {
        let id = req.params.id;
        const data = await Contact.findById(id);
        if (!data) {
            return res.json({ "status": "failed" });
        }
        await Contact.findByIdAndDelete(id);
        // if (index <= 0 || index >= 6) {
        return res.json({ "status": "success", "data": data, "msg": "Data deleted Successfully." });
    } catch (error) {
        return res.json({ "status": "failed", "error": "Id is not present in Database." })
    }
}

const getContact = async (req, res) => {
    try {
        const data = await Contact.find({});
        return res.json({ "data": data });
    } catch (error) {
        return res.json({ "msg": error.message, "status": "failed" });
    }
};

const image = async (req, res) => {
    try {

        const { index, desc } = req.body;
        if (index == 1) {
            category = 'Resort';
        } else if (index == 2) {
            category = 'Decoration';
        } else if (index == 3) {
            category = 'Banquet Hall';
        } else if (index == 4) {
            category = 'Conference Hall';
        } else if (index == 5) {
            category = 'Swimming Pool';
        } else {
            return res.json({
                status: 'failed',
                msg: 'Wrong Index Number.'
            })
        }
        const data = new Image({
            filename: req.file.filename,
            originalname: req.file.originalname,
            size: req.file.size,
            category: category,
            desc: req.body.desc,
            index,
            path: `http://127.0.0.1:8000/img/${req.file.filename}`
        })
        await data.save()
        return res.json({
            "Success": true, 'path': `http://127.0.0.1:8000/img/${req.file.filename}`, filename: req.file.filename,
            originalname: req.file.originalname,
            size: req.file.size,
            category: category,
            index,
            desc,
            path: `http://127.0.0.1:8000/img/${req.file.filename}`
        })
    } catch (error) {
        return res.json({ "error": error.message })

    }
}

const getImage = async (req, res) => {
    try {
        let index = req.query.index;
        if (!index) {
            const data = await Image.find({});
            return res.json({ "status": "success", data })
        }
        const data = await Image.find({ index: index });
        if (index <= 0 || index >= 6) {
            return res.json({ "status": "falied", "data": data, "msg": "Index Value Out of Range" });
        }
        return res.json({ "status": "success", "data": data })
    } catch (error) {
        return res.json({ "error": error.message })
    }
}

const deleteImage = async (req, res) => {
    try {
        let id = req.params.id;
        const data = await Image.findById(id);
        if (!data) {
            return res.json({ "status": "failed" });
        }
        await Image.findByIdAndDelete(id);
        // if (index <= 0 || index >= 6) {
        return res.json({ "status": "success", "data": data, "msg": "Data deleted Successfully." });
    } catch (error) {
        return res.json({ "status": "failed", "error": "Id is not present in Database." })
    }
}


const uploadVideo = async (req, res) => {
    try {
        const { link, desc } = req.body;
        const data = new Video({
            Link: link,
            desc
        })
        await data.save();
        return res.json({ 'status': 'success', 'msg': 'Data Inserted Successfully' })
    } catch (error) {
        return res.json({ 'status': 'failed', 'error': error.message })
    }
}

const deleteVideo = async (req, res) => {
    try {
        let id = req.params.id;
        const data = await Video.findById(id);
        if (!data) {
            return res.json({ "status": "failed" });
        }
        await Video.findByIdAndDelete(id);
        // if (index <= 0 || index >= 6) {
        return res.json({ "status": "success", "data": data, "msg": "Data deleted Successfully." });
    } catch (error) {
        return res.json({ "status": "failed", "error": "Id is not present in Database." })
    }
}

const getVideo = async (req, res) => {
    try {
        const data = await Video.find({});
        return res.json({ 'status': 'success', 'data': data })
    } catch (error) {
        return res.json({ 'status': 'failed', 'error': error.message })
    }
}
module.exports = { contact, image, uploadVideo, getImage, deleteImage, getContact, getVideo, deleteVideo, deleteContact };

// Go to login
exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: message,
        oldInput: {
            email: '',
            password: ''
        },
        validationErrors: []
    });
};