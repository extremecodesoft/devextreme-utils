import { isEmpty } from 'lodash';

export type Resolver = (value: string | number) => any;

const OPERATORS = new Map<string, string>([
  ['=', '='],
  ['>', '>'],
  ['>=', '>='],
  ['<', '<'],
  ['<=', '<='],
  ['<>', '!='],
  ['contains', 'like'],
  ['notcontains', 'not like'],
  ['startswith', 'like'],
  ['endswith', 'like'],
  ['in', 'in'],
  ['not in', 'not in'],
  ['custom', 'custom'],
]);

const RESOLVERS = new Map<string, Resolver>([
  ['=', (value) => value],
  ['>', (value) => value],
  ['>=', (value) => value],
  ['<', (value) => value],
  ['<=', (value) => value],
  ['<>', (value) => value],
  ['!=', (value) => value],
  ['contains', (value) => `%${value}%`],
  ['notcontains', (value) => `%${value}%`],
  ['startswith', (value) => `${value}%`],
  ['endswith', (value) => `%${value}`],
  ['in', (value) => value],
  ['not in', (value) => value],
  ['custom', (value) => value],
]);

function parseFilterItem(item: any, condition: string): any {
  return {
    field: item[0],
    operator: OPERATORS.get(item[1]),
    value: RESOLVERS.get(item[1])(item[2]),
    type: condition
  };
}

export function parseFilter(filter: any, asArray: boolean = true): any {
  if (!filter || isEmpty(filter) || !filter.length) {
    return null;
  }

  if (!Array.isArray(filter[0])) {
    const result = parseFilterItem(filter, 'and');
    return asArray ? [result] : result;
  }

  const condition = filter.find((item: any) => !Array.isArray(item)) || 'and';
  const items = filter.filter((item: any) => Array.isArray(item));
  const result = {
    type: 'and',
    nested: items.map((item: any) =>
      Array.isArray(item[0]) ? parseFilter(item, false) : parseFilterItem(item, condition)
    ),
  };

  return asArray ? [result] : result;
}
