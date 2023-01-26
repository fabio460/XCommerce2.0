export function formatarNumero(num) {
    let sufixo = num.toFixed(2).split('.')[1]
    let prefixo = num.toLocaleString().split(',')[0]
    return prefixo +','+ sufixo?.toString()
  }