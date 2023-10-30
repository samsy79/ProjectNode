var DB = require("../facades/db");
const { getClient } = require("../database/index");
require("dotenv").config;
const bcrypt = require('bcryptjs');
const {Mail} = require ("../facades/mail")
const jwt = require("jsonwebtoken");
const { secretKey, expiresIn } = require("../config/Confidentials");

//-----------------Avoir tous les utilisateur de ma base de données---------------------------------------
const getUsers = async function (req, res) {
  try {
    const Users = await DB.collection("Users").find({}).toArray();
    res.status(201).send(Users);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Oups Something Wrong Wrong during recovery", e });
  }
  /*   finally {
     // await getClient().close();
    } */
};
//---------------------Envoyer un utilisateur dans la base de données------------------------------
const postUser = async function (req, res) {
  try {
    await DB.collection("Users").insertOne(req.body);
    res.status(201).send("insertion avec succès ");
  } catch (error) {
    res.status(500).json({ message: "Oups Something when sending ", error });
  }
  /* finally {
      await getClient().close();
    } */
};
//---------------Générer un id autoincrémental lors de l'inscription-------------------------------

async function AutoId() {
  const TableLength = users.find({}).sort({ id: -1 }).limit(1).toArray();
  const notNull = TableLength.length > 0;
  if (notNull) {
    return TableLength[0].id + 1;
  } else {
    return 1;
  }
}
//--------------------pour faire une inscription--------------------------------------------------------------------
const register = async (req, res, next) => {
  try {
    //Enregistrement des infos saisies
    const email = req.body.email;
    const reqPassword = req.body.password;
    const reqAge = req.body.age;
    const reqKnowMore = req.body.knowMore;
  

    if (!email || !reqPassword || !reqAge) {
     res.status(400).json({ message: "Bro you still have a lot left" });
    }
    //Verification de l'existence de l'utilisateur

    const alreadyExist = await DB.collection("Users").findOne({email});

    if (alreadyExist) {
      res.status(400).json({
        message: "Already exists ",
      });
    }
    const hashFrequence = 10;
    const hashPassword =  await bcrypt.hash(reqPassword, hashFrequence); 
    //definition de l'objet a envoyer dans la table
    const newUser = {
      email: email,
      password: hashPassword,
      age: reqAge,
      knowMore: reqKnowMore,
    };
console.log(newUser);
    //Insersion du  nouvel utilisateur
    await DB.collection("Users").insertOne(newUser);

    //Génération de jeton Jwt
    const token = jwt.sign({ email: newUser.email}, secretKey, {
      expiresIn: expiresIn,
    });
    console.log(token);
      res.status(200).json({
      Message: "ようこそ : welcome among us",
      PersonalId: newUser,
      token : token
    });
  } catch (error) {
    res.status(500).json({ message: "Oups Something Wrong when registering ", error });
  }
};
//----------------pour se connecter -------------------------------------------
const login = async (req, res, next) => {
  try {
    const users = await DB.collection("Users");
    //---------enrégistrement des infos entrés par 'utilisateur ------------------------------
    
    const email = req.body.email;
    const reqPassword = req.body.password;
    //--------------vérification de l'existence de l'utilisateur-------------------------------------------
    if (!email || !reqPassword) {
      res.status(400).json({ message: "Bro you still have a lot left" });
    }
    const userExist = await DB.collection("Users").findOne({ email });
    //validation des informations saisies
    if (!userExist) {
      res.status(400).json({ message: "Review your login details" });
    }
    const realPass = userExist.password;
    const passwordIsVerif = await bcrypt.compare(reqPassword, realPass);

    if (!passwordIsVerif) {
      res.status(400).json({ message: "Review your login details " });
    }
    //generer un token d'auth

    const token = jwt.sign(
      {
        id: userExist.id,
        email: userExist.email,
        age: userExist.age,
        knowMore: userExist.knowMore,
      },
      secretKey,
      {
        expiresIn: expiresIn,
      }
    );
    req.token = token;
    res.status(201).json({
      message: "You are now connected",
      token: token,
    });
  } catch (e) {
    res.status(500).json({ message: "Oups Something Wrong when connecting", e });
  }
};
//-------------------Avoir tous les informations sur l'utlisateur connecté-----------------------------
const allInfo = async (req, res, next) => {
  const token = req.header;
  console.log(token);
  if (token) {
    try {
      const deencryptToken = jwt.verify(token, secretKey);
      req.user = deencryptToken ;
    } catch (e) {
      res.status(500).json({
          message: "Oups Something Wrong  when retrieving information ",
          e,
        });
    }
  }
  next();
};
//---------------------Envoi de mail ------------------------------
const mailling = async function(req,res,next){
  await Mail.to('samsy@gmail.com').send('salut tous ')
  }
module.exports = { getUsers, postUser, register, login, allInfo , mailling };
