const _ = require('lodash')
const query = require('lodash-query')(_, false)

module.exports = (seed = [])=>{

    const data = [...seed]

    async function getAll(condition = {}){
        return query(data, condition)
    }  
    
    async function add(element){
        data.push(element)
    }

    return {
        getAll,
        add
    }

}