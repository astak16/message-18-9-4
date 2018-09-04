window.Controller = function(options){
    let init = options.init

    let object = {
        view:null,
        model:null,
        init:function(view,model){
            this.view = view
            this.model = model
            this.model.init()
            init.call(this,view,model)
            this.bindEvents.call(this)
            // console.log(this)
        }
    }
    console.log(object)
    for(let key in options){
        // console.log(object[key])
        if(key !== 'init'){
            object[key] = options[key]
        }
    }


    return object
}