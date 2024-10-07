

function getValorLote() {
    const lote1DataLimite = new Date('2024-09-26')
    const lote2DataLimite = new Date('2024-10-11')
    const lote3DataLimite = new Date('2024-10-18')

    const valorLote1 = 30.00
    const valorLote2 = 35.00
    const valorLote3 = 40.00 

    const dataAtual = new Date();

    if(dataAtual <= lote1DataLimite ){
        return valorLote1
    }
    if(dataAtual <= lote2DataLimite){
        return valorLote2
    }
    if(dataAtual <= lote3DataLimite){
        return valorLote3
    }
}

 module.exports = {
    getValorLote
 }