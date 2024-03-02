const superagent = require('supperagent');
const NUM_TRIES = 3;
async function test() {
    for(let i = 0; i < NUM_TRIES; i++) {
        try {
            await superagent.get('http://google.com/this-throws-an-error')
        } catch(err) {}
    }
}
test()