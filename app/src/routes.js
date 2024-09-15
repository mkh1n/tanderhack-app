const apiPath = 'https://api.tanderhack.ru/v0';

export default {
  messagesPath: () => [apiPath, 'messages'].join('/'),
  messagePath: (id) => [apiPath, 'messages', id].join('/'),
  contractsPath: () => [apiPath, 'contracts'].join('/'),
  contractPath: (contract_id) => [apiPath, 'contracts', contract_id].join('/'),
  changeRequest: () => [apiPath, 'change'].join('/'),
  test: () => [apiPath, 'sayhi'].join('/'),
};
