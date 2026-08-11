import { parseFilter } from '../src/orion';

describe('Orion - FindTransformer', () => {
  it('Should serialize devextreme complex filter to orion search filter', async () => {
    /*let result = parseFilter(null);
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

    result = parseFilter(['data', 'between', ['2023-01-01', '2023-12-31']]);
    expect(result).toEqual([
      {
        type: 'and',
        nested: [
          { field: 'data', operator: '>=', value: '2023-01-01', type: 'or' },
          { field: 'data', operator: '<=', value: '2023-12-31', type: 'or' },
        ],
      },
    ]);

    result = parseFilter([
      ['identificador', 'contains', 'A'],
      'and',
      ['data', 'between', ['2023-01-01', '2023-12-31']],
    ]);
    expect(result).toEqual([
      {
        type: 'and',
        nested: [
          { field: 'identificador', operator: 'like', value: '%A%', type: 'and'},
          {
            type: 'and',
            nested: [
              { field: 'data', operator: '>=', value: '2023-01-01', type: 'or' },
              { field: 'data', operator: '<=', value: '2023-12-31', type: 'or' },
            ],
          },
        ],
      },
    ]);*/

    let result = parseFilter([
      ['trajeto.entidade1.Ent_Identificador', 'contains', 'alterada'], 
      'or',
      ['trajeto.entidade1.Ent_Numero', '=', 'alterada'], 
      'or',
      ['TNC_Descricao', 'contains', 'alterada'], 
      'or',
      ['trajeto.entidade2.Ent_Identificador', 'contains', 'alterada'], 
      'or',
      ['trajeto.entidade2.Ent_Numero', 'contains', 'alterada'], 
      'or',
      ['trajeto.temperatura.usuarioResponsavel.Pes_Nome', '=', 'alterada']
    ]);

    expect(result).toEqual([
      {
        type: 'and',
        nested: [
          { field: 'trajeto.entidade1.Ent_Identificador', operator: 'like', value: '%alterada%', type: 'or' },
          { field: 'trajeto.entidade1.Ent_Numero', operator: '=', value: 'alterada', type: 'or' },
          { field: 'TNC_Descricao', operator: 'like', value: '%alterada%', type: 'or' },
          { field: 'trajeto.entidade2.Ent_Identificador', operator: 'like', value: '%alterada%', type: 'or' },
          { field: 'trajeto.entidade2.Ent_Numero', operator: 'like', value: '%alterada%', type: 'or' },
          { field: 'trajeto.temperatura.usuarioResponsavel.Pes_Nome', operator: '=', value: 'alterada', type: 'or' },
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

    //result = parseFilter(['data', 'between', ['2023-01-01', '2023-12-31']]);
    //expect(result).toEqual([{ field: 'data', operator: 'in_range', value: ['2023-01-01', '2023-12-31'], type: 'and' }]);

    /*result = trasformer.execute(['codigo','in',[1]]);
    expect(result).toEqual([{field: 'codigo', operator: 'in', value: [1]}]);

    result = trasformer.execute(['codigo','in',[1]]);
    expect(result).toEqual([{field: 'codigo', operator: 'not in', value: [1]}]);*/
  });
  
});
