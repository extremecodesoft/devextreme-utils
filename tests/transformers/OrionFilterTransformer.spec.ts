import { OrionFilterTransformer } from '../../src/transformers/OrionFilterTransformer';

describe('Orion - FindTransformer', () => {
  it('Should serialize devextreme complex filter to orion search filter', async () => {
    const trasformer = new OrionFilterTransformer();

    let result = trasformer.execute(null);
    expect(result).toBeNull();

    result = trasformer.execute(undefined);
    expect(result).toBeNull();

    result = trasformer.execute({});
    expect(result).toBeNull();

    result = trasformer.execute(['descricao','contains','titan']);
    expect(result).toEqual([
      {
        field: 'descricao', operator: 'like', value: '%titan%'
      }
    ]);

    result = trasformer.execute([
      ['codigo','=',1],
      'or',
      ['codigo','=',2]
    ]);
    expect(result).toEqual([
      {
        type: 'or',
        nested: [
          {field: 'codigo', operator: '=', value: 1},
          {field: 'codigo', operator: '=', value: 2}
        ]
      }
    ]);

    result = trasformer.execute([
      ['identificador','contains','A'],
      'and',
      [
        ['codigo','=',1],
        'or',
        ['codigo','=',2]
      ]
    ]);
    expect(result).toEqual([
      {
        type: 'and',
        nested: [
          {field: 'identificador', operator: 'like', value: '%A%'},
          {
            type: 'or',
            nested: [
              {field: 'codigo', operator: '=', value: 1},
              {field: 'codigo', operator: '=', value: 2}
            ]
          }
        ]
      }
    ]);

  });

  it('Must validate serialization of operators and value', async () => {
    const trasformer = new OrionFilterTransformer();

    let result = trasformer.execute(['descricao','=','titan']);
    expect(result).toEqual([{field: 'descricao', operator: '=', value: 'titan'}]);

    result = trasformer.execute(['descricao','<>','titan']);
    expect(result).toEqual([{field: 'descricao', operator: '!=', value: 'titan'}]);

    result = trasformer.execute(['codigo','>',1]);
    expect(result).toEqual([{field: 'codigo', operator: '>', value: 1}]);

    result = trasformer.execute(['codigo','>=',1]);
    expect(result).toEqual([{field: 'codigo', operator: '>=', value: 1}]);

    result = trasformer.execute(['codigo','<',1]);
    expect(result).toEqual([{field: 'codigo', operator: '<', value: 1}]);

    result = trasformer.execute(['codigo','<=',1]);
    expect(result).toEqual([{field: 'codigo', operator: '<=', value: 1}]);

    result = trasformer.execute(['descricao','contains','titan']);
    expect(result).toEqual([{field: 'descricao', operator: 'like', value: '%titan%'}]);

    result = trasformer.execute(['descricao','notcontains','titan']);
    expect(result).toEqual([{field: 'descricao', operator: 'not like', value: '%titan%'}]);

    result = trasformer.execute(['descricao','startswith','titan']);
    expect(result).toEqual([{field: 'descricao', operator: 'like', value: 'titan%'}]);
    
    result = trasformer.execute(['descricao','endswith','titan']);
    expect(result).toEqual([{field: 'descricao', operator: 'like', value: '%titan'}]);

    /*result = trasformer.execute(['codigo','in',[1]]);
    expect(result).toEqual([{field: 'codigo', operator: 'in', value: [1]}]);

    result = trasformer.execute(['codigo','in',[1]]);
    expect(result).toEqual([{field: 'codigo', operator: 'not in', value: [1]}]);*/

  });  
});