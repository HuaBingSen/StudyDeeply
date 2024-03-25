class  EventBus {
    constructor() {
        this.EventCollection = {};
    }
    $on(eventKey, callback) {
        if ( !this.EventCollection[eventKey] ) {
            this.EventCollection[eventKey] = []
        }
        this.EventCollection[eventKey].push(callback)
    }
    $emit(eventKey, ...args) {
        const eventList = this.EventCollection[eventKey]
        for( const cb of eventList) {
            cb(...args)
        }
    }
}

const eventBus = new EventBus();

eventBus.$on('evt1', (name, age)=>{
    console.info(`${name}-${age}-EVT1-SUBSCRIBE-A`)
})
eventBus.$on('evt1', (name, age)=>{
    console.info(`${name}-${age}-EVT1-SUBSCRIBE-B`)
})
eventBus.$on('evt2', (name)=>{
    console.info(`${name}-EVT2-SUBSCRIBE-C`)
})

eventBus.$emit('evt1', 'studyDad', 18)
eventBus.$emit('evt2', 'joyber')


// 发布订阅，有个基础：订阅了才能接收到发布的消息
