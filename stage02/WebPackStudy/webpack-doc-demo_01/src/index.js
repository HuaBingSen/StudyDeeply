import _ from 'loadsh'
function component() {
    const element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' , Huabingsen is here!');
    return element;
}

document.body.appendChild(component());