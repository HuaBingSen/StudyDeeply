class  EventBus {
    constructor() {
        this.EventCollection = {}
        this.callbackId = 0
    }
    $on(eventKey, callback) {
        if ( !this.EventCollection[eventKey] ) {
            this.EventCollection[eventKey] = {}
        }
        const id = this.callbackId++
        this.EventCollection[eventKey][id] = callback
        return id
    }
    $emit(eventKey, ...args) {
        const eventList = this.EventCollection[eventKey]
        for( const id in eventList) {
            eventList[id](...args)
        }
    }
    $off(eventKey, id) {
        delete this.EventCollection[eventKey][id]
        console.info(`id为${id}地事件已被取消订阅`)
        if ( !Object.keys(this.EventCollection[eventKey]).length ) {
            delete this.EventCollection[eventKey]
        }
    }
}

const eventBus = new EventBus();

eventBus.$on('evt1', (name, age)=>{
    console.info(`${name}-${age}-EVT1-SUBSCRIBE-A`)
})
let id_e1_b = eventBus.$on('evt1', (name, age)=>{
    console.info(`${name}-${age}-EVT1-SUBSCRIBE-B`)
})
eventBus.$on('evt2', (name)=>{
    console.info(`${name}-EVT2-SUBSCRIBE-C`)
})

eventBus.$emit('evt1', 'studyDad', 18)
eventBus.$off('evt1', id_e1_b)
eventBus.$emit('evt2', 'joyber')