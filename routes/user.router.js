const express = require('express');
const userRoute = express.Router();

const { signUp, signIn, changePassword, updateProfilePicture, updateContactDetails, findUserByPhoneNumber } = require('../service/user.services');

userRoute.use(express.json())

//signup API
userRoute.post('/signup', async (req, res) => {
  try {
    const { email, password, profilePicture, userName, phoneNumber, address } = req.body

    if (email && password && profilePicture && userName && phoneNumber && address) {
      const newUser = await signUp(req.body);

      if (newUser) {
        res.status(200).json({ 'signup successfully': newUser })
      } else {
        res.status(401).json({ error: 'could not create user!' })
      }
    } else {
      res.status(401).json({ error: 'fill all details!' })
    }
  } catch (error) {
    console.error('unable to signup!', error)
  }
})

//login API
userRoute.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      const user = await signIn(email, password);

      if (user) {
        res.status(200).json({ 'login successfully': user })
      } else {
        res.status(401).json({ error: 'could not login!' })
      }
    } else {
      res.status(401).json({ error: 'fill all details!' })
    }
  } catch (error) {
    console.error('unable to Login!', error)
  }
})

//change password API
userRoute.post('/user/change-password', async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    if (email && currentPassword && newPassword) {
      const updatedUser = await changePassword(email, currentPassword, newPassword)

      if (updatedUser) {
        res.status(200).json({ 'password changed successfully': updatedUser })
      } else {
        res.status(401).json({ error: 'current password does not mached!' })
      }
    } else {
      res.status(401).json({ error: 'fill all details!' })
    }
  } catch (error) {
    console.error('unable to change password!', error)
  }
})

// update profile-picture API
userRoute.post('/user/update-profile-picture', async (req, res) => {
  try {
    const { email, password, newProfilePicture } = req.body;

    if (email && newProfilePicture) {
      const user = await updateProfilePicture(email, password, newProfilePicture);

      if (user) {
        res.status(200).json({ 'profile picture changed successfully': user })
      } else {
        res.status(401).json({ error: 'worng password or user not found!' })
      }
    } else {
      res.status(401).json({ error: 'fill all details!' })
    }
  } catch (error) {
    console.error('unable to change profile picture!', error)
  }
})

// update contact API
userRoute.post('/user/update-contact/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const data = req.body;

    if (email && data) {
      const getUser = await updateContactDetails(email, data);

      if (getUser) {
        res.status(200).json({ 'user updated successfully': getUser })
      } else {
        res.status(401).json({ error: 'user not found!' })
      }
    } else {
      res.status(401).json({ error: 'fill all details!' })
    }
  } catch (error) {
    console.error('unable to update user!', error)
  }
})

// user by number 
userRoute.get('/users/phone/:phoneNumber', async (req, res) => {
  try {
    const number = req.params.phoneNumber;

    if (number) {
      const user = await findUserByPhoneNumber(number)

      if (user) {
        res.status(200).json({ 'user found by phone number': user })
      } else {
        res.status(401).json({ error: 'user not found!' })
      }
    } else {
      res.status(401).json({ error: 'fill all details!' })
    }
  } catch (error) {
    console.error('unable to update user!', error)
  }
})

module.exports = userRoute