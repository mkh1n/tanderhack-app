const apiPath = 'https://api.tanderhack.ru/v0';

export default {
  messagesPath: () => [apiPath, 'messages'].join('/'),
  messagePath: (id) => [apiPath, 'messages', id].join('/'),
  contractPath: (contract_id) => [apiPath, 'contracts', contract_id].join('/'),
  test: () => [apiPath, 'sayhi'].join('/'),
};
