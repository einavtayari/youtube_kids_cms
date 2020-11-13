const express = require('express');
const { userModel, validUser, validLogin, createToken,validEditUser } = require("../models/users_model")
const router = express.Router();
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const { authToken } = require('../middleware/auth');


/* GET users listing. */
router.get('/', async (req, res) => {
  // 1 - אומר להציג
  // 0 - אל תציד רק את המאפין הנל
  userModel.find({}, { email: 1, user: 1 })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    })
});

//TODO: get new token route

//איזור שמבצע בדיקה בכל פעולה של היוזר 
router.get('/auth',authToken,(req,res) => {
  res.json({status:"ok"}) 
})


// router.get('/single/:id',authToken, async (req, res) => {
//   let userId = req.params.id;
//   userModel.findOne({_id:userId}, { email: 1, user: 1 })
//     .then(data => {
//       res.json(data);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     })
// })

router.get('/single/',authToken, async (req, res) => {
  // יתקבל מהמידל וואיר שמפענח את הטוקן
  let userId = req._id;
  userModel.findOne({_id:userId}, { email: 1, user: 1 })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    })
})

// authToken - מיידל ווארי שבודק שנשלח טוקן תקני
router.get('/admin',authToken, async (req, res) => {
  userModel.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    })
});


// עמוד לוגין משווה מידע שהזין משתמש לדאטה בייס
//מספק טוקן
router.post("/login", async (req, res) => {
  let valid = validLogin(req.body)
  if (!valid.error) {
    try {
      let user = await userModel.findOne({ email: req.body.email })
      if (user) {
        // לבדוק שהסטרינג סיסמא שהגיע מהצד לקוח תואם להצפנה 
        // במסד נתונים
        let validPass = await bcrypt.compare(req.body.pass, user.pass);
        if (!validPass) { res.status(400).json({ message: "password not good, go work" }) }
        else {
          console.log(user)
          let token = createToken(user.id,user.email);

          res.json({token})
        }
      }
      else {
        res.status(401).json({ message: "user not found, go home" })
      }
    }
    catch(err){
      res.status(401).json(err);
    }
  }
  else {
    res.status(401).json(valid.error.details);
  }
})

//בודק שגיאה במידע ואם אין שגיאה מצפין את המידע ומכניס לדאטה בייס
// המידע מוחזר בלי סיסמא כדי שלא ייחשף להאקרים
router.post("/add", async (req, res) => {
  let valid = validUser(req.body);
  if (!valid.error) {
    // מגדיר רמת הצפנה
    let salt = await bcrypt.genSalt(10);
    req.body.pass = await bcrypt.hash(req.body.pass, salt);
    try {
      let data = await userModel.insertMany([req.body]);
      // מסתיר מאפיינים שאנחנו לא נרצה להציג , נכתוב את המאפיינים שכן נרצה להציג
      let dataHidden = _.pick(data[0], ["user", "email", "_id", "date_time"])
      res.json(dataHidden)
    }
    catch (err) {
      res.status(400).json({message:"user already in system ",code:"duplicate"});
    }
  }
  else {
    res.status(400).json(valid.error.details);
  }
})


// ניתן לערוך רק שם משתמש ואימייל
// סיסמא צריך ראוט בפני עצמו
router.put("/edit", async (req, res) => {
  let valid = validEditUser(req.body);
  if (!valid.error) {
    
    try {
      let data = await userModel.updateOne({ _id: req.body.id }, req.body);
      res.json(data)
      //להחזיר טוקן חדש ליוזר
    }
    catch (err) {
      res.status(400).json("id is not valid " + err);
    }
  }
  else {
    res.status(400).json(valid.error.details);
  }
})

module.exports = router;
