require('dotenv').config();
var express = require('express');
var router = express.Router();
var userModel = require("../models/userModel");
var blogModel = require("../models/blogModel");
var bcrypt = require('bcryptjs');
const multer  = require('multer');
const path = require('path');
var jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
if (!secret) {
  console.error("FATAL: JWT_SECRET environment variable is not set.");
  process.exit(1);
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/signUp", async (req, res) => {
  let { username, name, email, password } = req.body;
  let emailCon = await userModel.findOne({ email: email });
  if (emailCon) {
    return res.json({
      success: false,
      msg: "Email already exists"
    });
  }
  else {
    bcrypt.genSalt(12, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) throw err;

        let user = await userModel.create({
          username: username,
          name: name,
          email: email,
          password: hash,
        });

        return res.json({
          success: true,
          msg: "User created successfully",
        })
      });
    });
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email: email });
  if (!user) {
    return res.json({
      success: false,
      msg: "User not found"
    });
  }
  else {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign({ userId: user._id }, secret, { expiresIn: '7d' });
        return res.json({
          success: true,
          msg: "User logged in successfully",
          token: token
        })
      }
      else{
        return res.json({
          success: false,
          msg: "Invalid password"
        })
      }
    })
  }
});

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extName = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extName);
  }
})

const fileFilter = function (req, file, cb) {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpeg, png, gif, webp) are allowed'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

router.post("/uploadBlog", upload.single('image'), async (req, res) => {
  try {
    let {token, title, desc, content} = req.body;
    // Decode the token to get the user ID
    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      return res.status(401).json({ success: false, msg: "Invalid or expired token" });
    }
    let user = await userModel.findOne({ _id: decoded.userId });
    
    if (!user) {
      return res.json({
        success: false,
        msg: "User not found"
      });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ success: false, msg: "Access denied: admin only" });
    }
    
    // Retrieve the file name from the uploaded file
    const imageName = req.file ? req.file.filename : null;

    // Create a new blog entry
    let blog = await blogModel.create({
      title: title,
      content: content,
      image: imageName, // Use the image name here
      desc: desc,
      user: user._id
    });

    // Respond with success
    return res.json({
      success: true,
      msg: "Blog created successfully",
      blog: blog
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      msg: "An error occurred"
    });
  }
});

router.post("/getBlogs", async (req, res) => {
  try {
    let {token} = req.body;
    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      return res.status(401).json({ success: false, msg: "Invalid or expired token" });
    }
    let user = await userModel.findOne({ _id: decoded.userId });
    if (!user) {
      return res.json({
        success: false,
        msg: "User not found"
      });
    }
    let blogs = await blogModel.find({});
    return res.json({
      success: true,
      msg: "Blogs featched successfully",
      blogs: blogs
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, msg: "An error occurred" });
  }
});

router.post("/getBlog", async (req, res) => {
  try {
    let {token, blogId} = req.body;
    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      return res.status(401).json({ success: false, msg: "Invalid or expired token" });
    }
    let user = await userModel.findOne({ _id: decoded.userId });
    if (!user) {
      return res.json({
        success: false,
        msg: "User not found"
      });
    }
    let blog = await blogModel.findOne({_id: blogId});
    return res.json({
      success: true,
      msg: "Blog featched successfully",
      blog: blog
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, msg: "An error occurred" });
  }
})

module.exports = router;
