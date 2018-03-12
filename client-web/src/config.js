export default {
  baseUrl: '',
  memoTypes: [
    { value: 'MEMO_TEXT', label: 'Text', description: 'message to include in the transaction' },
    { value: 'MEMO_ID', label: 'ID', description: 'for the recipient to identify whoever is sending the lumens' },
    { value: 'MEMO_HASH', label: 'Hash', description: 'reference to another transaction' },
    { value: 'MEMO_RETURN', label: 'Return', description: 'reference to transaction when refunding that transaction' }
  ]
}
