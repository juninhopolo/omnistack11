//Descrevendo o teste. O proprio JEST define a função describe.
//Informar categoria.
describe('Generate Unique Id', () => {
    //Todo teste unitário pode ser descrito com uma frase que se referencia.
    //Exemplo: isto calcula a diferenca do maior tempo com o menor tempo (delta T).
    //Usamos então a função it();
    it('should generate an unique ID', () => {
        //Um teste espera que algumas coisa aconteça para que ele seja verdadeira.
        //Exemplo: Eu espero que 2 + 2 seja = 4.
        expect(2 + 2).toBe(4);
    });
})