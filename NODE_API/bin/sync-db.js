const models = require('../../models');

// db sync
module.exports = () =>{
   return models.sequelize.sync({force:true})    
}