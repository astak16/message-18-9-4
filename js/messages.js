
!function(){
        let view = View('.messages')
        let model = Model({resourceName:'Messages'})
        let controller = Controller({
            init:function(view,model){
                this.topForm = view.querySelector('.topForm')
                this.olTag = view.querySelector('.ol')
                this.newMessages = null
                this.node = null
                this.loadMessages()
                // this.bindEvents()
                // console.log()

            },
            bindEvents:function(){
                this.topForm.addEventListener('submit', (e) =>{
                    e.preventDefault()
                    this.saveMessage()
                })
                // this.olTag.addEventListener('click',(e)=>{
// console.log(this.replyForm)
//                     获取点击子元素在父元素内排行第几
                    // if(e.target.className === 'reply'){
                    //     let liTag = document.querySelector('.li')
                    //     let obj = {}
                    //     this.targetParentNode = e.target.parentNode  //点击的 li 元素
                    //     while(this.targetParentNode.className !== liTag.className){
                    //         this.targetParentNode = this.targetParentNode.parentNode
                    //     }

                        // 展示回复框
                        // this.replyForm=this.targetParentNode.querySelector('.replyForm')
                        // this.replyForm.style.display = 'block'
                        //
                        // 监听提交事件
                        // this.replyForm.addEventListener('submit',(e)=>{
                        //     e.preventDefault()
                        //     this.saveMessage(obj)
                        //     console.log(obj)
                        // })

                        // })
                        // obj[targetParentNode.children[0]]

                        // console.log(this.targetParentNode.children[0] )
                        // 获取点击元素的内容
                        // function done(parentNode){
                        //     if(parentNode.length !== 0){
                        //         for(let i = 0; i < parentNode.children.length; i++){
                        //             if(parentNode.children[i].className === 'userName'){
                        //                 obj.userNameReply = parentNode.children[i].innerText
                        //             }else if(parentNode.children[i].className === 'leaveMessage'){
                        //                 obj.leaveMessageReply = parentNode.children[i].innerText
                        //             }
                        //             done(parentNode.children[i])
                        //         }
                        //     }
                        // }
                        // done(this.targetParentNode)
                        // console.log(this.targetParentNode.querySelector('input[name=userName]'))
                        // this.saveMessage(obj)
                    // }
                // })

            },
            loadMessages:function(){
                this.model.fetch().then((e) =>{
                    this.newMessages = this.view.querySelectorAll('.newMessages')
                    this.newMessages.forEach((value)=>{value.textContent  = '(共'+e.length +'条)'})
                    e.forEach((value)=>{
                        this.createCommentElements(value)
                    })
                })
            },
            saveMessage:function(obj){
                let userName,content
                    userName = this.topForm.querySelector('input[name=userName]').value
                    content = this.topForm.querySelector('textarea[name=content]').value
                if(userName === '' && content === ''){
                    alert('内容不可为空')
                } else{
                    this.model.save({
                        'name':userName,
                        'content': content,
                    }).then((object) =>{
                            this.createCommentElements(object)
                        this.newMessages.forEach((value)=>{
                            let xxx = value.textContent.match(/(\d+)/g)
                            xxx.forEach((e)=>{
                                value.textContent = '(共'+(parseInt(e)+1)+'条)'
                            })
                        })
                    })
                    this.topForm.querySelector('input[name=userName]').value =''
                    this.topForm.querySelector('textarea[name=content]').value = ''
                }
            },
            createCommentElements:function(value){
                let h = this.virtualDom()
                this.node = h('li',{class:'li'},[
                    h('div',{class:'userInformation'},[
                        h('div',{class:'userContentUp'},[
                            h('span',{class:'userName'},[
                                h('#text',`${value.attributes.name}：`)
                            ]),
                            h('span',{class:'leaveMessage'},[
                                h('#text',`${value.attributes.content}`)
                            ]),
                        ]),
                        h('div',{class:'userContentDown clearfix'},[
                            h('div',{class:'upData'},[
                                h('#text',`${value.updatedAt.toDateString()}`)
                            ]),
                            h('div',{class:'replyLike'},[
                                h('i',{class:'iconfont icon-zan2',id:'like'},[
                                    h('#text',`(10)`)
                                ]),
                                h('span',{class:'verticalLine'},[
                                    h('#text','|')
                                ]),
                                h('span',{class:'reply'},[
                                    h('#text','回复')
                                ])
                            ])
                        ]),
                    ])
                ])
                let root = document.querySelector('.ol')
                root.insertBefore(this.node.render(),root.children[0])
            },
            virtualDom:function(){
                function VNode(tag,props,event,children,text){
                    this.tag = tag
                    this.props = props
                    this.event = event
                    this.children = children
                    this.text = text
                }

                VNode.prototype.render = function(){
                    // 添加文本
                    if(this.tag === '#text'){
                        return document.createTextNode(this.text)
                    }
                    let element = document.createElement(this.tag)

                    // 添加属性
                    for (let propName in this.props) { // 设置节点的DOM属性
                        let propValue = this.props[propName]
                        element.setAttribute(propName, propValue)
                    }

                    // 添加事件
                    if(this.event !== ''){
                        element.addEventListener('click',this.event)
                    }

                    // 生成子节点
                    this.children.forEach((vChild)=>{
                        element.appendChild(vChild.render())
                    })
                    return element
                }
                function h(tag,props,event,children,text){
                    if(typeof children === 'string'){
                        text = children
                        children = []
                    }else if(typeof props === 'string'){
                        text = props
                        props = {}
                    }else if(Array.isArray(event)){
                        children = event
                        event = ''
                    }
                    return new VNode(tag,props,event,children,text)
                }
                return h
            },


        })

    controller.init(view,model)
}.call()















