import { parseFilter } from '../src/orion';

describe('Orion - FindTransformer', () => {
  it('Should serialize devextreme complex filter to orion search filter', async () => {
    let result = parseFilter(null);
    expect(result).toBeNull();

    result = parseFilter(undefined);
    expect(result).toBeNull();

    result = parseFilter({});
    expect(result).toBeNull();

    result = parseFilter(['descricao', 'contains', 'titan']);
    expect(result).toEqual([
      {
        field: 'descricao',
        operator: 'like',
        value: '%titan%',
        type: 'and'
      },
    ]);

    result = parseFilter([['codigo', '=', 1], 'or', ['codigo', '=', 2]]);
    expect(result).toEqual([
      {
        type: 'and',
        nested: [
          { field: 'codigo', operator: '=', value: 1, type: 'or' },
          { field: 'codigo', operator: '=', value: 2, type: 'or' },
        ],
      },
    ]);

    result = parseFilter([
      ['identificador', 'contains', 'A'],
      'and',
      [['codigo', '=', 1], 'or', ['codigo', '=', 2]],
    ]);
    expect(result).toEqual([
      {
        type: 'and',
        nested: [
          { field: 'identificador', operator: 'like', value: '%A%', type: 'and'},
          {
            type: 'and',
            nested: [
              { field: 'codigo', operator: '=', value: 1, type: 'or'},
              { field: 'codigo', operator: '=', value: 2, type: 'or'},
            ],
          },
        ],
      },
    ]);
  });

  it('Must validate serialization of operators and value', async () => {
    let result = parseFilter(['descricao', '=', 'titan']);
    expect(result).toEqual([{ field: 'descricao', operator: '=', value: 'titan', type: 'and' }]);

    result = parseFilter(['descricao', '<>', 'titan']);
    expect(result).toEqual([{ field: 'descricao', operator: '!=', value: 'titan', type: 'and' }]);

    result = parseFilter(['codigo', '>', 1]);
    expect(result).toEqual([{ field: 'codigo', operator: '>', value: 1, type: 'and' }]);

    result = parseFilter(['codigo', '>=', 1]);
    expect(result).toEqual([{ field: 'codigo', operator: '>=', value: 1, type: 'and' }]);

    result = parseFilter(['codigo', '<', 1]);
    expect(result).toEqual([{ field: 'codigo', operator: '<', value: 1, type: 'and' }]);

    result = parseFilter(['codigo', '<=', 1]);
    expect(result).toEqual([{ field: 'codigo', operator: '<=', value: 1, type: 'and' }]);

    result = parseFilter(['descricao', 'contains', 'titan']);
    expect(result).toEqual([{ field: 'descricao', operator: 'like', value: '%titan%', type: 'and' }]);

    result = parseFilter(['descricao', 'notcontains', 'titan']);
    expect(result).toEqual([{ field: 'descricao', operator: 'not like', value: '%titan%', type: 'and' }]);

    result = parseFilter(['descricao', 'startswith', 'titan']);
    expect(result).toEqual([{ field: 'descricao', operator: 'like', value: 'titan%', type: 'and' }]);

    result = parseFilter(['descricao', 'endswith', 'titan']);
    expect(result).toEqual([{ field: 'descricao', operator: 'like', value: '%titan', type: 'and' }]);

    /*result = trasformer.execute(['codigo','in',[1]]);
    expect(result).toEqual([{field: 'codigo', operator: 'in', value: [1]}]);

    result = trasformer.execute(['codigo','in',[1]]);
    expect(result).toEqual([{field: 'codigo', operator: 'not in', value: [1]}]);*/
  });
});
