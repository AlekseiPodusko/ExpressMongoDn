const path = require('path')
const fs = require('fs')
const { rejects } = require('assert')
const { errorMonitor } = require('stream')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'
)

class Card{
    static async add(course){
        const card = await Card.fetch()

        const idx = card.course.findIndex(c=>c.id === course.id)
        const candidate = card.course(idx)

        if(candidate){
            candidate.count++
            card.course[idx]=candidate
        }else{
            course.count = 1
            card.course.push(course)
        }

        card.price += +course.price

        return new Promise((resolve,rejects)=>{
            fs.writeFile(p,JSON.stringify(card),err =>{
                if(err){
                    reject(err)
                }else{
                    resolve()
                }
            })
        })
    }
    
    static async remove(id){
        const card = await Card.fetch()

        const idx = card.course.findIndex(c=> c.id === id)
        const course = card.course[idx]

        if(course.count ===1){
            card.course=card.course.filter(c=> c.id !== id)
        }else{
            card.course[idx].count--
        }
        card.price -= course.price

        return new Promise((resolve,rejects)=>{
            fs.writeFile(p,JSON.stringify(card),err=>{
                if(err){
                    reject(err)
                }else{
                    resolve(err)
                }
            })
        })
    }

    static async fetch(){
        return new Promise((resolve,rejects)=>{
            fs.readFile(p,'utf-8',(err,content)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(JSON.parse(content))
                }
            })
        })
    }

}