export default {
  baseUrl: '',
  memoTypes: [
    {
      value: 'MEMO_TEXT',
      label: 'Text',
      description: 'message to include in the transaction',
      validate: memo => memo.trim().length > 0
    },
    {
      value: 'MEMO_ID',
      label: 'ID',
      description: 'for the recipient to identify whoever is sending the lumens',
      validate: memo => !isNaN(parseInt(memo, 10))
    },
    {
      value: 'MEMO_HASH',
      label: 'Hash',
      description: 'reference to another transaction',
      validate: memo => memo.trim().length === 32
    }
  ]
}
