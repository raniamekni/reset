const router = require("express").Router()
const Contact = require("../models/Contact")


router.post("/createContact", async(req, res) => {
    try {
        const {fullName, phoneNumber, email} = req.body

        const usedFullName = await Contact.findOne({fullName})
        const usedPhoneNumber = await Contact.findOne({phoneNumber})
        const usedEmail = await Contact.findOne({email})

        if (usedFullName) {
            res.status(200).json({status: false, message:"FullName already exists"})
        } else if (usedPhoneNumber) {
            res.status(200).json({status: false, message:"PhoneNumber already exists"})
        } else if (usedEmail) {
            res.status(200).json({status: false, message:"Email already exists"})
        } else {
            const newContact = await Contact.create({fullName, phoneNumber, email})
            res.status(200).json({status: true, message:"contact created", data: newContact})
        }
    
    } catch(error) {
        res.status(500).json({status: false, message: error })
    }
})


router.get("/contact", async(req, res) => {
    try {
        const contacts = await Contact.find({});
        res.status(200).json({status: true, message:"contact list", data: contacts})
    } catch(error) {
        res.status(500).json({status: false, message: error })
    }
})

router.get("/contact/:id", async(req, res) => {
    try {
        const {id} = req.params
        const contact = await Contact.findById(id)

         if (contact) {
             res.status(200).json({status: true, message:"contact infos", data: contact})
         } else {
            res.status(200).json({status: true, message:"contact does not exists"})
         }
    } catch(error) {
        res.status(500).json({status: false, message: error })
    }
})

router.delete("/deleteContact/:id", async(req, res) => {
    try {
        const {id} = req.params
        const contact = await Contact.findById(id)

        if (contact) {
            await Contact.findByIdAndDelete(id)
            res.status(200).json({status: true, message:"contact deleted", data: contact})
        } else {
            res.status(200).json({status: true, message:"contact does not exists"})
        }
    } catch(error) {
        res.status(500).json({status: false, message: error })
    }
})

router.put("/editContact/:id", async(req, res) => {
    try {
        const {fullName, phoneNumber, email} = req.body
        const {id} = req.params

        const contact = await Contact.findById(id)
        const usedFullName = await Contact.findOne({fullName})
        const usedPhoneNumber = await Contact.findOne({phoneNumber})
        const usedEmail = await Contact.findOne({email})

        if (contact) {
           if (usedFullName) {
                res.status(200).json({status: false, message:"FullName already exists"})
            } else if (usedPhoneNumber) {
                res.status(200).json({status: false, message:"PhoneNumber already exists"})
            } else if (usedEmail) {
                res.status(200).json({status: false, message:"Email already exists"})
            } else {
                const newContact = await Contact.findByIdAndUpdate(id, {fullName, phoneNumber, email})
                res.status(200).json({status: true, message:"contact created", data: newContact})
            }
        } else {
            res.status(200).json({status: true, message:"contact does not exists"})
        }
    } catch(error) {
        res.status(500).json({status: false, message: error })
    }
})


module.exports = router;