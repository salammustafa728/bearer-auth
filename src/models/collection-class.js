'use strict';

class Collection{
    constructor(model){
        this.model = model;
    }

    async createUserSignUp(obj){
        try{
            return await this.model.create({
                username:obj.username,
                password:obj.password
            });
        } catch{
            console.log('error in create new data signup ',this.model.name);
        }
    }
    async createUserSignin(objName){
        try{
            if(objName){
               let name = await this.model.findOne({where:{username:objName}});
               console.log('namemodel',name);
                return name;
            }else{
                return await this.model.findAll();
            }
           
        } catch{
            console.log('error in signin new data  ',this.model.name);
        }
    }
}

module.exports = Collection;