const userModel = require('../models/userModel')


const usersList = async (req, res, next) => {
    let projection = {}
    if (req.query.hasOwnProperty('fields')) {
        projection = req.query.fields.split(',').reduce((total, current) => {
            return {[current]:1,...total}
        },{})
    }
    // http://localhost:3334/api/v1/users?fields=first_name
    const users = await userModel.find({},projection)
    res.send({
        success: true,
        message: "نمایش لیست کاربران با موفقیت انجام شد",
        data:{
            users
        }
    })
}

const addUser = async (req, res, next) =>{

    try {
        const {first_name,last_name,mobile,email} = req.body
        const userImage = req.file.path
        
        if(first_name === undefined|| first_name === "" || last_name === ""){
            return res.send(422).send({
                error: true,
                message: 'اطلاعات ارسالی معتبر نیست'
            })
        }
        
        const newUser = new userModel({
            first_name,
            last_name,
            mobile,
            email,
            userImage
        })
        
        await newUser.save()
       
        res.status(201).send({
            success: true,
            message: 'کاربر جدید با موفقیت ایجاد شد',
            newUser
        })
        
    } 
    catch (error) {
        next(error)
    }
}

const getUser = async (req, res, next) => {

    try {

        const {id} = req.params

        if(!id){
            return res.status(404).send({error:true, message:'no user found'})
        }

        const user = await userModel.findOne({_id:id})
        
        if(!user){
            return res.status(404).send({error:true, message:'no user found'})
        }

        return res.send({
            success:true,
            data:{
                user
            }
        })
    }

     catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) =>{
   try {
    const {id} = req.params

    if(!id){
        return res.status(404).send({error:true, message:'no user found'})
    }
    await userModel.deleteOne({_id:id})
    res.send({
        success: true,
        message: 'deleted successfully'
    })

   } catch (error) {
       next(error)
   } 
}

const updateUser = async (req, res, next) => {
    try {
        const {id} = req.params

        if(!id){
            return res.status(404).send({error:true, message:'no user found'})
        }

        const {n, nModified} = await userModel.updateOne({_id:id},{...req.body})
        if (n ===0 || nModified ===0) {
            throw new Error('not ok to update')
        }
        res.send({
            success: true,
            message: 'updated successfully'
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    usersList,
    addUser,
    getUser,
    deleteUser,
    updateUser
}