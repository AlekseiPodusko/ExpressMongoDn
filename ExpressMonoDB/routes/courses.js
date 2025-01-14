const{Router}=require('express')
const Course = require('../models/course')
const router = Router()

router.get('/',(req,res)=>{
    res.render('courses',{
        title:'Курсы',
        isCourses: true,
        courses
    })
})

router.get('/:id/edit',async (req,res)=>{
    if(!req.query.allow){

        return res.redirect('/')
    }
    const course = await Course.findById(req.params.id)

    res.render('course-edit',{
        title:`Редактировать ${course.title}`,
        course
    })
})

router.post('/edit',async(req,res)=>{
    const{id}=req.body
    delete req.body.id
    await Course.findByIdAndUpdate(id, req.body)
    res.redirect('/courses')
})

router.get('/:id',async(req,res)=>{
    const course = await Course.findById(req.params.id)
    res.render('course',{
        layout:'empty',
        title:`Курс ${course.title}`,
        course
    })
})



module.exports=router