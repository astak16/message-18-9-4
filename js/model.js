window.Model = function(options){

    let resourceName = options.resourceName
    return {
        init:function(){
            let APP_ID = 'XHlpuHFPSe3iYezJHM6qiqj2-gzGzoHsz';
            let APP_KEY = 'jxN7WfGxa73gm4Nux5sRTBpe';
            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            });
        },
        fetch:function(){
            let query = new AV.Query(resourceName);
            return query.find()
        },
        save:function(object){
            let X = AV.Object.extend(resourceName);
            let x = new X();
            return x.save(object)
        }
    }
}
