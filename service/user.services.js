const mongoose = require('mongoose');

const User = require('../model/user');

const fs = require('fs');
const jsonData = fs.readFileSync('user.json', 'utf8');
const userArray = JSON.parse(jsonData);

const seedUser = async () => {
  try {
    for (userData of userArray) {
      const newUser = new User({
        email: userData.email,
        password: userData.password,
        profilePicture: userData.profilePicture,
        userName: userData.userName,
        phoneNumber: userData.phoneNumber,
        address: userData.address
      })
      await newUser.save();
      console.log(`new user ${newUser.userName} seeded.`)
    }
    console.log('database seeding completed.')
  } catch (error) {
    console.error('error while seeding data.', error)
  } finally {
    mongoose.disconnect()
  }
}

const signUp = async (details) => {
  try {
    const user = new User(details);

    const checkAllDetails = details.email && details.password &&
      details.profilePicture && details.userName && details.phoneNumber &&
      details.address

    if (checkAllDetails) {
      const newUser = await user.save();
      console.log(`new user ${newUser.userName} signup successfully.`);
      return newUser
    } else {
      console.error('provide all details.')
    }
  } catch (error) {
    console.error('unable to signup.', error)
  }
}

const signIn = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (user && user.password === password) {
      console.log(`user ${user.userName} signin successfully.`);
      return user
    } else {
      console.error('wrong credentials or missing field.')
    }
  } catch (error) {
    console.error('unable to signin.', error)
  }
}

const changePassword = async (email, oldPassword, newPassword) => {
  try {
    const findUser = await User.findOne({ email })

    if (findUser && findUser.password === oldPassword) {
      findUser.password = newPassword

      const updatedUser = await findUser.save();
      console.log('password changed successfully.')
      return updatedUser
    } else {
      console.error('user not found or wrong password.')
    }
  } catch (error) {
    console.error('unable to change password.', error)
  }
}

const updateProfilePicture = async (email, password, newProfilePicture) => {
  try {
    const user = await User.findOne({ email });

    if (user && user.password === password) {

      if (user && newProfilePicture) {
        user.profilePicture = newProfilePicture;

        const updatedUser = await user.save()
        console.log('profile picture changed successfully.')
        return updatedUser
      } else {
        console.error('enter new profile picture url')
      }
    } else {
      console.error('worng password or user not found')
    }
  } catch (error) {
    console.error('unable to change profile picture', error)
  }
}

const updateContactDetails = async (email, updatedDetails) => {
  try {
    const user = await User.findOne({ email });

    if (user) {

      if (user && updatedDetails) {
        Object.assign(user, updatedDetails);

        const updatedUser = await user.save();
        console.log(`${updatedUser.userName}'s details updated.`)
        return updatedUser
      } else {
        console.error('enter details')
      }
    } else {
      cosole.error('user not found')
    }
  } catch {
    cosole.error('unable to update user details', error)
  }
}

const findUserByPhoneNumber = async (phoneNumber) => {
  try {
    const user = await User.findOne({ phoneNumber })

    if (user) {
      const findUser = await user.save();
      console.log(`${findUser.userName} found.`);
      return findUser
    } else {
      console.error('user not found.')
    }
  } catch {
    console.error('unable to not found.', error)
  }
}

module.exports = { seedUser, signUp, signIn, changePassword, updateProfilePicture, updateContactDetails, findUserByPhoneNumber }