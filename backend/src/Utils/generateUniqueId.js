const crypto = require('crypto');

module.exports = function generate(){
    return crypto.randomBytes(4).toString('HEX');
}


//export default generate(); //não existe para o NODE, portanto não pode ser usada para realizar testes.

//usar o seguinte para usare com bibliotecas NODE, como a JEST que é de testes.
//module.exports =  function(){}